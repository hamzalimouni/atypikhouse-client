import React from 'react'
import { Col, Container, Row, Table, Badge, Button } from 'react-bootstrap';
import Sidebar from '../../components/admin/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { Divider } from 'antd';
import Cookies from 'js-cookie'

const Dashboard = () => {
    let curUser = Cookies.get('user');

    if (!curUser) {
        console.log("NOT LOGED")
    }
    return (
        <div className='d-flex'>
            <Sidebar />
            <Container className='p-5'>
                <Row>
                    <Col className='px-5'>
                        <Container className='bg-atypik text-white py-3 px-0 pb-0 text-center rounded shadow-sm'>
                            <Container>
                                <p>Total des annonces</p>
                                <div className='d-flex align-items-center justify-content-around'>
                                    <FontAwesomeIcon icon={Icons.faFile} className='me-3' size='3x' />
                                    <h3 className='m-0 text-white '>
                                        500
                                    </h3>
                                </div>
                            </Container>
                            <Container className='mt-3 py-2 bg-light d-flex align-items-centers justify-content-center'>
                                <small className='text-blue'>10 en attente de validation</small>
                            </Container>
                        </Container>
                    </Col>
                    <Col className='px-5'>
                        <Container className='bg-warning text-white py-3 px-0 pb-0 text-center rounded shadow-sm'>
                            <Container>
                                <p>Total des réservations</p>
                                <div className='d-flex align-items-center justify-content-around'>
                                    <FontAwesomeIcon icon={Icons.faCartShopping} className='me-3' size='3x' />
                                    <h3 className='m-0 text-white '>
                                        500
                                    </h3>
                                </div>
                            </Container>
                            <Container className='mt-3 py-2 bg-light d-flex align-items-centers justify-content-center'>
                                <small className='text-blue'>10 réservations annulé</small>
                            </Container>
                        </Container>
                    </Col >
                    <Col className='px-5'>
                        <Container className='bg-danger text-white py-3 px-0 pb-0 text-center rounded shadow-sm'>
                            <Container>
                                <p>Total des utilisateurs</p>
                                <div className='d-flex align-items-center justify-content-around'>
                                    <FontAwesomeIcon icon={Icons.faUsers} className='me-3' size='3x' />
                                    <h3 className='m-0 text-white '>
                                        500
                                    </h3>
                                </div>
                            </Container>
                            <Container className='mt-3 py-2 bg-light d-flex align-items-centers justify-content-center'>
                                <small className='text-blue'>dont 150 hôte</small>
                            </Container>
                        </Container>
                    </Col>
                </Row >
                {/* <Row>
                    <Col sm={6} className='mt-5'>
                        <Divider orientation="left">les dérniers 5 annonces <small><Button size='sm' variant='flat p-0 text-atypik'>- Gérer les annonces </Button></small> </Divider>
                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Titre</th>
                                    <th>Destination</th>
                                    <th>Prix</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Lorem ipsum dolor sit amet</td>
                                    <td>Paris, France</td>
                                    <td>300</td>
                                    <td><Badge bg="atypik">Accepté</Badge></td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Lorem ipsum dolor sit amet</td>
                                    <td>Paris, France</td>
                                    <td>300</td>
                                    <td><Badge bg="danger">Rejeté</Badge></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col> 
                </Row>*/}
            </Container >
        </div >

    )
}

export default Dashboard