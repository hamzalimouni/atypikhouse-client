import React from 'react'
import { Col, Container, NavLink, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import AppNavbar from '../components/Navbar'
import ReservationCard from '../components/ReservationCard'

const Paiment = () => {
    return (
        <div>
            <AppNavbar />
            <Container className='my-5'>
                <Row>
                    <Col className='mx-5'>
                        <div className="reservation-title text-center mb-4">
                            <h1 className='fs-2'>Demande de réservation</h1>
                            <span>Confirmée sous 24h par votre hôte</span>
                        </div>
                        <div className="voyage-details">
                            <h2>Voyage</h2>
                            <div className="dates-voyge d-flex justify-content-between align-items-center my-3">
                                <div className="dates d-flex flex-column">
                                    <span className='fw-bold'>Dates</span>
                                    <span>19 novembre 2022 - 22 novembre 2022</span>
                                </div>
                                <Link href="#">Modifier</Link>
                            </div>
                            <div className="voyageurs d-flex justify-content-between align-items-center">
                                <div className="voyageur dates d-flex flex-column">
                                    <span className='fw-bold'>Voyageurs</span>
                                    <span>2 voyageurs</span>
                                </div>
                                <Link href="#">Modifier</Link>
                            </div>
                        </div>
                        <div className="voyage-paiment my-5">
                            <h2>Paiment</h2>
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={4}>
                        <ReservationCard />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default Paiment