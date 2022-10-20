import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/main.css'
import '../assets/css/navbar.css'
import logo from '../assets/img/logo.png';
import { Navbar, Container, Nav, NavDropdown, Button, Image } from 'react-bootstrap';

const AppNavbar = () => {
    return (
        <Navbar collapseOnSelect expand="lg">
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
                        <Nav.Link href=""><Button variant="flat" className='atypik-btn'>Devenir hôte</Button></Nav.Link>
                        <Nav.Link>
                            <NavDropdown title="Mon compte">
                                <NavDropdown.Item href="">Connexion</NavDropdown.Item>
                                <NavDropdown.Item href="">Inscription</NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Link>
                    </Nav>
                    {/* <Nav>
                        <Nav.Link href=""><Button variant="flat" className='atypik-btn'>Publier une annonce</Button></Nav.Link>
                        <Nav.Link>
                            <NavDropdown title="Mon compte">
                                <NavDropdown.Item href="">Mon compte</NavDropdown.Item>
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
        </Navbar >
    )
}

export default AppNavbar