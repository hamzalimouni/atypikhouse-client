import React from 'react'
import Navbar from '../components/Navbar'
import SearchForm from '../components/SearchForm'
import CardHouse from '../components/CardHouse'
import { Col, Container, Row } from 'react-bootstrap'

const Home = () => {
    return (
        <div>
            <Navbar />
            <SearchForm />
            <Container>
                <Row>
                    <Col><CardHouse /></Col>
                    <Col><CardHouse /></Col>
                    <Col><CardHouse /></Col>
                </Row>
            </Container>
        </div >
    )
}

export default Home