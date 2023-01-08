import React, { useState, useEffect } from 'react'
import { Button, Container, Col, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Divider, Empty, Avatar, Skeleton, Badge } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie'
import { API_URL, MEDIA_URL } from '../Variables';
import { useNavigate } from "react-router-dom";
import moment from 'moment';

const Reservations = () => {

    useEffect(() => {
        document.title = "Mes réservations - AtypikHouse";
    }, [])

    let navigate = useNavigate();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let curUser = Cookies.get('user');
        fetch(API_URL + '/reservations?user.id=' + JSON.parse(curUser)['id'] + '&order[createdAt]=desc', {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + Cookies.get("token"),
            },
        })
            .then(res => res.json())
            .then((result) => { setData(result["hydra:member"]); setLoading(false) })
    }, []);

    return (
        <div>
            <Navbar />
            <Container className='mt-5'>
                <Divider><h2 className='text-center text-blue'>Mes réservations</h2></Divider>
                {/* <div className='row justify-content-md-center mt-5'>
                    <Empty description="Aucune réservation" />
                </div> */}
                <Container>
                    <Skeleton loading={loading} paragraph={{ rows: 10 }} active >
                        {
                            data.length > 0 ?
                                data?.map((r) => {
                                    return <Badge.Ribbon text="Annulée" color="red" style={{ display: r.status === "CANCELED" ? 'block' : 'none' }}>
                                        <Row className='border p-4 d-flex align-items-center justify-content-between rounded shadow-sm my-4'>
                                            <Col md={10} sm={12} className='d-flex align-items-center'>
                                                <Row className='w-100 align-items-center'>
                                                    <Col md={2} sm={12} className='text-center'>
                                                        <Avatar className='mx-auto ms-4' size={80} src={MEDIA_URL + r.house?.images[0]?.fileName} />
                                                    </Col>
                                                    <Col className='ms-4 p-2 text-center'>
                                                        {/* {r.status !== "CANCELED" ? <span className="ms-3 rounded bg-danger text-white float-right px-2 py-1">Annulée</span> : null} */}
                                                        <p className=''>{r.house.title}</p>
                                                        <Row className='mt-2 justify-content-center'>
                                                            <Col md={4} sm={12} className='text-center d-flex py-2 border-top'>
                                                                <FontAwesomeIcon icon={Icons.faCalendar} color="#4caf50" className='px-2' />
                                                                <span>{moment(r.fromDate).format('DD MMM YYYY')}</span>
                                                                <small><FontAwesomeIcon icon={Icons.faArrowRight} color="#dadada" className='px-2' /></small>
                                                                <span>{moment(r.toDate).format('DD MMM YYYY')} </span>
                                                            </Col>
                                                            {/* <span className='px-3'>·</span> */}
                                                            <Col md={2} sm={12} className='text-center py-2 border-top'>
                                                                <FontAwesomeIcon icon={Icons.faPeopleGroup} color="#4caf50" className='px-2' />
                                                                <span>{r.nbPersons}</span>
                                                            </Col>
                                                            {/* <span className='px-3'>·</span> */}
                                                            <Col md={2} sm={12} className='text-center py-2 border-top'>
                                                                <FontAwesomeIcon icon={Icons.faEuro} color="#4caf50" className='px-2' />
                                                                <span>{r.amount}</span>
                                                            </Col>
                                                            {/* <span className='ps-5 pe-3'>·</span> */}
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md={2} sm={12} className="text-center">
                                                <Button variant='flat' onClick={() => navigate('../account/reservation/' + r.id)} className='text-primary btn-sm'><FontAwesomeIcon icon={Icons.faEye} /> Consulter</Button>
                                            </Col>
                                        </Row>
                                    </Badge.Ribbon>
                                })
                                :
                                <div className='row justify-content-md-center mt-5'>
                                    <Empty description="Aucune réservation effectuée" />
                                    <Button variant="atypik" onClick={() => navigate('/houses')} className='mt-5 w-25 btn-sm'>Voir les annonces publiées</Button>
                                </div>
                        }
                    </Skeleton>
                </Container>
            </Container >
            <Footer />
        </div >
    )
}

export default Reservations