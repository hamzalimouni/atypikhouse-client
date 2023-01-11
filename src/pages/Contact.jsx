import React, { useEffect } from 'react'
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import AppNavbar from '../components/Navbar'
import review from '../assets/icons/review.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faContactCard, faHome, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { Breadcrumb } from 'antd'

const Contact = () => {

    useEffect(() => {
        document.title = "Nous contacter - AtypikHouse";
    }, []);

    return (
        <div>
            <AppNavbar />
            <div className="py-4">
                <Container>
                    <Breadcrumb className='bg-light p-2 rounded-pill ps-4 mb-3'>
                        <Breadcrumb.Item href="/">
                            <FontAwesomeIcon icon={faHome} color="#767A82" className='pe-2' />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Nous contacter</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='text-center py-4 d-flex justify-content-center align-items-center'>
                        <Image className='atypik-img-title' src={review} height='70px' />
                        <h2 className='atypik-cur-title m-0 px-2'> contact</h2>
                    </div>
                    <Row className='mt-4 d-flex justify-content-center container'>
                        <Col sm={12} md={6} lg={4} xl={5}>
                            <Card className="p-5">
                                <Card.Title className='text-center pb-4'>Information de contact</Card.Title>
                                <Card.Text>Remplissez le formulaire et notre équipe vous répondra dans les 24 heures</Card.Text>
                                <div className="icons d-flex flex-column my-3">
                                    <div className="contact-phone d-flex gap-4 py-4">
                                        <FontAwesomeIcon fontSize={25} icon={faPhone} />
                                        <span>+33 1 43 22 33 44</span>
                                    </div>
                                    <div className="contact-email d-flex gap-4">
                                        <FontAwesomeIcon fontSize={25} icon={faContactCard} />
                                        <span>contact@atypikhouse.com</span>
                                    </div>
                                    <div className="contact-location d-flex gap-4 py-4">
                                        <FontAwesomeIcon fontSize={25} icon={faLocationDot} />
                                        <span>Pierrefonds, département de l’Oise</span>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col sm={12} md={6} lg={4} xl={5}>
                            <Card className="p-5">
                                <Card.Title className='text-center pb-4'>Formulaire de contact</Card.Title>
                                <Form>
                                    <Form.Group className='mb-3'>
                                        <Form.Control type='text' placeholder='Nom et Prénom' />
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Control type='email' placeholder='Email' />
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Control type='tel' placeholder='Telephone' />
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <textarea className='form-control' placeholder='Message' name="" id="" rows="5"></textarea>
                                    </Form.Group>
                                    <Form.Group className='d-flex justify-content-end'>
                                        <Button variant="atypik" className='w-50'>Envoyer</Button>
                                    </Form.Group>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* <Container className='py-4'>
                <div className='text-center py-4 d-flex justify-content-center align-items-center'>
                    <Image className='atypik-img-title' src={review} height='70px' />
                    <h2 className='atypik-cur-title m-0 px-2'> Notre localisation</h2>
                </div>
            </Container> */}
            <Footer />
        </div>
    )
}

export default Contact