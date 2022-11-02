import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/main.css'
import '../assets/css/navbar.css'
import logo from '../assets/img/logo.png';
import { Navbar, Container, Nav, NavDropdown, Button, Image, Modal, Row, Col } from 'react-bootstrap';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { Drawer, Badge, Avatar } from 'antd';
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
const AppNavbar = () => {

    let navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    return (
        <Navbar collapseOnSelect expand="lg" className='border-bottom'>
            <Container>
                <Navbar.Brand><Image onClick={() => { navigate("/") }} className="logo" src={logo} height='30px' /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="">Destinations</Nav.Link>
                        <Nav.Link href="">Catégories</Nav.Link>
                        <Nav.Link href="">Nous contacter</Nav.Link>
                        <Nav.Link href="">À propos</Nav.Link>
                    </Nav>
                    {/* <Nav>
                        <Nav.Link onClick={() => { navigate("/posts") }}><Button variant="atypik">Devenir hôte</Button></Nav.Link>
                        <Nav.Link>
                            <NavDropdown title="Mon compte">
                                <NavDropdown.Item onClick={handleShowLogin} >Connexion</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleShowRegister}>Inscription</NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Link>
                    </Nav> */}
                    <Nav>
                        <Nav.Link href=""><Button variant="atypik">Publier une annonce</Button></Nav.Link>
                        <Nav.Link onClick={showDrawer} className='p-3'>
                            <Badge count={2}>
                                <FontAwesomeIcon icon={Icons.faBell} color="#8ed081" size="2x" />
                            </Badge>
                        </Nav.Link>
                        <Nav.Link>
                            <NavDropdown title="Mon compte">
                            <NavDropdown.Item onClick={() => { navigate("/account/settings") }}>Gérer mon compte</NavDropdown.Item>
                            <NavDropdown.Item href="">Messages</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => { navigate("/account/annonces") }}>Mes annonces</NavDropdown.Item>
                            <NavDropdown.Item href="">Mes réservations</NavDropdown.Item>
                            <NavDropdown.Item href="">Commentaires</NavDropdown.Item>
                            <NavDropdown.Divider></NavDropdown.Divider>
                            <NavDropdown.Item href="">Se déconnecter</NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <LoginModal show={showLogin} onClose={handleCloseLogin} />
            <RegisterModal show={showRegister} onClose={handleCloseRegister} />
            <Drawer title="Notifications" placement="right" onClose={onClose} open={open}>
                <Row className='border-bottom py-3'>
                    <Col md={2}>
                        <Avatar icon={<FontAwesomeIcon icon={Icons.faUserAlt} color="#fff" />} />
                    </Col>
                    <Col md={8}>
                        <p className='p-0 m-0'>Veuillez confirmer votre adresse e-mail en cliquant sur le lien que nous venons de vous adresser par e-mail.</p>
                        <small>20 Octobre 2022</small>
                    </Col>
                    <Col md={2}>
                        <FontAwesomeIcon icon={Icons.faClose} color="#000" />
                    </Col>
                </Row>
                <Row className='border-bottom py-3 bg-light'>
                    <Col md={2}>
                        <Avatar icon={<FontAwesomeIcon icon={Icons.faUserAlt} color="#fff" />} />
                    </Col>
                    <Col md={8}>
                        <p className='p-0 m-0'>Vous avez des nouveaux messages.</p>
                        <small className='text-muted'>20 Octobre 2022</small>
                    </Col>
                    <Col md={2}>
                        <FontAwesomeIcon icon={Icons.faClose} color="#000" />
                    </Col>
                </Row>
            </Drawer>
        </Navbar >
    )
}

export default AppNavbar