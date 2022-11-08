import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SearchForm from '../components/SearchForm'
import CardHouse from '../components/CardHouse'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import campfire from '../assets/icons/campfire.png';
import review from '../assets/icons/review.png';
import happy from '../assets/icons/happy.png';
import ReviewCard from '../components/ReviewCard'
import HorizontalScroll from 'react-scroll-horizontal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    return (
        <div>
            <Navbar />
            <SearchForm />
            <Container>
                <div className='text-center mt-4 d-flex justify-content-center'>
                    <Image src={campfire} height='70px' />
                    <h2 className='atypik-cur-title'> Les meilleurs endroits</h2>
                </div>
                <Row className='container'>
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
            <Container className='mt-5'>
                <div className='text-center mt-4 d-flex justify-content-center'>
                    <Image src={review} height='70px' />
                    <h2 className='atypik-cur-title'> Ce que les gens disaient</h2>
                </div>
                <Row className='container'>
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

            <Container className='mt-5'>
                <div className='text-center mt-4 d-flex justify-content-center'>
                    <Image src={happy} height='70px' />
                    <h2 className='atypik-cur-title'> Les plus belles expériences</h2>
                </div>
                <div className='d-flex'>
                    <Card style={{ width: '150px' }} className='mx-auto mt-4 pt-4'>
                        <FontAwesomeIcon icon={Icons.faHouseFloodWater} color="#0A2D74" size="4x" />
                        <Card.Body className='text-center mt-2'>
                            <Card.Title style={{ fontSize: '1.1em', color: '#0A2D74' }}>Cabanes</Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
            <Footer />
        </div >
    )
}

export default Home