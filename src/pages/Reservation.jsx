import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Divider, Empty, Tag, Skeleton, Descriptions } from 'antd';
import bg from '../assets/img/bg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie'
import { API_URL, MEDIA_URL } from '../Variables';
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';
import accessDeniedImage from '../assets/img/accessdenied.svg'

const Reservation = () => {

    useEffect(() => {
        document.title = "Réservation - AtypikHouse";
    }, [])

    const { id } = useParams()
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    let curUser = Cookies.get('user');

    const [data, setData] = useState([]);

    useEffect(() => {
        getReservation()
    }, []);

    const getReservation = () => {
        fetch(API_URL + '/reservations/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + Cookies.get("token"),
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    return Promise.reject(response.status)
                }
            })
            .then(data => {
                setLoading(false)
                setData(data);
            })
            .catch(error => {
                setLoading(false)
                setNotFound(true)
                console.log(error);
            });
    }

    return (
        <div>
            <Navbar />
            <Container className='mt-5'>
                <Container>
                    {
                        notFound ?
                            <Container className='text-center mt-5'>
                                <Image src={accessDeniedImage} height={300}></Image>
                                <h2 className='mt-5'>Nous sommes désolés</h2>
                                <a>Mais vous n'avez pas la permission pour accéder à cette page</a>
                            </Container>
                            :
                            <Col md={8} className='mx-lg-5 border rounded mx-lg-auto mx-auto p-4'>
                                <Skeleton loading={loading} paragraph={{ rows: 10 }} active >
                                    <span role='button' onClick={() => navigate('../account/reservations')}><FontAwesomeIcon icon={Icons.faArrowLeft} color="#767A82" className='pe-1' /> Retour</span>
                                    <div className="p-lg-5 pt-lg-0 pb-1">
                                        <Divider orientation='left'><h3>Votre réservation (#{data.id})</h3></Divider>
                                        {
                                            data.status == "CANCELED" ?
                                                <Tag color="error" className='mx-auto w-100 text-center p-2 fs-5 mb-3'>Votre réservation a été annulée par l'hôte</Tag>
                                                : null
                                        }
                                        <Row role='button' className='mx-lg-5 d-flex align-items-center' onClick={() => window.open('/houses/' + data.house?.id, '_blank')}>
                                            <Col lg={4} className="p-0">
                                                <div style={{
                                                    height: 150, width: '100%', backgroundImage: `url(${MEDIA_URL + data.house?.images[0]?.fileName})`, backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    borderRadius: 10
                                                }}></div>
                                            </Col>
                                            <Col lg={8}>
                                                <h2 className='m-0 searchItemTitle pt-2'>{data.house?.title}</h2>
                                                <small> <FontAwesomeIcon className='icon' icon={Icons.faLocationDot} color="#8ED081" /> {data.house?.address?.city}, {data.house?.address?.country}</small>
                                                <div className='d-flex justify-content-between  py-2 my-2'>
                                                    <div><FontAwesomeIcon icon={Icons.faUser} color="#767A82" className='pe-1' /> {data.house?.nbPerson} personnes</div>
                                                    <div><FontAwesomeIcon icon={Icons.faBed} color="#767A82" className='pe-1' /> {data.house?.beds} lits</div>
                                                    <div><FontAwesomeIcon icon={Icons.faDoorOpen} color="#767A82" className='pe-1' /> {data.house?.rooms} pièces</div>
                                                </div>
                                                {/* <div className=''>
                                        <FontAwesomeIcon icon={Icons.faStar} color="#F97316" className='pe-2' />
                                        <span>{data.rating}</span>
                                    </div> */}
                                            </Col>
                                        </Row>
                                        <Row className='my-5 border-top border-bottom rounded mx-lg-5 rounded'>
                                            <Col className='p-3 border-end' md={6} sm={12}>
                                                <FontAwesomeIcon icon={Icons.faCalendar} color="#b0b0b0" className='px-2' />
                                                <span style={{ color: '#b0b0b0' }}>Date</span><br />
                                                <div className='text-center mt-2'>
                                                    <strong className='ms-4'>{moment(data.fromDate).format('DD MMM YYYY') + ' - ' + moment(data.toDate).format('DD MMM YYYY')}</strong>
                                                </div>
                                            </Col>
                                            <Col className='p-3' md={6} sm={12}>
                                                <FontAwesomeIcon icon={Icons.faPeopleGroup} color="#b0b0b0" className='px-2' />
                                                <span style={{ color: '#b0b0b0' }}>Voyageurs</span><br />
                                                <div className='text-center mt-2'>
                                                    <strong className='ms-4'>{data.nbPersons} Voyageurs</strong>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Divider orientation='left'><h3>Réservation details</h3></Divider>
                                        <Descriptions bordered column={1}>
                                            <Descriptions.Item label="Numéro de réservation">#{data.id}</Descriptions.Item>
                                            <Descriptions.Item label="Date de réservation">{moment(data.createdAt).format('DD MMM YYYY - HH:MM')}</Descriptions.Item>
                                            <Descriptions.Item label="Montant payé">{data.amount}€</Descriptions.Item>
                                            {/* <Descriptions.Item label="Méthod de paiement">Carte bancaire</Descriptions.Item> */}
                                        </Descriptions>
                                    </div>
                                </Skeleton>
                            </Col>
                    }
                </Container>
            </Container >
            <Footer />
        </div >
    )
}

export default Reservation