import React from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Divider, Empty } from 'antd';
import bg from '../assets/img/bg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';

const Annonces = () => {
    return (
        <div>
            <Navbar />
            <Container className='mt-5'>
                <Divider><h2 className='text-center text-blue'>Mes annonces</h2></Divider>
                {/* <div className='row justify-content-md-center mt-5'>
                    <Empty description="Aucune annonce publiée" />
                    <Button variant="atypik" className='mt-5 w-25 btn-sm'>Publier une annonce</Button>
                </div> */}
                <Container>
                    <Row className='mt-5 shadow-sm p-sm-3'>
                        <Col sm={2} className='text-center'>
                            <Image src={bg} height={100} width={150} style={{ objectFit: 'cover' }} />
                        </Col>
                        <Col sm={8}>
                            <h5 className='m-0'>Titre de l'annonce bla bla bla</h5>
                            <small>Small description Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur dolore saepe laborum nihil atque obcaecati quod minima et beatae, exercitationem, consequatur quam facere quia recusandae distinctio vero, iste fugit amet!</small>
                            <div className='d-flex'>
                                <div className='p-3'>
                                    <FontAwesomeIcon icon={Icons.faEuroSign} color="#8ed081" /> <small>350</small>
                                </div>
                                <div className='p-3'>
                                    <FontAwesomeIcon icon={Icons.faPeopleGroup} color="#8ed081" /> <small>2</small>
                                </div>
                                <div className='p-3'>
                                    <FontAwesomeIcon icon={Icons.faPersonShelter} color="#8ed081" /> <small>2</small>
                                </div>
                            </div>
                        </Col>
                        <Col sm={2}>
                            <Button variant='flat' className='text-warning btn-sm w-100'><FontAwesomeIcon icon={Icons.faEye} /> Voir</Button>
                            <Button variant='flat' className='text-black btn-sm w-100'><FontAwesomeIcon icon={Icons.faEdit} /> Modifier</Button>
                            <Button variant='flat' className='text-danger btn-sm w-100'><FontAwesomeIcon icon={Icons.faTrash} /> Supprimer</Button>
                        </Col>
                    </Row>

                    <Row className='mt-5 shadow-sm p-sm-3'>
                        <Col sm={2} className='text-center'>
                            <Image src={bg} height={100} width={150} style={{ objectFit: 'cover' }} />
                        </Col>
                        <Col sm={8}>
                            <h5 className='m-0'>Titre de l'annonce bla bla bla</h5>
                            <small>Small description Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur dolore saepe laborum nihil atque obcaecati quod minima et beatae, exercitationem, consequatur quam facere quia recusandae distinctio vero, iste fugit amet!</small>
                            <div className='d-flex'>
                                <div className='p-3'>
                                    <FontAwesomeIcon icon={Icons.faEuroSign} color="#8ed081" /> <small>350</small>
                                </div>
                                <div className='p-3'>
                                    <FontAwesomeIcon icon={Icons.faPeopleGroup} color="#8ed081" /> <small>2</small>
                                </div>
                                <div className='p-3'>
                                    <FontAwesomeIcon icon={Icons.faPersonShelter} color="#8ed081" /> <small>2</small>
                                </div>
                            </div>
                        </Col>
                        <Col sm={2}>
                            <Button variant='flat' className='text-warning btn-sm w-100'><FontAwesomeIcon icon={Icons.faEye} /> Voir</Button>
                            <Button variant='flat' className='text-black btn-sm w-100'><FontAwesomeIcon icon={Icons.faEdit} /> Modifier</Button>
                            <Button variant='flat' className='text-danger btn-sm w-100'><FontAwesomeIcon icon={Icons.faTrash} /> Supprimer</Button>
                        </Col>
                    </Row>
                    <Row className='mt-5 shadow-sm p-sm-3'>
                        <Col sm={2} className='text-center'>
                            <Image src={bg} height={100} width={150} style={{ objectFit: 'cover' }} />
                        </Col>
                        <Col sm={8}>
                            <h5 className='m-0'>Titre de l'annonce bla bla bla</h5>
                            <small>Small description Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur dolore saepe laborum nihil atque obcaecati quod minima et beatae, exercitationem, consequatur quam facere quia recusandae distinctio vero, iste fugit amet!</small>
                            <div className='d-flex'>
                                <div className='p-3'>
                                    <FontAwesomeIcon icon={Icons.faEuroSign} color="#8ed081" /> <small>350</small>
                                </div>
                                <div className='p-3'>
                                    <FontAwesomeIcon icon={Icons.faPeopleGroup} color="#8ed081" /> <small>2</small>
                                </div>
                                <div className='p-3'>
                                    <FontAwesomeIcon icon={Icons.faPersonShelter} color="#8ed081" /> <small>2</small>
                                </div>
                            </div>
                        </Col>
                        <Col sm={2}>
                            <Button variant='flat' className='text-warning btn-sm w-100'><FontAwesomeIcon icon={Icons.faEye} /> Voir</Button>
                            <Button variant='flat' className='text-black btn-sm w-100'><FontAwesomeIcon icon={Icons.faEdit} /> Modifier</Button>
                            <Button variant='flat' className='text-danger btn-sm w-100'><FontAwesomeIcon icon={Icons.faTrash} /> Supprimer</Button>
                        </Col>
                    </Row>

                </Container>

            </Container>
            <Footer />
        </div>
    )
}

export default Annonces