import React, { useState, useMemo, useEffect } from 'react'
import { Button, Form, Col, Container, Row, FloatingLabel } from 'react-bootstrap'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Divider, Steps } from 'antd';
import countries from "i18n-iso-countries";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import { Calendar } from "react-multi-date-picker"
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import CardHouse from '../components/CardHouse'
import { API_URL } from '../Variables';
import { Map } from 'leaflet';

const { Step } = Steps;


const NewHouse = () => {

    const provider = new OpenStreetMapProvider();

    countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));

    const getMapAdress = async () => {
        let result = await provider.search({ query: data.address + ', ' + data.city + ', ' + data.zipcode + ', ' + data.country });
        if (result.length > 0) {
            setCoordinates({ lat: result[0].y, long: result[0].x })
        }
    }

    const [coordinates, setCoordinates] = useState({
        lat: 48.833859,
        long: 2.549111,
    })
    const [disabled, setDisabled] = useState(true);
    const [current, setCurrent] = useState(0);
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([])
    const [equipments, setEquipments] = useState([])
    const [properties, setProperties] = useState([])
    const [isInvalid, setIsInvalid] = useState([])
    const [isValid, setIsValid] = useState([])
    const [dates, setDates] = useState([])
    const [images, setImages] = useState([])
    const [dragActive, setDragActive] = React.useState(false);
    const inputRef = React.useRef(null);
    const map = null;
    //const map = useMap();

    useEffect(() => {
        getCategories()
        getEquipments()
    }, []);

    const getCategories = () => {
        fetch(API_URL + '/categories')
            .then(res => res.json())
            .then((result) => { setCategories(result["hydra:member"]) })
    }

    const getEquipments = () => {
        fetch(API_URL + '/equipements')
            .then(res => res.json())
            .then((result) => { setEquipments(result["hydra:member"]) })
    }

    const getProperties = (category) => {
        fetch(API_URL + '/proprieties?category.id=' + category)
            .then(res => res.json())
            .then((result) => { setProperties(result["hydra:member"]) })
    }

    useEffect(() => {
        verifyValidity();
    }, [images, data, current]);

    // useEffect(() => {
    //     map.flyTo([coordinates.lat, coordinates.long])
    // }, [coordinates]);

    const onInputChange = e => {
        const { name, value } = e.currentTarget
        //console.log(name);
        let isv = e.currentTarget.checkValidity();
        setIsInvalid({ ...isInvalid, [name]: isv ? false : true })
        setIsValid(prev => {
            return {
                ...prev, [name]: isv ? true : false
            }
        })
        setData({ ...data, [name]: value })
        if (name == "category") {
            getProperties(value);
        }
        verifyValidity();
    }


    const verifyValidity = () => {
        console.log(current)
        if (current == 0) {
            setDisabled(isValid.category && isValid.title && isValid.description && isValid.price ? false : true)
        }
        if (current == 1) {
            setDisabled(isValid.address && isValid.city && isValid.zipcode ? false : true)
            if (!disabled) {
                getMapAdress();
            }
        }
        if (current == 2) {
            setDisabled(isValid.surface && isValid.nbPerson && isValid.rooms && isValid.beds ? false : true)
        }
        if (current == 5) {
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
                setCoordinates({ lat: e.target._latlng.lat, long: e.target._latlng.lng })
            },
        }),
        [],
    )

    function MapFlyTo() {
        const map = useMap()
        map.flyTo([coordinates.lat, coordinates.long])
        return null
    }



    const fileUploadHandle = (e) => {
        Array.from(e.target.files).forEach(i => setImages(images => [...images, URL.createObjectURL(i)]))
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
                <Form.Select aria-label="Catégorie" name="category" value={data.category} onChange={onInputChange} onKeyUp={onInputChange} required>
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
                            onChange={onInputChange}
                            onKeyUp={onInputChange}
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
                            onChange={onInputChange}
                            onKeyUp={onInputChange}
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
                    onChange={onInputChange}
                    onKeyUp={onInputChange}
                    required
                    style={{ height: '200px' }}
                />
            </FloatingLabel>
        </>

    const Step2 =
        <>
            <FloatingLabel controlId="floatingSelect" label="Pays">
                <Form.Select defaultValue="France" onChange={onInputChange} name="country" value={data.country || ''}>
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
                    value={data.address || ''}
                    onChange={onInputChange}
                    onKeyUp={onInputChange}
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
                            value={data.city || ''}
                            onChange={onInputChange}
                            onKeyUp={onInputChange}
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
                            value={data.zipcode || ''}
                            onChange={onInputChange}
                            onKeyUp={onInputChange}
                            required
                        />
                    </FloatingLabel>
                </Col>
            </Row>
            <Divider className='py-3'>
                <FontAwesomeIcon icon={Icons.faArrowDown} color='#9ca3af' />
                <small className='px-3'>Merci de préciser l'adresse dans la carte si ce n'est pas déjà fait automatiquement</small>
                <FontAwesomeIcon icon={Icons.faArrowDown} color='#9ca3af' />
            </Divider>
            <MapContainer center={[coordinates.lat, coordinates.long]} zoom={13} style={{ height: 300 }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'
                />
                <Marker position={[coordinates.lat, coordinates.long]} draggable eventHandlers={eventHandlers} icon={
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
                        value={coordinates.lat}
                        disabled
                        readOnly />
                </FloatingLabel>
                <FloatingLabel label="Latitude" className='my-4'>
                    <Form.Control
                        value={coordinates.long}
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
                    onChange={onInputChange}
                    onKeyUp={onInputChange}
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
                    onChange={onInputChange}
                    onKeyUp={onInputChange}
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
                    onChange={onInputChange}
                    onKeyUp={onInputChange}
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
                    onChange={onInputChange}
                    onKeyUp={onInputChange}
                    required />
            </FloatingLabel>
            {
                properties.map((p) => {
                    return <FloatingLabel label={p.name} className='my-4'>
                        <Form.Control
                            type={p.type}
                            placeholder={p.name}
                            // name="beds"
                            // isInvalid={isInvalid.beds}
                            // value={data.beds || ''}
                            // onChange={onInputChange}
                            // onKeyUp={onInputChange}
                            required={p.isRequired ? true : false} />
                    </FloatingLabel>
                })
            }
        </>

    const Step4 =
        <>
            <Row style={{ fontSize: '1.2rem' }}>
                {equipments.map((e) => {
                    return <Col lg={4} ><Form.Check
                        //name={"equipmenet" + e.id}
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
                    <Calendar value={dates} onChange={setDates} multiple shadow={false} className="border-0 shadow-sm mt-3" />
                </Col>
                <Col className='text-center'>
                    <p className="my-3">List des dates bloquées</p>
                    {
                        dates.sort((a, b) => (new Date(Moment(a.toDate()))) - new Date(Moment(b.toDate()))).map((d) => {
                            return <Row className='bg-light py-1 my-1'>
                                <small>{Moment(d.toDate()).format('DD MMM YYYY')}</small>
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
            title: 'Votre annonce est prête à être publiée',
            content: <div className='d-flex justify-content-center'>
                <Col lg={7}>
                    <CardHouse
                        image={images[0]}
                        title={data.title}
                        destination={data.city + ', ' + data.country}
                        price={data.price}
                        reviews="-" />
                </Col>
            </div>,
        }
    ];

    const next = () => {
        setCurrent(current + 1);
        setDisabled(true);
        if (current == 2 || current == 3) {
            setDisabled(false)
        }
    };

    const prev = () => {
        setCurrent(current - 1);
        setDisabled(false);
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
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

                        <Form onSubmit={handleSubmit}>
                            {/* <h5 className='text-muted' style={{ color: '#b7b7b7' }}><strong className='text-black' style={{ fontSize: '2.25rem' }}>05</strong>/10</h5> */}
                            <Container className=' mt-3 p-5 rounded shadow-sm'>
                                <Divider orientation="left pb-4"><h2 className='text-muted'>{contents[current].title}</h2></Divider>

                                {contents[current].content}

                            </Container>
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
                        </Form>
                    </Col>

                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default NewHouse