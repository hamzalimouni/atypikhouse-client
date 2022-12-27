import React, { useState, useMemo, useEffect } from 'react'
import { Button, Form, Col, Container, Row, FloatingLabel } from 'react-bootstrap'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Divider, Steps, message, Spin } from 'antd';
import countries from "i18n-iso-countries";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import { Calendar } from "react-multi-date-picker"
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import CardHouse from '../components/CardHouse'
import { API_URL } from '../Variables';
import Cookies from 'js-cookie';
import axios from "axios";
import done from "../assets/img/done.svg"
import { useNavigate } from "react-router-dom";

const { Step } = Steps;


const NewHouse = () => {

    useEffect(() => {
        document.title = "Publier une annonce - AtypikHouse";
    }, [])

    let navigate = useNavigate();
    const provider = new OpenStreetMapProvider();

    countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));

    const getMapAddress = async () => {
        await provider.search({ query: address.address + ', ' + address.city + ', ' + address.zipcode + ', ' + address.country })
            .then((result) => {
                if (result.length > 0) {
                    setAddress({ ...address, latitude: result[0].y, longitude: result[0].x })
                } else {
                    message.error('Impossible d\'obtenir cette address, Merci de le préciser manuellement')
                }
            })
            .catch((err) => { console.log(err); message.error('Impossible d\'obtenir cette address, Merci de le préciser manuellement') })
    }

    const [disabled, setDisabled] = useState(true);
    const [current, setCurrent] = useState(0);
    const [data, setData] = useState([]);
    const [address, setAddress] = useState({
        latitude: 48.833859,
        longitude: 2.549111,
    })
    const [properties, setProperties] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [categories, setCategories] = useState([])
    const [equipmentsData, setEquipmentsData] = useState([])
    const [propsData, setPropsData] = useState([])
    const [isInvalid, setIsInvalid] = useState([])
    const [isValid, setIsValid] = useState([])
    const [disponibilities, setDisponibilities] = useState([])
    const [calendar, setCalendar] = useState([])
    const [images, setImages] = useState([])
    const [imageFiles, setImageFiles] = useState([])
    const [dragActive, setDragActive] = useState(false);
    const [published, isPublished] = useState(false)
    const inputRef = React.useRef(null);
    const [spining, setSpining] = useState(true);

    useEffect(() => {
        getCategories()
        getEquipments()
    }, []);

    const getCategories = () => {
        fetch(API_URL + '/categories')
            .then(res => res.json())
            .then((result) => { setCategories(result["hydra:member"]); setSpining(false) })
    }

    const getEquipments = () => {
        fetch(API_URL + '/equipements')
            .then(res => res.json())
            .then((result) => { setEquipmentsData(result["hydra:member"]) })
    }

    const getProperties = (category) => {
        fetch(API_URL + '/proprieties?category.id=' + category)
            .then(res => res.json())
            .then((result) => { setPropsData(result["hydra:member"]) })
    }

    useEffect(() => {
        propsData.map((p) => {
            if (p.isRequired) {
                if (properties[p.id] === undefined) {
                    return setIsValid((isValid) => ({ ...isValid, [p.id]: false }))
                }
            }
            return null
        });
        verifyValidity();
    }, [images, data, current, address, properties, equipments, disponibilities, propsData,]);

    const onInputDataChange = e => {
        const { name, value } = e.currentTarget
        setValidAndInvalid(e);
        setData({ ...data, [name]: value })
        if (name === "category") {
            getProperties(value);
        }
        verifyValidity();
    }

    const onInputAddressChange = e => {
        const { name, value } = e.currentTarget
        setValidAndInvalid(e);
        setAddress({ ...address, [name]: value })
        verifyValidity();
    }

    const onInputPropsChange = e => {
        const { name, value, checked, type } = e.currentTarget
        setValidAndInvalid(e);
        setProperties({ ...properties, [name]: type === "checkbox" ? checked : value })
        verifyValidity();
    }

    const onInputEquipmentsChange = e => {
        const { name, checked } = e.currentTarget
        if (checked)
            setEquipments([...equipments, parseInt(name)])
        else
            setEquipments(equipments.filter(i => i !== parseInt(name)))
    }

    const onDisponibilitiesChange = e => {
        setCalendar(e)
        let dates = []
        e.map((d) => dates.push(d.toDate()))

        setDisponibilities(dates)
    }

    const setValidAndInvalid = e => {
        const { name } = e.currentTarget
        let isv = e.currentTarget.checkValidity();
        setIsInvalid({ ...isInvalid, [name]: isv ? false : true })
        setIsValid(prev => {
            return {
                ...prev, [name]: isv ? true : false
            }
        })
    }

    const verifyValidity = () => {
        if (current === 0) {
            setDisabled(isValid.category && isValid.title && isValid.description && isValid.price ? false : true)
        }
        if (current === 1) {
            setDisabled(isValid.address && isValid.city && isValid.zipcode ? false : true)
        }
        if (current === 2) {
            let isV = propsData.map((p) => { return p.isRequired ? isValid[p.id] : null }).filter(i => i === false).length === 0;
            setDisabled(isV && isValid.surface && isValid.nbPerson && isValid.rooms && isValid.beds ? false : true)
        }
        if (current === 5) {
            setDisabled(images.length > 0 ? false : true)
        }
    }
    const countryArr = Object.entries(countries.getNames("fr", { select: "official" })).map(([key, value]) => {
        return {
            label: value
        };
    });

    const eventHandlers = useMemo(
        () => ({
            dragend(e) {
                setAddress((address) => ({ ...address, latitude: e.target._latlng.lat, longitude: e.target._latlng.lng }))
            },
        }),
        [],
    )

    function MapFlyTo() {
        const map = useMap()
        map.flyTo([address.latitude, address.longitude])
        return null
    }

    const fileUploadHandle = (e) => {

        Array.from(e.target.files).forEach(i => {
            setImages(images => [...images, URL.createObjectURL(i)])
            setImageFiles(imageFiles => [...imageFiles, i])
        })

        console.log(imageFiles);
    }

    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            Array.from(e.dataTransfer.files).forEach(i => setImages(images => [...images, URL.createObjectURL(i)]))
        }
    };

    const Step1 =
        <>
            <FloatingLabel controlId="floatingSelect" label="Catégorie">
                <Form.Select aria-label="Catégorie" name="category" value={data.category} onChange={onInputDataChange} onKeyUp={onInputDataChange} required>
                    <option disabled selected>Catégorie de votre annonce</option>
                    {
                        categories.map((c) => { return <option value={c.id}>{c.name}</option> })
                    }
                </Form.Select>
            </FloatingLabel>
            <Row className='my-4'>
                <Col lg={8}>
                    <FloatingLabel label="Titre de votre annonce">
                        <Form.Control
                            type="text"
                            placeholder="Titre"
                            name="title"
                            isInvalid={isInvalid.title}
                            value={data.title || ''}
                            onChange={onInputDataChange}
                            onKeyUp={onInputDataChange}
                            required />
                    </FloatingLabel>
                </Col>
                <Col lg={4}>
                    <FloatingLabel label="Prix par nuit (€)">
                        <Form.Control
                            type="number"
                            min="1"
                            placeholder="Prix"
                            name="price"
                            isInvalid={isInvalid.price}
                            value={data.price || ''}
                            onChange={onInputDataChange}
                            onKeyUp={onInputDataChange}
                            required />
                    </FloatingLabel>
                </Col>
            </Row>
            <FloatingLabel label="Description" className='my-4'>
                <Form.Control
                    as="textarea"
                    placeholder="Description"
                    name="description"
                    isInvalid={isInvalid.description}
                    value={data.description || ''}
                    onChange={onInputDataChange}
                    onKeyUp={onInputDataChange}
                    required
                    style={{ height: '200px' }}
                />
            </FloatingLabel>
        </>

    const Step2 =
        <>
            <FloatingLabel controlId="floatingSelect" label="Pays">
                <Form.Select defaultValue="France" onChange={onInputAddressChange} name="country" value={address.country || ''}>
                    {!!countryArr?.length &&
                        countryArr.map(({ label }) => (
                            <option value={label}>{label}</option>
                        ))}
                </Form.Select>
            </FloatingLabel>
            <FloatingLabel label="Rue et numéro" className='my-4'>
                <Form.Control
                    type="text"
                    name="address"
                    placeholder="Address"
                    isInvalid={isInvalid.address}
                    value={address.address || ''}
                    onChange={onInputAddressChange}
                    onKeyUp={onInputAddressChange}
                    required />
            </FloatingLabel>
            <Row className='my-4'>
                <Col>
                    <FloatingLabel label="Ville">
                        <Form.Control
                            type="text"
                            name="city"
                            placeholder="Ville"
                            isInvalid={isInvalid.city}
                            value={address.city || ''}
                            onChange={onInputAddressChange}
                            onKeyUp={onInputAddressChange}
                            required
                        />
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel label="Code postal">
                        <Form.Control
                            type="text"
                            name="zipcode"
                            placeholder="Code postal"
                            isInvalid={isInvalid.zipcode}
                            value={address.zipcode || ''}
                            onChange={onInputAddressChange}
                            onKeyUp={onInputAddressChange}
                            required
                        />
                    </FloatingLabel>
                </Col>
            </Row>
            <Button onClick={() => getMapAddress()} variant='warning' className='text-white' size='sm'>Préciser l'address automatiquement dans la carte</Button>
            <Divider className='py-3'>
                <FontAwesomeIcon icon={Icons.faArrowDown} color='#9ca3af' />
                <small className='px-3'>Merci de préciser l'adresse dans la carte si ce n'est pas déjà fait automatiquement</small>
                <FontAwesomeIcon icon={Icons.faArrowDown} color='#9ca3af' />
            </Divider>
            <MapContainer center={[address.latitude, address.longitude]} zoom={13} style={{ height: 300 }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'
                />
                <Marker position={[address.latitude, address.longitude]} draggable eventHandlers={eventHandlers} icon={
                    require('leaflet').icon({
                        iconUrl: require('../assets/img/marker.png'),
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],
                        popupAnchor: null,
                        shadowUrl: null,
                        shadowSize: null,
                        shadowAnchor: null
                    })
                } >
                </Marker>
                <MapFlyTo />
            </MapContainer>
            <div className='d-flex justify-content-around'>
                <FloatingLabel label="Latitude" className='my-4'>
                    <Form.Control
                        value={address.latitude}
                        disabled
                        readOnly />
                </FloatingLabel>
                <FloatingLabel label="Latitude" className='my-4'>
                    <Form.Control
                        value={address.longitude}
                        disabled
                        readOnly />
                </FloatingLabel>
            </div>
        </>


    const Step3 =
        <>
            <FloatingLabel label="Surface en m²" className='my-4'>
                <Form.Control
                    type="number"
                    min="10"
                    placeholder="Surface"
                    name="surface"
                    isInvalid={isInvalid.surface}
                    value={data.surface || ''}
                    onChange={onInputDataChange}
                    onKeyUp={onInputDataChange}
                    required />
            </FloatingLabel>
            <FloatingLabel label="Personnes" className='my-4'>
                <Form.Control
                    type="number"
                    min="1"
                    placeholder="Personnes"
                    name="nbPerson"
                    isInvalid={isInvalid.nbPerson}
                    value={data.nbPerson || ''}
                    onChange={onInputDataChange}
                    onKeyUp={onInputDataChange}
                    required />
            </FloatingLabel>
            <FloatingLabel label="Chambres" className='my-4'>
                <Form.Control
                    type="number"
                    min="1"
                    placeholder="Chambres"
                    name="rooms"
                    isInvalid={isInvalid.rooms}
                    value={data.rooms || ''}
                    onChange={onInputDataChange}
                    onKeyUp={onInputDataChange}
                    required />
            </FloatingLabel>
            <FloatingLabel label="Lits" className='my-4'>
                <Form.Control
                    type="number"
                    min="1"
                    placeholder="Lits"
                    name="beds"
                    isInvalid={isInvalid.beds}
                    value={data.beds || ''}
                    onChange={onInputDataChange}
                    onKeyUp={onInputDataChange}
                    required />
            </FloatingLabel>
            {
                propsData.map((p) => {
                    return p.type === "bool" ?
                        <Form.Check
                            style={{ fontSize: '1.2rem' }}
                            name={p.id}
                            onChange={onInputPropsChange}
                            onKeyUp={onInputPropsChange}
                            type="checkbox"
                            label={p.name}
                        /> :
                        <FloatingLabel label={p.name} className='my-4'>
                            <Form.Control
                                type={p.type}
                                placeholder={p.name}
                                name={p.id}
                                isInvalid={isInvalid[p.id]}
                                value={properties[p.id] || ''}
                                onChange={onInputPropsChange}
                                onKeyUp={onInputPropsChange}
                                required={p.isRequired ? true : false} />
                        </FloatingLabel>
                })
            }
        </>

    const Step4 =
        <>
            <Row style={{ fontSize: '1.2rem' }}>
                {equipmentsData.map((e) => {
                    return <Col lg={4} ><Form.Check
                        name={e.id}
                        onChange={onInputEquipmentsChange}
                        type="checkbox"
                        label={e.name}
                    /></Col>
                })}
            </Row>
        </>

    const Step5 =
        <>
            <p>La modification de votre calendrier est simple : il vous suffit de sélectionner une date pour la bloquer ou la débloquer.
            </p>

            <small><strong className='text-atypik'>Les dates selectionnées sont les dates oû votre habitat n'est pas disponible</strong></small>
            <Row>
                <Col>
                    <Calendar value={calendar} onChange={onDisponibilitiesChange} multiple shadow={false} className="border-0 shadow-sm mt-3" />
                </Col>
                <Col className='text-center'>
                    <p className="my-3">List des dates bloquées</p>
                    {
                        disponibilities.sort((a, b) => (new Date(Moment(a).format('DD MMM YYYY')) - new Date(Moment(b).format('DD MMM YYYY')))).map((d) => {
                            return <Row className='bg-light py-1 my-1'>
                                <small>{Moment(d).format('DD MMM YYYY')}</small>
                            </Row>
                        })}
                </Col>
            </Row>
            <br></br><small>Vous pouvez toujours apporter des modifications après la publication.</small>
        </>
    const Step6 =
        <>
            <div className="form-file-upload w-100" onDragEnter={handleDrag}>
                <Form.Control ref={inputRef} type="file" className="input-file-upload" multiple onChange={fileUploadHandle} accept="image/png, image/jpeg" />
                <label htmlFor="input-file-upload" className={dragActive ? "drag-active label-file-upload w-100" : "label-file-upload w-100"}>
                    <div>
                        <FontAwesomeIcon icon={Icons.faImages} color='#9ca3af' size='3x' />
                        <div className='d-flex my-3'>
                            <div className="upload-button" onClick={() => inputRef.current.click()}>Upload a file </div><div> or drag and drop</div>
                        </div>
                        <small className='text-muted'>PNG, JPG up to 10MB</small>
                    </div>
                </label>
                {dragActive && <div className="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
            </div>
            <p className='mt-5 ms-5'>Nombre des images : {images.length}</p>
            <div class="d-flex flex-row flex-nowrap " style={{ overflowX: 'scroll' }}>
                {
                    images.map((i) => {
                        return <div className='bg-white shadow-sm m-2 border p-1 addHouseImage' onClick={() => { setImages(images.filter(item => item !== i)); }}>
                            <div style={{
                                height: 200, width: 300, backgroundImage: `url(${i})`, backgroundPosition: 'center',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                            }}>
                            </div>
                            {/* <img src={i} height={200} onClick={() => console.log("Supprimer")} /> */}
                            <div class="addHouseImageOverlay">
                                <div class="text"><FontAwesomeIcon icon={Icons.faTrash} /></div>
                            </div>
                            {/* <div className='bg-danger text-center mt-3 text-white p-1 mx-auto'><FontAwesomeIcon icon={Icons.faTrash} className='text-white' /></div> */}
                        </div>
                    })
                }
            </div>
        </>

    const contents = [
        {
            title: 'Préparer votre annonce',
            content: Step1,
        },
        {
            title: 'Où est situé?',
            content: Step2,
        },
        {
            title: 'Différents paramètres de votre habitat',
            content: Step3,
        },
        {
            title: 'Les équipements',
            content: Step4,
        },
        {
            title: 'Les disponibilités',
            content: Step5,
        },
        {
            title: 'Des photos du lieu',
            content: Step6,
        },
        {
            title: published ? '' : 'Votre annonce est prête à être publiée',
            content: <div className='d-flex justify-content-center'>
                {published ?
                    <div className='text-center'>
                        <img src={done} alt="" width={300} srcset="" />
                        <p className='mt-4'>votre publication a été publiée avec succès et elle sera examinée par notre équipe<br></br><small>vous serez averti si des informations supplémentaires sont nécessaires</small></p>
                        <Button onClick={() => { navigate("/account/annonces") }} variant='atypik' >Mes annonces</Button>
                    </div>
                    :
                    <Col lg={7}>
                        <CardHouse
                            image={images[0]}
                            title={data.title}
                            destination={address.city + ', ' + address.country}
                            price={data.price}
                            reviews="-" />
                    </Col>}
            </div>,
        }
    ];

    const next = () => {
        setCurrent(current + 1);
        setDisabled(true);
        if (current === 2 || current === 3) {
            setDisabled(false)
        }
    };

    const prev = () => {
        setCurrent(current - 1);
        setDisabled(false);
    };

    const handleSubmit = async (event) => {
        setSpining(true);

        event.preventDefault();
        event.stopPropagation();

        let formData = new FormData();


        Object.keys(data).forEach(e => {
            formData.append(e, data[e])
        });

        Object.keys(imageFiles).forEach(e => {
            formData.append('images[]', imageFiles[e])
        });

        formData.append('address', JSON.stringify(address))
        formData.append('disponibilities', JSON.stringify(disponibilities))
        formData.append('equipments', JSON.stringify(equipments))
        formData.append('properties', JSON.stringify(properties))

        axios({
            url: API_URL + '/houses',
            method: "POST",
            headers: {
                authorization: 'bearer ' + Cookies.get("token"),
            },
            data: formData,
        })
            .then((res) => { isPublished(true); setSpining(false) })
            .catch((err) => { message.error(err); setSpining(false) });
    };


    return (
        <>
            <Navbar />
            <Container className='p-5'>
                <Row className='d-flex justify-content-center pt-5'>
                    <Col lg={8}>
                        <Steps current={current} >
                            <Step />
                            <Step />
                            <Step />
                            <Step />
                            <Step />
                            <Step />
                            <Step />
                        </Steps>
                        <Spin spinning={spining}>
                            <Form onSubmit={handleSubmit}>
                                {/* <h5 className='text-muted' style={{ color: '#b7b7b7' }}><strong className='text-black' style={{ fontSize: '2.25rem' }}>05</strong>/10</h5> */}
                                <Container className=' mt-3 p-5 rounded shadow-sm'>
                                    <Divider orientation="left pb-4"><h2 className='text-muted'>{contents[current].title}</h2></Divider>

                                    {contents[current].content}

                                </Container>
                                {published ? null :
                                    <div className="mt-3" style={{ textAlign: 'right' }} >
                                        {current > 0 && (
                                            <Button variant="atypik" style={{ margin: '0 8px' }} onClick={() => prev()}>
                                                {'<'}
                                            </Button>
                                        )}
                                        {current < contents.length - 1 && (
                                            <Button variant="atypik" disabled={disabled} onClick={() => next()}>
                                                Suivant
                                            </Button>
                                        )}
                                        {current === contents.length - 1 && (
                                            <Button variant="atypik" type="submit">
                                                Publier votre annonce
                                            </Button>
                                        )}
                                    </div>
                                }
                            </Form>
                        </Spin>
                    </Col>

                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default NewHouse