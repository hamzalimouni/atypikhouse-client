import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Divider, Empty, Badge, Avatar, message } from 'antd';
import bg from '../assets/img/bg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie'
import { API_URL } from '../Variables';

const Reservation = () => {
    let curUser = Cookies.get('user');
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
                <Divider><h2 className='text-center text-blue'></h2></Divider>
                {/* <div className='row justify-content-md-center mt-5'>
                    <Empty description="Aucune réservation passée" />
                </div> */}
                <Container>
                    <div className='border p-4 d-flex align-items-center justify-content-between rounded shadow-sm my-4'>
                        <div className='d-flex align-items-center'>
                            <Avatar size={80} src="https://joeschmoe.io/api/v1/random" />
                            <div className='ms-4'>
                                <strong className=''>Title of the house that i book</strong>
                                <span className="ms-3 rounded bg-danger text-white float-right px-2 py-1">Annulée</span>
                                <div className='d-flex align-items-center mt-2'>
                                    <FontAwesomeIcon icon={Icons.faCalendar} color="#4caf50" className='px-2' />
                                    <span>28 Jan 2022 </span>
                                    <small><FontAwesomeIcon icon={Icons.faArrowRight} color="#dadada" className='px-2' /></small>
                                    <span>30 Jan 2022 </span>
                                    <span className='px-3'>·</span>
                                    <FontAwesomeIcon icon={Icons.faPeopleGroup} color="#4caf50" className='px-2' />
                                    <span>5</span>
                                    <span className='px-3'>·</span>
                                    <FontAwesomeIcon icon={Icons.faEuro} color="#4caf50" className='px-2' />
                                    <span>200</span>
                                    {/* <span className='ps-5 pe-3'>·</span> */}
                                </div>
                            </div>
                        </div>
                        <Button variant='flat' className='text-primary btn-sm'><FontAwesomeIcon icon={Icons.faEye} /> Consulter</Button>
                    </div>
                </Container>
            </Container >
            <Footer />
        </div >
    )
}

export default Reservation