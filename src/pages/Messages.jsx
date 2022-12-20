import React, { useState, useEffect } from 'react'
import { Button, Col, Container, FloatingLabel, Form, Image, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Divider, Empty, Tag, Skeleton, Avatar } from 'antd';
import bg from '../assets/img/bg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie'
import { API_URL, MEDIA_URL } from '../Variables';
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';
import accessDeniedImage from '../assets/img/accessdenied.svg'

const Messages = () => {
    const { id } = useParams()
    let navigate = useNavigate();
    const [loadingMessages, setLoadingMessages] = useState(true);
    const [loadingConversations, setLoadingConversations] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [messageContent, setMessageContent] = useState();

    let curUser = Cookies.get('user');

    const [data, setData] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getConversations()
    }, []);


    useEffect(() => {
        getMessages();
        console.log(id);
    }, [id]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         getMessages();
    //     }, 1000)
    //     return () => clearInterval(interval)
    // }, []);

    const sendMessage = async (e) => {
        console.log(e);
        e.preventDefault();

        await fetch(API_URL + '/messages', {
            method: 'POST',
            headers: {
                'Authorization': 'bearer ' + Cookies.get("token"),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ receiver: { id: id }, content: messageContent })
        })
            .then(data => data.json())
            .then(res => {
                getMessages();
                getConversations();
                setMessageContent('');
            })
            .catch(error => { console.log(error); });
    }

    const getMessages = () => {
        setLoadingMessages(true)
        if (id) {
            fetch(API_URL + '/messages?user=' + id, {
                method: 'GET',
                headers: {
                    'Authorization': 'bearer ' + Cookies.get("token"),
                },
            })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        return Promise.reject(response.status)
                    }
                })
                .then(data => {
                    setMessages(data["hydra:member"]);
                    setLoadingMessages(false)
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    const getConversations = () => {
        setLoadingConversations(true)
        fetch(API_URL + '/messages', {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + Cookies.get("token"),
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    return Promise.reject(response.status)
                }
            })
            .then(data => {
                setData(data["hydra:member"]);
                setLoadingConversations(false)
                // console.log(data["hydra:member"])
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <Navbar />
            <Container className='mt-5'>
                <Container className='w-75 mx-auto border'>
                    <Row >
                        <Col lg={4} className="bg-light border-end p-0 overflow-auto" style={{ height: 520 }}>
                            <Skeleton active loading={loadingConversations}>
                                {
                                    data.filter(c => c.id !== JSON.parse(curUser)?.id).filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i).map((c) => {
                                        return <div tabIndex="-1" key={c.id} role='button' className='d-flex border-bottom p-2 align-items-center conversation' onClick={() => { navigate('/account/messages/' + c.id) }}>
                                            <Avatar style={{ backgroundColor: '#F97316', verticalAlign: 'middle' }} size="large">
                                                {c?.firstname.charAt(0).toUpperCase() + c?.lastname.charAt(0).toUpperCase()}
                                            </Avatar>
                                            <span className='ms-3'><strong>{c.firstname + " " + c.lastname}</strong></span>
                                        </div>
                                    })
                                }
                            </Skeleton>
                        </Col>
                        <Col lg={8} className="position-relative p-0" style={{ height: 520 }}>
                            <Skeleton active loading={loadingMessages && id}>
                                <div className='p-3 overflow-auto' style={{ height: 400 }}>
                                    {
                                        messages.map(m => {
                                            if (m?.sender?.id === JSON.parse(curUser)?.id) {
                                                return <div className='d-flex mb-3'>
                                                    <small>Vous : </small>
                                                    <div className='w-75'>
                                                        <p className='bg-atypik px-3 py-2 text-white ms-3 m-0' style={{ borderRadius: 20, borderTopLeftRadius: 0 }}>
                                                            {m.content}</p>
                                                        <small className='float-end pe-1'>{moment(m.createdAt).calendar()} </small>
                                                    </div>

                                                </div>
                                            } else {
                                                return <div className='d-flex mb-3'>
                                                    <Avatar style={{ backgroundColor: '#F97316', verticalAlign: 'middle' }} size="small">
                                                        MM
                                                    </Avatar>
                                                    <div className='w-75'>
                                                        <p className='bg-light px-3 py-2 border ms-3 m-0' style={{ borderRadius: 20, borderTopLeftRadius: 0 }}>
                                                            {m.content}</p>
                                                        <small className='float-end pe-1'>{moment(m.createdAt).calendar()} </small>
                                                    </div>
                                                </div>
                                            }


                                        })
                                    }

                                </div>
                            </Skeleton>
                            <div className='position-absolute bottom-0 w-100 pb-2 px-2'>
                                <Divider></Divider>
                                <Form className="d-flex " onSubmit={sendMessage} >
                                    <small>Vous: </small>
                                    <FloatingLabel label="J'envoi un message" className='w-100 pe-2 ms-3'>
                                        <Form.Control
                                            as="textarea"
                                            type="text"
                                            name="review"
                                            value={messageContent}
                                            onChange={(e) => setMessageContent(e.target.value)}
                                            placeholder="avis"
                                            required
                                            style={{ height: '80px' }} />
                                    </FloatingLabel>
                                    <Button type="submit" variant='atypik' style={{ borderRadius: 30, height: 50 }}><FontAwesomeIcon icon={Icons.faArrowRight} color="#fff" className='px-2' /></Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container >
            <Footer />
        </div >
    )
}

export default Messages