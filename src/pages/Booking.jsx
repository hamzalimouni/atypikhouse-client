import * as Icons from '@fortawesome/free-solid-svg-icons'
import * as Brands from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Image, Row, Form, FloatingLabel, ButtonGroup } from 'react-bootstrap'
import AppNavbar from '../components/Navbar'
import Footer from '../components/Footer'
import { DatePicker, Badge, Avatar, message, Divider, Skeleton } from 'antd';
import Moment from 'moment';
import { useNavigate, useParams, useLocation, createSearchParams } from "react-router-dom";
import InputMask from 'react-input-mask';
import { API_URL } from '../Variables';
import notFoundImage from '../assets/img/notfound.svg'

const Paiment = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search)
    const image = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60";
    const { RangePicker } = DatePicker;
    const { id } = useParams()
    const [travelers, setTravelers] = useState(1);
    const [total, setTotal] = useState(0);
    const [found, setfound] = useState(true);
    const [houseData, setHouseData] = useState([])
    const [loading, setLoading] = useState(true);
    const [indisponible, setIndisponible] = useState([])
    const [cc, setCc] = useState(null)
    const [expiration, setExpiration] = useState(null)
    const [cvv, setCvv] = useState(null)
    const [options, setOptions] = useState({
        from: params.get("from") || new Moment(),
        to: params.get("to") || new Moment().add(1, 'days'),
        travelers: parseInt(params.get("travelers")) || 1
    })

    useEffect(() => {
        getHouse()
    }, []);

    useEffect(() => {
        setTotal(houseData.price * Moment(options.to).diff(options.from, 'days') + 15)
        navigate({
            pathname: "/houses/" + id + '/booking',
            search: `?${createSearchParams({
                from: Moment(options.from).format('MM/DD/YYYY'),
                to: Moment(options.to).format('MM/DD/YYYY'),
                travelers: options.travelers,
            })}`
        })
    }, [options]);

    const disabledDate = (current) => {
        let index = indisponible.findIndex(date => date === Moment(current).format('YYYY-MM-DD'))
        return index > -1 && true
    }

    const getHouse = async () => {
        setLoading(true)
        await fetch(API_URL + '/houses/' + id)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else if (response.status === 404) {
                    return Promise.reject(404)
                }
            })
            .then(data => {
                if (data.status == "APPROVED") {
                    data.disponibilities.map((d) => setIndisponible((indisponible) => [...indisponible, Moment(d.date).format('YYYY-MM-DD')]))
                    setHouseData(data)
                    setLoading(false)
                    setTotal(houseData.price * Moment(options.to).diff(options.from, 'days') + 15)
                } else {
                    setfound(false)
                }
            })
            .catch(error => { console.log(error); setfound(false) });
    }

    return (
        <div>
            <AppNavbar />
            <Container className='my-5'>
                {!found ?
                    <Container className='text-center mt-5'>
                        <Image src={notFoundImage} height={300}></Image>
                        <h2 className='mt-5'>Annonce non trouvée</h2>
                        <a>Le lien que vous avez suivi est peut-être rompu ou l'annonce a été supprimée ou bien en cours de révision</a>
                    </Container>
                    :
                    <Row>
                        <Skeleton loading={loading} paragraph={{ rows: 10 }} active >
                            <Col className='mx-5 border rounded'>
                                <div className="border-bottom text-center p-3">
                                    <h1 className='fs-2 m-0'>Réservation</h1>
                                    {/* <small>Confirmée sous 24h par votre hôte</small> */}
                                </div>
                                <div className="p-5 pb-1">
                                    <Divider orientation='left'><h3>Voyage</h3></Divider>

                                    <Row className='my-5'>
                                        <Col>
                                            <RangePicker
                                                disabledDate={disabledDate}
                                                defaultValue={[Moment(options.from), Moment(options.to)]}
                                                onChange={(d) => setOptions({ ...options, from: d[0].toDate(), to: d[1].toDate() })}
                                                style={{ border: '1px solid #f0f0f0', padding: 19, borderRadius: 10 }}
                                                placeholder={["Date d'arrivé", "Date de départ"]}
                                                suffixIcon=""
                                                separator={<FontAwesomeIcon icon={Icons.faArrowRight} color="#cecece" />} />
                                        </Col>
                                        <Col>
                                            <div style={{ border: '1px solid #f0f0f0', padding: 14, borderRadius: 10, height: 62 }}>
                                                <div className="d-flex justify-content-around align-items-center">
                                                    <span>
                                                        Voyageurs
                                                    </span>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <Button variant="atypik" size="sm" style={{ width: "35px" }}
                                                            onClick={() => {
                                                                setOptions({ ...options, travelers: options.travelers - 1 })
                                                            }}
                                                            disabled={options.travelers <= 1}>-</Button>
                                                        <Badge bg="light" text="dark" className='mx-2'>
                                                            {options.travelers}
                                                        </Badge>
                                                        <Button variant="atypik" size="sm" style={{ width: "35px" }}
                                                            onClick={() => {
                                                                setOptions({ ...options, travelers: options.travelers + 1 })
                                                            }}
                                                            disabled={options.travelers > houseData.nbPerson - 1}>+</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="px-5 pb-5 ">
                                    <Divider orientation='left'><h3>Message</h3></Divider>
                                    <div className='ms-3'>
                                        <p className=''>N’hésitez pas à dire un mot à { } au sujet de votre réservation.</p>
                                        <div className='d-flex align-items-center'>
                                            <Avatar style={{ backgroundColor: '#F97316', verticalAlign: 'middle' }} size="large" className='me-2'>
                                                MM
                                            </Avatar>
                                            <div className=''>
                                                <strong className='m-0'>MOUDOU MOHAMMED</strong> · <small>Paris, France</small>
                                            </div>
                                        </div>

                                        <FloatingLabel label="Votre message" className='mt-3'>
                                            <Form.Control
                                                as="textarea"
                                                placeholder="Votre message"
                                                name="message"
                                                style={{ height: '150px' }}
                                                required
                                            />
                                        </FloatingLabel>
                                    </div>

                                </div>
                                <div className="px-5 pb-5">
                                    <Divider orientation='left'><h3>Paiement</h3></Divider>
                                    <span className='ms-4 d-flex align-items-center'>
                                        <FontAwesomeIcon icon={Icons.faLock} color="#cecece" className='me-2' size='1x' />
                                        Paiement sécurisé avec
                                        <FontAwesomeIcon icon={Brands.faCcVisa} color="#cecece" className='mx-2' size='2x' />
                                        <FontAwesomeIcon icon={Brands.faCcMastercard} color="#cecece" className='me-2' size='2x' />
                                    </span>
                                    <Col md={6} className='ms-3'>
                                        <FloatingLabel label="Nom complet" className='my-3'>
                                            <Form.Control
                                                type="text"
                                                placeholder="Titre"
                                                name="title"
                                                required />
                                        </FloatingLabel>
                                        <InputMask mask="9999-9999-9999-9999" maskChar="_" onChange={(e) => setCc(e.value)}>
                                            {() =>
                                                <FloatingLabel label="Numéro de carte" className='my-3'>
                                                    <Form.Control
                                                        value={cc}
                                                        type="text"
                                                        placeholder="Titre"
                                                        name="title"
                                                        required />
                                                </FloatingLabel>
                                            }
                                        </InputMask>
                                        <Row>
                                            <Col>
                                                <InputMask mask="99/99" maskChar="_" onChange={(e) => setExpiration(e.value)}>
                                                    {() =>
                                                        <FloatingLabel label="Date d'expiration">
                                                            <Form.Control
                                                                value={expiration}
                                                                type="text"
                                                                placeholder="Titre"
                                                                name="title"
                                                                required />
                                                        </FloatingLabel>
                                                    }
                                                </InputMask>
                                            </Col>
                                            <Col>
                                                <InputMask mask="9999" maskChar=" " onChange={(e) => setCvv(e.value)}>
                                                    {() =>
                                                        <FloatingLabel label="Cryptogramme">
                                                            <Form.Control
                                                                value={cvv}
                                                                type="text"
                                                                placeholder="Titre"
                                                                name="title"
                                                                required />
                                                        </FloatingLabel>
                                                    }
                                                </InputMask>
                                            </Col>
                                        </Row>
                                    </Col>
                                </div>
                                <div className="px-5 pb-5 ">
                                    {/* <Divider orientation='left'><h3>Confirmation</h3></Divider> */}
                                    <div className='text-center mt-5'>
                                        <Button variant='atypik' className='w-50 mb-3'>Payer et réserver</Button><br />
                                        <small>En cliquant sur le bouton ci-dessous, j’accepte les conditions générales de vente et
                                            d’utilisation de AtypikHouse et j’envoie ma demande pour de très belles vacances,
                                            équitables et responsables !
                                        </small>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={12} md={6} lg={4} className='border rounded sticky-top h-100 p-5'>
                                <img className='img-fluid' width='100%' style={{ height: '100%', borderRadius: 20 }} src={image} alt="" />
                                <h4 className='p-2 text-center'>Title of the reservation house bla okaa</h4>
                                <Divider />
                                <div className='d-flex justify-content-between'>
                                    <span>{houseData.price} € x {Moment(options.to).diff(options.from, 'days')} nuit :</span>
                                    <span>{houseData.price * Moment(options.to).diff(options.from, 'days')} €</span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Les frais de service:</span>
                                    <span>15 €</span>
                                </div>
                                <Divider />
                                <div className='d-flex justify-content-between'>
                                    <strong>Total:</strong>
                                    <strong>{total} €</strong>
                                </div>
                            </Col>
                        </Skeleton>
                    </Row>
                }
            </Container>
            <Footer />
        </div>
    )
}

export default Paiment