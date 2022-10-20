import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/main.css'
import '../assets/css/navbar.css'
import bg from '../assets/img/bg.png';

import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


const SearchForm = () => {
    return (
        <Container fluid className='p-0' style={{
            height: 500, backgroundImage: `url(${bg})`, backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
            <Container className="align-items-center">
                <Row className="align-items-center">
                    <Col md className='px-5'>
                        <InputGroup className='atypik-input'>
                            <InputGroup.Text className='icon'><FontAwesomeIcon icon={faCoffee} /></InputGroup.Text>
                            <Form.Control className='input'
                                placeholder="Destination"
                            />
                        </InputGroup>
                    </Col>
                    <Col md className='px-5'>
                        <Form.Control type="date" placeholder="Date d'arrivée" />
                    </Col>
                    <Col md className='px-5'>
                        <Form.Control type="date" placeholder="Date de départ" />
                    </Col>
                    <Col md className='px-5'>
                        <Form.Control type="text" placeholder="Voyageurs" />
                    </Col>
                </Row>
                <Row>
                    <Button variant="flat" className='atypik-btn mx-auto' >Rercherche</Button>
                </Row>

            </Container>
        </Container>
    )
}

export default SearchForm