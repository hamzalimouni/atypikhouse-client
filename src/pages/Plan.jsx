import { Breadcrumb } from 'antd'
import React, { useEffect } from 'react'
import { ListGroup, Container, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import AppNavbar from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'
import { API_URL } from '../Variables'
const Plan = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        document.title = "Plan du site - AtypikHouse";
        getCategories()
    }, []);

    const getCategories = () => {
        fetch(API_URL + '/categories')
            .then(res => res.json())
            .then(
                (result) => {
                    setCategories(result['hydra:member']);
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    return (
        <div>
            <AppNavbar />
            <Container className='py-4'>
                <Breadcrumb className='bg-light p-2 rounded-pill ps-4 mb-3'>
                    <Breadcrumb.Item href="/">
                        <FontAwesomeIcon icon={Icons.faHome} color="#767A82" className='pe-2' />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Plan du site</Breadcrumb.Item>
                </Breadcrumb>
                <Row className='text-center mb-4'>
                    <h2 className='atypik-cur-title m-0 px-2 text-uppercase'>Plan du site</h2>
                </Row>
                <Row>
                    <p className='fs-6 w-75 mx-auto'>

                        <ListGroup variant="flush">
                            <ListGroup.Item> <a href="/" className='text-dark' rel="noopener noreferrer">Accueil</a> </ListGroup.Item>
                            <ListGroup.Item> <a href="/contact" className='text-dark' rel="noopener noreferrer">Nous contacter</a> </ListGroup.Item>
                            <ListGroup.Item> <a href="/about-us" className='text-dark' rel="noopener noreferrer">À propos</a> </ListGroup.Item>
                            <ListGroup.Item> <a href="/cgu" className='text-dark' rel="noopener noreferrer">conditions générales de vente et d'utilisation</a> </ListGroup.Item>
                            <ListGroup.Item> <a href="/confidentialite" className='text-dark' rel="noopener noreferrer">Politique de confidentialité</a> </ListGroup.Item>
                            <ListGroup.Item> <a href="/faq" className='text-dark' rel="noopener noreferrer">FAQ</a> </ListGroup.Item>
                            <ListGroup.Item>Catégories</ListGroup.Item>
                            <ListGroup variant="flush">
                                {
                                    categories && categories.map((c) => {
                                        return <ListGroup.Item> <a href={"/" + c.id} className='text-dark ps-5' rel="noopener noreferrer">{c.name}</a> </ListGroup.Item>
                                    })
                                }
                            </ListGroup>
                        </ListGroup>
                    </p>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default Plan