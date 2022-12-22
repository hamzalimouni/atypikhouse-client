import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Divider, Empty, Badge, Descriptions } from 'antd';
import bg from '../assets/img/bg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie'
import { API_URL } from '../Variables';
import SearchItem from '../components/SearchItem';

const Reservations = () => {

    useEffect(() => {
        document.title = "Réservation confirmée - AtypikHouse";
    }, []);

    let curUser = Cookies.get('user');
    const image = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60";

    // const [houses, setHouses] = useState([]);

    // console.log()
    // useEffect(() => {
    //     getHouses()
    // }, []);

    // const getHouses = () => {
    //     fetch(API_URL + '/houses?owner.id=' + JSON.parse(curUser)['id'] + '&order[createdAt]=desc')
    //         .then(res => res.json())
    //         .then((result) => { setHouses(result["hydra:member"]) })
    // }

    return (
        <div>
            <Navbar />
            <Container className='mt-5'>
                {/* <div className='row justify-content-lg-center mt-5'>
                    <Empty description="Aucune réservation passée" />
                </div> */}
                <Container>
                    <Col md={8} className='mx-lg-5 border rounded mx-lg-auto mx-auto p-4'>
                        <div className="border-bottom text-center p-3">
                            <h1 className='fs-2 m-0'>Félicitation 🎉</h1>
                            {/* <small>Confirmée sous 24h par votre hôte</small> */}
                        </div>
                        <div className="p-lg-5 pb-1">
                            <Divider orientation='left'><h3>Votre réservation</h3></Divider>
                            <Row className='mx-lg-5 d-flex align-items-center'>
                                <Col lg={4} className="p-0">
                                    <img className='img-fluid rounded' width='100%' style={{ height: '100%' }} src={image} alt="" />
                                </Col>
                                <Col lg={8}>
                                    <h2 className='m-0 searchItemTitle pt-2'>Title usfe lorem ipsu</h2>
                                    <small> <FontAwesomeIcon className='icon' icon={Icons.faLocationDot} color="#8ED081" /> Paris, France</small>
                                    <div className='d-flex justify-content-between  py-2 my-2'>
                                        <div><FontAwesomeIcon icon={Icons.faUser} color="#767A82" className='pe-1' /> 5 personnes</div>
                                        <div><FontAwesomeIcon icon={Icons.faBed} color="#767A82" className='pe-1' /> 2 lits</div>
                                        <div><FontAwesomeIcon icon={Icons.faDoorOpen} color="#767A82" className='pe-1' /> 10 pièces</div>
                                    </div>
                                    <div className=''>
                                        <FontAwesomeIcon icon={Icons.faStar} color="#F97316" className='pe-2' />
                                        <span>4.2</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='my-5 border-top border-bottom rounded mx-lg-5 rounded'>
                                <Col className='p-3 border-end' md={6} sm={12}>
                                    <FontAwesomeIcon icon={Icons.faCalendar} color="#b0b0b0" className='px-2' />
                                    <span style={{ color: '#b0b0b0' }}>Date</span><br />
                                    <div className='text-center mt-2'>
                                        <strong className='ms-4'>12 Jan 2022 - 24 Jan 2022</strong>
                                    </div>
                                </Col>
                                <Col className='p-3' md={6} sm={12}>
                                    <FontAwesomeIcon icon={Icons.faPeopleGroup} color="#b0b0b0" className='px-2' />
                                    <span style={{ color: '#b0b0b0' }}>Voyageurs</span><br />
                                    <div className='text-center mt-2'>
                                        <strong className='ms-4'>5 Voyageurs</strong>
                                    </div>
                                </Col>
                            </Row>
                            <Divider orientation='left'><h3>Réservation details</h3></Divider>
                            <Descriptions bordered column={1}>
                                <Descriptions.Item label="Numéro de réservation">#1000045</Descriptions.Item>
                                <Descriptions.Item label="Date de réservation">12 Jan 2022 - 14h30</Descriptions.Item>
                                <Descriptions.Item label="Total">200</Descriptions.Item>
                                <Descriptions.Item label="Méthod de paiement">Carte bancaire (*4965)</Descriptions.Item>
                            </Descriptions>
                        </div>
                    </Col>
                </Container>
            </Container >
            <Footer />
        </div >
    )
}

export default Reservations