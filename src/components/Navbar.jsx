import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/main.css'
import '../assets/css/navbar.css'
import logo from '../assets/img/logo.png';
import { Navbar, Container, Nav, NavDropdown, Button, Image, Row, Col } from 'react-bootstrap';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { Drawer, Badge, Skeleton, Tag } from 'antd';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../Variables';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');
const AppNavbar = () => {
    let curUser = Cookies.get('user');
    let navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loadingNotifs, setLoadingNotifs] = useState(true);


    let isAdmin = curUser && JSON.parse(curUser)?.roles.indexOf('ROLE_ADMIN') > -1
    let isOwner = curUser && JSON.parse(curUser)?.roles.indexOf('ROLE_OWNER') > -1

    useEffect(() => {
        getNotifications();
    }, [open]);

    const getNotifications = () => {
        setLoadingNotifs(true)
        if (curUser) {
            fetch(API_URL + '/notifications', {
                headers: {
                    'Authorization': 'bearer ' + Cookies.get("token"),
                },
            })
                .then(res => res.json())
                .then((result) => { setNotifications(result); setLoadingNotifs(false) })
        }
    }

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    return (
        <Navbar collapseOnSelect expand="lg" className='border-bottom' role='banner'>
            <Container className='pt-1'>
                <Navbar.Brand><Image alt='Atypikhouse logo' onClick={() => { navigate("/") }} className="logo" src={logo} height='30px' /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link className='fs-6' onClick={() => { navigate("/") }}>Accueil</Nav.Link>
                        {/* <Nav.Link href="">Destinations</Nav.Link>
                        <Nav.Link href="">Catégories</Nav.Link> */}
                        <Nav.Link className='fs-6' onClick={() => { navigate("/contact") }}>Nous contacter</Nav.Link>
                        <Nav.Link className='fs-6' onClick={() => { navigate("/about-us") }}>À propos</Nav.Link>
                    </Nav>
                    {!curUser ?
                        <Nav>
                            <Nav.Link onClick={() => { navigate("/devenir-proprietaire") }}><Button variant="atypik">Devenir propriétaire</Button></Nav.Link>
                            {/* <Nav.Link> */}
                            <NavDropdown title="Mon compte" className='py-2'>
                                <NavDropdown.Item onClick={handleShowLogin} >Connexion</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleShowRegister}>Inscription</NavDropdown.Item>
                            </NavDropdown>
                            {/* </Nav.Link> */}
                        </Nav> :
                        <Nav>
                            {
                                isAdmin ?
                                    <Nav.Link href=""><Button variant="blue" onClick={() => { navigate("/admin/dashboard") }}>Admin panel</Button></Nav.Link>
                                    : isOwner ?
                                        <div>
                                            <Nav.Link href=""><Button variant="atypik border" onClick={() => { navigate("/houses/add") }}>Publier une annonce</Button></Nav.Link>
                                        </div>
                                        :
                                        <div>
                                            <Nav.Link href=""><Button variant="atypik border" onClick={() => { navigate("/devenir-proprietaire") }}>Devenir Propriétaire</Button></Nav.Link>
                                        </div>

                            }
                            <Nav.Link onClick={() => setOpen(true)} className='pt-3 px-3'>
                                <Badge count={notifications.length} >
                                    <FontAwesomeIcon icon={Icons.faBell} color="#5A626F" stroke='#5A626F' size="2x" />
                                </Badge>
                            </Nav.Link>
                            <NavDropdown title={isOwner ? "Espace propriétaire" : "Mon compte"} className='py-2 fs-6'>
                                <NavDropdown.Item onClick={() => { navigate("/account/settings") }}>Gérer mon compte</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => { navigate("/account/messages") }}>Messages</NavDropdown.Item>
                                {(isOwner || isAdmin) && <NavDropdown.Item onClick={() => { navigate("/account/annonces") }}>Mes annonces</NavDropdown.Item>}
                                <NavDropdown.Item onClick={() => { navigate("/account/reservations") }}>Mes réservations</NavDropdown.Item>
                                <NavDropdown.Divider></NavDropdown.Divider>
                                <NavDropdown.Item onClick={() => {
                                    Cookies.remove("token");
                                    Cookies.remove("user");
                                    window.location.href = "/"
                                }}>Se déconnecter</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>}
                </Navbar.Collapse>
            </Container>
            <LoginModal show={showLogin} onClose={handleCloseLogin} />
            <RegisterModal show={showRegister} onClose={handleCloseRegister} />
            <Drawer title="Notifications" style={{ zIndex: 999999 }} placement="right" onClose={() => setOpen(false)} open={open}>
                <Skeleton loading={loadingNotifs} active>
                    {
                        notifications.length > 0 && notifications?.map((n) => {
                            return (
                                <Row className='border-bottom py-3'>
                                    {
                                        n.type == "NEW" ?
                                            <Row>
                                                <Col md={2}>
                                                    <Tag
                                                        icon={<FontAwesomeIcon icon={Icons.faAdd} />}
                                                        color="success"
                                                        className='rounded-pill'></Tag>
                                                </Col>
                                                <Col md={10}>
                                                    <p className='p-0 m-0'>{n.content}</p>
                                                    <small>{moment(n.createdAt).fromNow()}</small>
                                                </Col>
                                            </Row>
                                            :
                                            n.type == "EDIT" ?
                                                <Row >
                                                    <Col md={2}>
                                                        <Tag
                                                            icon={<FontAwesomeIcon icon={Icons.faEdit} />}
                                                            color="processing"
                                                            className='rounded-pill'></Tag>
                                                    </Col>
                                                    <Col md={10}>
                                                        <p className='p-0 m-0'>{n.content}</p>
                                                        <small>{moment(n.createdAt).fromNow()}</small>
                                                    </Col>
                                                </Row>
                                                :
                                                n.type == "DELETE" ?
                                                    <Row >
                                                        <Col md={2}>
                                                            <Tag
                                                                icon={<FontAwesomeIcon icon={Icons.faTrash} />}
                                                                color="error"
                                                                className='rounded-pill'></Tag>
                                                        </Col>
                                                        <Col md={10}>
                                                            <p className='p-0 m-0'>{n.content}</p>
                                                            <small>{moment(n.createdAt).fromNow()}</small>
                                                        </Col>
                                                    </Row>
                                                    :
                                                    n.type == "RESERVATION" ?
                                                        <Row role='button' onClick={() => navigate("/houses/" + n.data + "/reservations/")}>
                                                            <Col md={2}>
                                                                <Tag
                                                                    icon={<FontAwesomeIcon icon={Icons.faCheck} />}
                                                                    color="success"
                                                                    className='rounded-pill'></Tag>
                                                            </Col>
                                                            <Col md={10}>
                                                                <p className='p-0 m-0'>{n.content}</p>
                                                                <small>{moment(n.createdAt).fromNow()}</small>
                                                            </Col>
                                                        </Row>
                                                        :
                                                        n.type == "RESERVATION_CANCELED" ?
                                                            <Row role='button' onClick={() => navigate("/account/reservation/" + n.data)}>
                                                                <Col md={2}>
                                                                    <Tag
                                                                        icon={<FontAwesomeIcon icon={Icons.faReorder} />}
                                                                        color="error"
                                                                        className='rounded-pill'></Tag>
                                                                </Col>
                                                                <Col md={10}>
                                                                    <p className='p-0 m-0'>{n.content}</p>
                                                                    <small>{moment(n.createdAt).fromNow()}</small>
                                                                </Col>
                                                            </Row> : n.type == "ANNONCE_APPROVED" ?
                                                                <Row role='button' onClick={() => navigate("/houses/" + n.data)}>
                                                                    <Col md={2}>
                                                                        <Tag
                                                                            icon={<FontAwesomeIcon icon={Icons.faCheck} />}
                                                                            color="success"
                                                                            className='rounded-pill'></Tag>
                                                                    </Col>
                                                                    <Col md={10}>
                                                                        <p className='p-0 m-0'>{n.content}</p>
                                                                        <small>{moment(n.createdAt).fromNow()}</small>
                                                                    </Col>
                                                                </Row> : n.type == "ANNONCE_REJECTED" ?
                                                                    <Row role='button' onClick={() => navigate("/houses/" + n.data)}>
                                                                        <Col md={2}>
                                                                            <Tag
                                                                                icon={<FontAwesomeIcon icon={Icons.faXmark} />}
                                                                                color="error"
                                                                                className='rounded-pill'></Tag>
                                                                        </Col>
                                                                        <Col md={10}>
                                                                            <p className='p-0 m-0'>{n.content}</p>
                                                                            <small>{moment(n.createdAt).fromNow()}</small>
                                                                        </Col>
                                                                    </Row> : n.type == "NEW_MESSAGE" ?
                                                                        <Row role='button' onClick={() => navigate("/account/messages/" + n.data)}>
                                                                            <Col md={2}>
                                                                                <Tag
                                                                                    icon={<FontAwesomeIcon icon={Icons.faMessage} />}
                                                                                    color="error"
                                                                                    className='rounded-pill'></Tag>
                                                                            </Col>
                                                                            <Col md={10}>
                                                                                <p className='p-0 m-0'>{n.content}</p>
                                                                                <small>{moment(n.createdAt).fromNow()}</small>
                                                                            </Col>
                                                                        </Row> : n.type == "OWNER_APPROVED" ?
                                                                            <Row>
                                                                                <Col md={2}>
                                                                                    <Tag
                                                                                        icon={<FontAwesomeIcon icon={Icons.faCheck} />}
                                                                                        color="success"
                                                                                        className='rounded-pill'></Tag>
                                                                                </Col>
                                                                                <Col md={10}>
                                                                                    <p className='p-0 m-0'>{n.content}</p>
                                                                                    <small>{moment(n.createdAt).fromNow()}</small>
                                                                                </Col>
                                                                            </Row> : n.type == "OWNER_REJECTED" ?
                                                                                <Row>
                                                                                    <Col md={2}>
                                                                                        <Tag
                                                                                            icon={<FontAwesomeIcon icon={Icons.faXmark} />}
                                                                                            color="error"
                                                                                            className='rounded-pill'></Tag>
                                                                                    </Col>
                                                                                    <Col md={10}>
                                                                                        <p className='p-0 m-0'>{n.content}</p>
                                                                                        <small>{moment(n.createdAt).fromNow()}</small>
                                                                                    </Col>
                                                                                </Row> : <></>

                                    }


                                </Row>
                            )
                        })
                    } </Skeleton>
            </Drawer>
        </Navbar >
    )
}

export default AppNavbar