import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SearchForm from '../components/SearchForm'
import CardHouse from '../components/CardHouse'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import campfire from '../assets/icons/campfire.png'
import review from '../assets/icons/review.png'
import happy from '../assets/icons/happy.png'
import ReviewCard from '../components/ReviewCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

const Home = () => {

    return (
        <div>
            <Navbar />
            <SearchForm />
            <div className="py-5">
                <Container>
                    <div className='text-center d-flex justify-content-center align-items-center py-2'>
                        <Image className='atypik-img-title' src={campfire} height='70px' />
                        <h2 className='atypik-cur-title m-0 px-2'> Les meilleurs endroits</h2>
                    </div>
                    <Row className='container py-4'>
                        <Col sm={12} md={6} lg={4}><CardHouse
                            title="Hello"
                            destination="Location"
                            price="350"
                            reviews="4.8" /></Col>
                        <Col sm={12} md={6} lg={4}><CardHouse
                            title="Hello"
                            destination="Location"
                            price="350"
                            reviews="4.8" /></Col>
                        <Col sm={12} md={6} lg={4}><CardHouse
                            title="Hello"
                            destination="Location"
                            price="350"
                            reviews="4.8" /></Col>
                    </Row>
                </Container>
            </div>
            <div className="main-background-color py-5">
                <Container >
                    <div className='text-center mt-4 d-flex justify-content-center align-items-center py-2'>
                        <Image className='atypik-img-title' src={review} height='70px' />
                        <h2 className='atypik-cur-title m-0 px-2'> Ce que les gens disaient</h2>
                    </div>
                    <Row className='container py-4'>
                        <Col sm={12} md={6} lg={4}><ReviewCard
                            name="Sarah M."
                            location="Paris, France "
                            house="Lorem ipsum dolor sit amet"
                            review="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            stars={4.8} /></Col>
                        <Col sm={12} md={6} lg={4}><ReviewCard
                            name="Sarah M."
                            location="Paris, France "
                            house="Lorem ipsum dolor sit amet"
                            review="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            stars={4.8} /></Col>
                        <Col sm={12} md={6} lg={4}><ReviewCard
                            name="Sarah M."
                            location="Paris, France "
                            house="Lorem ipsum dolor sit amet"
                            review="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            stars={4.8} /></Col>
                    </Row>
                </Container>
            </div>
            <div className="py-5">
                <Container >
                    <div className='text-center mt-4 d-flex justify-content-center align-items-center py-2'>
                        <Image className='atypik-img-title' src={happy} height='70px' />
                        <h2 className='atypik-cur-title m-0 px-2'> Les plus belles expériences</h2>
                    </div>
                    <div className='d-flex py-4'>
                        <Card style={{ width: '150px' }} className='mx-auto mt-4 pt-4'>
                            <FontAwesomeIcon icon={Icons.faHouseFloodWater} color="#0A2D74" size="4x" />
                            <Card.Body className='text-center mt-2'>
                                <Card.Title style={{ fontSize: '1.1em', color: '#0A2D74' }}>Cabanes</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            </div>
            <Footer />
        </div >
    )
}

export default Home