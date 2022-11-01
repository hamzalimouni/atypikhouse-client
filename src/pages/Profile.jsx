import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Divider } from 'antd';
import CardHouse from '../components/CardHouse';

const Profile = () => {
    return (
        <div>
            <Navbar />
            <Container className='p-5'>
                <Row className='mx-md-5'>
                    <Col lg={4}>
                        <Card>
                            <Card.Img variant="top" />
                            <Card.Body className='text-center'>
                                <Avatar size={64} icon={<UserOutlined />} />
                                <Card.Title className='my-3'>FIRSTNAME Lastname</Card.Title>
                                <Card.Text>
                                    <small>Membre depuis 2022</small>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={8}>
                        <Divider orientation="left" className="mt-4">Annonces de Lastname</Divider>
                        <Row className='container'>
                            <Col lg={6}><CardHouse
                                title="Hello"
                                destination="Location"
                                price="350"
                                reviews="4.8" /></Col>
                        </Row>
                        {/* <Divider orientation="left" className="mt-4">Commentaires</Divider>
                        <Row className='container'>
                            <Col lg={6}><CardHouse
                                title="Hello"
                                destination="Location"
                                price="350"
                                reviews="4.8" /></Col>
                        </Row> */}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default Profile