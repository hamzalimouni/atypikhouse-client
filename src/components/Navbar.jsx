import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/main.css'
import '../assets/css/navbar.css'
import logo from '../assets/img/logo.png';
import { Navbar, Container, Nav, NavDropdown, Button, Image, Modal } from 'react-bootstrap';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const AppNavbar = () => {

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    return (
        <Navbar collapseOnSelect expand="lg" className='border-bottom'>
            <Container>
                <Navbar.Brand><Image className="logo" src={logo} height='30px' /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="">Destinations</Nav.Link>
                        <Nav.Link href="">Catégories</Nav.Link>
                        <Nav.Link href="">Nous contacter</Nav.Link>
                        <Nav.Link href="">À propos</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href=""><Button variant="atypik">Devenir hôte</Button></Nav.Link>
                        <Nav.Link>
                            <NavDropdown title="Mon compte">
                                <NavDropdown.Item onClick={handleShowLogin} >Connexion</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleShowRegister}>Inscription</NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Link>
                    </Nav>
                    {/* <Nav>
                        <Nav.Link href=""><Button variant="flat" className='atypik-btn'>Publier une annonce</Button></Nav.Link>
                        <Nav.Link>
                            <NavDropdown title="Mon compte">
                            <NavDropdown.Item href="">Gérer mon compte</NavDropdown.Item>
                            <NavDropdown.Item href="">Messages</NavDropdown.Item>
                            <NavDropdown.Item href="">Mes annonces</NavDropdown.Item>
                            <NavDropdown.Item href="">Mes réservations</NavDropdown.Item>
                            <NavDropdown.Item href="">Mon profil</NavDropdown.Item>
                            <NavDropdown.Divider></NavDropdown.Divider>
                            <NavDropdown.Item href="">Se déconnecter</NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Link>
                    </Nav> */}
                </Navbar.Collapse>
            </Container>
            <LoginModal show={showLogin} onClose={handleCloseLogin} />
            <RegisterModal show={showRegister} onClose={handleCloseRegister} />
        </Navbar >
    )
}

export default AppNavbar