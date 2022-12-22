import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Divider, Empty, Badge, Avatar, Skeleton } from 'antd';
import bg from '../assets/img/bg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie'
import { API_URL, MEDIA_URL } from '../Variables';
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';

const Reservations = () => {

    useEffect(() => {
        document.title = "Mes réservations - AtypikHouse";
    }, [])

    let navigate = useNavigate();
    let curUser = Cookies.get('user');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        getReservations()
    }, []);

    const getReservations = () => {
        fetch(API_URL + '/reservations?user.id=' + JSON.parse(curUser)['id'] + '&order[createdAt]=desc', {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + Cookies.get("token"),
            },
        })
            .then(res => res.json())
            .then((result) => { setData(result["hydra:member"]); setLoading(false) })
    }

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
                                    return <div className='border p-4 d-flex align-items-center justify-content-between rounded shadow-sm my-4'>
                                        <div className='d-flex align-items-center'>
                                            <Avatar size={80} src={MEDIA_URL + r.house?.images[0]?.fileName} />
                                            <div className='ms-4'>
                                                <strong className=''>{r.house.title}</strong>
                                                {r.status == "CANCELED" ? <span className="ms-3 rounded bg-danger text-white float-right px-2 py-1">Annulée</span> : null}
                                                <div className='d-flex align-items-center mt-2'>
                                                    <FontAwesomeIcon icon={Icons.faCalendar} color="#4caf50" className='px-2' />
                                                    <span>{moment(r.fromDate).format('DD MMM YYYY')}</span>
                                                    <small><FontAwesomeIcon icon={Icons.faArrowRight} color="#dadada" className='px-2' /></small>
                                                    <span>{moment(r.toDate).format('DD MMM YYYY')} </span>
                                                    <span className='px-3'>·</span>
                                                    <FontAwesomeIcon icon={Icons.faPeopleGroup} color="#4caf50" className='px-2' />
                                                    <span>{r.nbPersons}</span>
                                                    <span className='px-3'>·</span>
                                                    <FontAwesomeIcon icon={Icons.faEuro} color="#4caf50" className='px-2' />
                                                    <span>{r.amount}</span>
                                                    {/* <span className='ps-5 pe-3'>·</span> */}
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant='flat' onClick={() => navigate('../account/reservation/' + r.id)} className='text-primary btn-sm'><FontAwesomeIcon icon={Icons.faEye} /> Consulter</Button>
                                    </div>
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