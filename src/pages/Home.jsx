import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SearchForm from '../components/SearchForm'
import CardHouse from '../components/CardHouse'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import { Skeleton } from 'antd'
import campfire from '../assets/icons/campfire.png'
import review from '../assets/icons/review.png'
import money from '../assets/icons/money.png'
import happy from '../assets/icons/happy.png'
import ReviewCard from '../components/ReviewCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { API_URL, MEDIA_URL } from '../Variables'
import { createSearchParams, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const [houses, setHouses] = useState([])
    const [cheapHouses, setCheapHouses] = useState([])
    const [reviews, setReviews] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        document.title = "AtypikHouse - Location insolites pour des vacances inoubliables";
        getHouses()
        getReviews()
        getCategories()
        getCheapestHouses()
    }, []);

    const getHouses = async () => {
        await fetch(API_URL + "/houses?status=APPROVED")
            .then(res => res.json())
            .then(data => setHouses(data['hydra:member']))
            .catch(error => { console.log(error); setHouses([]) });
    }

    const getCheapestHouses = async () => {
        await fetch(API_URL + "/houses?order[price]=ASC&status=APPROVED")
            .then(res => res.json())
            .then(data => setCheapHouses(data['hydra:member']))
            .catch(error => { console.log(error); setCheapHouses([]) });
    }

    const getReviews = async () => {
        await fetch(API_URL + "/reviews")
            .then(res => res.json())
            .then(data => setReviews(data['hydra:member']))
            .catch(error => { console.log(error); setReviews([]) });
    }
    const getCategories = async () => {
        await fetch(API_URL + "/categories")
            .then(res => res.json())
            .then(data => setCategories(data['hydra:member']))
            .catch(error => { console.log(error); setCategories([]) });
    }

    return (
        <div>
            <Navbar />
            <SearchForm />
            <div className="py-5">
                <Container>
                    <div className='text-center d-flex justify-content-center align-items-center py-2'>
                        <Image alt='Les meilleurs endroits' className='atypik-img-title' src={campfire} height='70px' />
                        <h2 className='atypik-cur-title m-0 px-2'> Les meilleurs endroits</h2>
                    </div>
                    <Row className='container py-4 m-0'>
                        {
                            houses.length > 0 ? [1, 2, 3].map(function () {
                                let rnd = Math.floor(Math.random() * houses.length)
                                let ravg = 0;
                                houses[rnd]?.reviews.map((r) => ravg += r.grade / houses[rnd]?.reviews.length)
                                return <Col role='article' onClick={() => window.open('houses/' + houses[rnd]?.id)} sm={12} md={6} lg={4}><CardHouse
                                    image={MEDIA_URL + houses[rnd]?.images[0]?.fileName}
                                    title={houses[rnd]?.title}
                                    destination={houses[rnd]?.address?.city + ', ' + houses[rnd]?.address?.country}
                                    price={houses[rnd]?.price}
                                    reviews={ravg == 0 ? '-' : ravg.toFixed(1) + ' (' + houses[rnd].reviews.length + ')'} /></Col>
                            }) : <>
                                <Col>
                                    <Skeleton loading={true} active></Skeleton>
                                </Col>
                                <Col>
                                    <Skeleton loading={true} active></Skeleton>
                                </Col>
                                <Col>
                                    <Skeleton loading={true} active></Skeleton>
                                </Col>
                            </>
                        }
                    </Row>
                </Container>
            </div>
            <div className="py-5">
                <Container>
                    <div className='text-center d-flex justify-content-center align-items-center py-2'>
                        <Image alt='Les meilleurs endroits' className='atypik-img-title' src={money} height='70px' />
                        <h2 className='atypik-cur-title m-0 px-2'> Les moins chers</h2>
                    </div>
                    <Row className='container py-4 m-0'>
                        {
                            cheapHouses.length > 0 ? cheapHouses.slice(0, 3).map((h) => {

                                let ravg = 0;
                                h?.reviews?.map((r) => ravg += r.grade / h?.reviews.length)
                                return <Col role='article' onClick={() => window.open('houses/' + h?.id)} sm={12} md={6} lg={4}><CardHouse
                                    image={MEDIA_URL + h?.images[0]?.fileName}
                                    title={h?.title}
                                    destination={h?.address?.city + ', ' + h?.address?.country}
                                    price={h?.price}
                                    reviews={ravg == 0 ? '-' : ravg.toFixed(1) + ' (' + h.reviews.length + ')'} /></Col>
                            }) : <>
                                <Col>
                                    <Skeleton loading={true} active></Skeleton>
                                </Col>
                                <Col>
                                    <Skeleton loading={true} active></Skeleton>
                                </Col>
                                <Col>
                                    <Skeleton loading={true} active></Skeleton>
                                </Col>
                            </>
                        }
                    </Row>
                </Container>
            </div>
            <div className="main-background-color py-5">
                <Container >
                    <div className='text-center mt-4 d-flex justify-content-center align-items-center py-2'>
                        <Image alt='Ce que les gens disaient' className='atypik-img-title' src={review} height='70px' />
                        <h2 className='atypik-cur-title m-0 px-2'> Ce que les gens disaient</h2>
                    </div>
                    <Row className='container py-4 m-0'>
                        {
                            reviews.length > 0 ? [1, 2, 3].map(function () {
                                let rnd = Math.floor(Math.random() * reviews.length)
                                return <Col sm={12} md={6} lg={4}><ReviewCard
                                    name={reviews[rnd].user.firstname + ' ' + reviews[rnd].user.firstname.charAt(0)}
                                    location={reviews[rnd]?.user?.address && (reviews[rnd]?.user?.address?.city + ', ' + reviews[rnd]?.user?.address?.country) || '-'}
                                    review={reviews[rnd].comment}
                                    stars={reviews[rnd].grade} /></Col>
                            }) :
                                <>
                                    <Col>
                                        <Skeleton loading={true} active></Skeleton>
                                    </Col>
                                    <Col>
                                        <Skeleton loading={true} active></Skeleton>
                                    </Col>
                                    <Col>
                                        <Skeleton loading={true} active></Skeleton>
                                    </Col>
                                </>
                        }
                    </Row>
                </Container>
            </div>
            <div className="py-5">
                <Container >
                    <div className='text-center mt-4 d-flex justify-content-center align-items-center py-2'>
                        <Image alt='Les plus belles expériences' className='atypik-img-title' src={happy} height='70px' />
                        <h2 className='atypik-cur-title m-0 px-2'> Les plus belles expériences</h2>
                    </div>
                    <div className='d-flex py-4 px-2 justify-content-between hideScroll' style={{ overflow: 'auto' }}>
                        {
                            categories.length > 0 ?
                                categories.map(function (c) {
                                    return <div className='p-3' style={{ flex: '0 0 200px' }}>
                                        <Card className='mx-auto mt-4 pt-4' role="button"
                                            onClick={() => navigate({
                                                pathname: "/houses",
                                                search: `?${createSearchParams({
                                                    category: c.id,
                                                })}`
                                            })} >
                                            <FontAwesomeIcon icon={Icons.faEarthEurope} color="#0A2D74" size="4x" />
                                            <Card.Body className='text-center mt-2'>
                                                <Card.Title style={{ fontSize: '1.1em', color: '#0A2D74' }}>{c.name}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                }) :
                                <div className='d-flex justify-content-between w-100'>
                                    <Skeleton.Node active>
                                        <FontAwesomeIcon icon={Icons.faPlane} size="2x" color='#bfbfbf' />
                                    </Skeleton.Node>
                                    <Skeleton.Node active>
                                        <FontAwesomeIcon icon={Icons.faCompass} size="2x" color='#bfbfbf' />
                                    </Skeleton.Node>
                                    <Skeleton.Node active>
                                        <FontAwesomeIcon icon={Icons.faGlobe} size="2x" color='#bfbfbf' />
                                    </Skeleton.Node>
                                    <Skeleton.Node active>
                                        <FontAwesomeIcon icon={Icons.faMountainSun} size="2x" color='#bfbfbf' />
                                    </Skeleton.Node>
                                    <Skeleton.Node active>
                                        <FontAwesomeIcon icon={Icons.faBuilding} size="2x" color='#bfbfbf' />
                                    </Skeleton.Node>
                                </div>
                        }
                    </div>
                </Container>
            </div>
            <Footer />
        </div >
    )
}

export default Home