import React, { useState, useEffect } from 'react'
import { Form, Container, Row, Badge, Button, ButtonGroup, Col } from 'react-bootstrap';
import Sidebar from '../../components/admin/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { Popconfirm, message, Spin, Modal, Descriptions, Tabs } from 'antd';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { API_URL } from '../../Variables';
import Cookies from 'js-cookie';
import moment from 'moment';

const Users = () => {

    useEffect(() => {
        document.title = "Gestion des utilisateurs - AtypikHouse";
    }, []);

    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [modalData, setModalData] = useState([]);
    const [editUserData, setEditUserData] = useState([]);

    const getUsers = () => {
        fetch(API_URL + '/users', {
            headers: {
                'Authorization': 'bearer ' + Cookies.get("token"),
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                    setLoading(false);
                },
                (error) => {
                    console.log(error)
                }
            )
    }
    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        console.log(editUserData);
    }, [editUserData]);

    const myButton = () => {
        return (
            <ButtonGroup>
                {/* <Button variant='atypik' size='sm' onClick={() => {
                    setShow(true);
                }
                }><FontAwesomeIcon icon={Icons.faEye} className='me-2' /> Visualiser</Button> */}
            </ButtonGroup>
        );
    }

    const actionFormat = (id, cell) => {
        return <div className='d-flex justify-content-center'>
            <Button variant='flat' className='text-primary' size='sm' onClick={() => {
                setModalData(cell)
                setIsModalOpen(true);
            }}>
                <FontAwesomeIcon icon={Icons.faEye} />
            </Button>
            <Button variant='flat' className='text-primary' size='sm' onClick={() => {
                setEditUserData({
                    id: cell.id, firstname: cell.firstname, lastname: cell.lastname, email: cell.email, number: cell.number, birthday: cell.birthday,
                    address: {
                        address: cell?.address?.address,
                        city: cell?.address?.city,
                        country: cell?.address?.country,
                        zipcode: cell?.address?.zipcode,
                    }
                })
                setEditModalOpen(true);
            }}>
                <FontAwesomeIcon icon={Icons.faEdit} />
            </Button>
            <Popconfirm title="Voulez-vous vraiment supprimer cette utilisateur?" onConfirm={() =>
                fetch(API_URL + '/users/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'bearer ' + Cookies.get("token"),
                        'Content-Type': 'application/merge-patch+json'
                    }
                })
                    .then(
                        (result) => {
                            if (result.status === 204) {
                                message.success('Utilisateur supprimée avec succès');
                            } else {
                                message.error('Impossible de supprimer l\'utilisateur');
                            }
                            getUsers();
                        }
                    )
            } onOpenChange={() => console.log('open change')}>
                <Button variant='flat' className='text-danger' size='sm'>
                    <FontAwesomeIcon icon={Icons.faTrash} />
                </Button>
            </Popconfirm>


        </div>;
    }


    const options = {
        btnGroup: myButton
    };


    const handleSubmit = async () => {
        setLoading(true);

        await fetch(API_URL + '/users/' + editUserData['id'] + '/update', {
            method: "PATCH",
            headers: {
                'Authorization': 'bearer ' + Cookies.get("token"),
                'Content-Type': 'application/merge-patch+json'
            },
            body: JSON.stringify(editUserData)
        })
            .then(data => data.json())
            .then(res => {
                if ('id' in res) {
                    message.success("Utilisateur modifié avec succès")
                    setEditModalOpen(false)
                    getUsers();
                    setLoading(false);
                } else {
                    message.error("Erreur")
                }
            })
            .catch(err => { console.log(err); setLoading(false); })


    }


    return (
        <div className='d-flex'>
            <Sidebar />
            <Container className='p-0'>
                <Container className='bg-blue ps-5 d-flex align-items-center' style={{ height: 220 }}>
                    <h1 className='text-white p-0 m-0'><FontAwesomeIcon icon={Icons.faTv} className='me-3' /> Gestion des utilisateurs</h1>
                </Container>
                <Container className='p-5'>
                    <Spin spinning={loading}>
                        <BootstrapTable data={items["hydra:member"]} search={true} options={options} pagination bordered={false} >
                            <TableHeaderColumn width='4%' className='border' dataSort={true} isKey dataField='id'>#</TableHeaderColumn>
                            <TableHeaderColumn className='border' dataSort={true} dataField='firstname'>Nom</TableHeaderColumn>
                            <TableHeaderColumn className='border' dataSort={true} dataField='lastname'>Prénom</TableHeaderColumn>
                            <TableHeaderColumn className='border' dataSort={true} dataField='email'>Email</TableHeaderColumn>
                            <TableHeaderColumn className='border' dataSort={true} dataField='number'>Tél</TableHeaderColumn>
                            <TableHeaderColumn width='13*%' className='border' dataSort={true} dataField='birthday' dataFormat={(b) => moment(b).format('DD MMM YYYY')}>Date de naissance</TableHeaderColumn>
                            <TableHeaderColumn width='8%' className='border' dataSort={true} dataField='roles' dataFormat={(roles) => roles[0] === "ROLE_ADMIN" ? <Badge bg='primary'>Admin</Badge> : <Badge bg='atypik'>User</Badge>}>Role</TableHeaderColumn>
                            <TableHeaderColumn className='border' dataField='id' dataFormat={actionFormat}>-</TableHeaderColumn>
                        </BootstrapTable>
                    </Spin>
                </Container >
                <Modal title="Fiche de l'utilisateur" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                    <Container>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Role">{modalData?.roles && modalData?.roles[0] === "ROLE_ADMIN" ? <Badge bg='primary'>Admin</Badge> : <Badge bg='atypik'>User</Badge>}</Descriptions.Item>
                            <Descriptions.Item label="Nom">{modalData?.firstname}</Descriptions.Item>
                            <Descriptions.Item label="Prénom">{modalData.lastname}</Descriptions.Item>
                            <Descriptions.Item label="Tél">{modalData.number}</Descriptions.Item>
                            <Descriptions.Item label="Email">{modalData.email}</Descriptions.Item>
                            <Descriptions.Item label="Date de naissance">{moment(modalData.birthday).format('DD MMM YYYY')}</Descriptions.Item>
                            <Descriptions.Item label="Address">{modalData.address ? modalData.address?.city + ', ' + modalData.address?.country : '-'}</Descriptions.Item>
                            {/* <Descriptions.Item label="Méthod de paiement">Carte bancaire</Descriptions.Item> */}
                        </Descriptions>
                    </Container>
                </Modal>
                <Modal title="Modifier un utilisateur" open={editModalOpen} onOk={handleSubmit} onCancel={() => setEditModalOpen(false)}>
                    <Spin spinning={loading}>

                        <Container className='p-0'>
                            <Tabs
                                defaultActiveKey="1"
                                items={[
                                    {
                                        label: `Informations personnelles`,
                                        key: '1',
                                        children: <>
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3">
                                                    Nom
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type="text" onChange={(e) => setEditUserData({ ...editUserData, 'firstname': e.target.value })} value={editUserData['firstname']} />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3">
                                                    Prénom
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type="text" onChange={(e) => setEditUserData({ ...editUserData, 'lastname': e.target.value })} value={editUserData['lastname']} />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3">
                                                    Email
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type="text" onChange={(e) => setEditUserData({ ...editUserData, 'email': e.target.value })} value={editUserData['email']} />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3">
                                                    Téléphone
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type="text" onChange={(e) => setEditUserData({ ...editUserData, 'number': e.target.value })} value={editUserData['number']} />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3">
                                                    Date de naissance
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type="date" onChange={(e) => setEditUserData({ ...editUserData, 'birthday': e.target.value })} value={moment(editUserData['birthday']).format('YYYY-MM-DD')} />
                                                </Col>
                                            </Form.Group>
                                        </>,
                                    },
                                    {
                                        label: `Adresse`,
                                        key: '2',
                                        children: <>
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3">
                                                    Adresse
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type="text" onChange={(e) => setEditUserData({ ...editUserData, 'address': { ...editUserData.address, address: e.target.value } })} value={editUserData.address && editUserData?.address['address']} />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3">
                                                    Ville
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type="text" onChange={(e) => setEditUserData({ ...editUserData, 'address': { ...editUserData.address, city: e.target.value } })} value={editUserData.address && editUserData?.address['city']} />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3">
                                                    Code postal
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type="text" onChange={(e) => setEditUserData({ ...editUserData, 'address': { ...editUserData.address, zipcode: e.target.value } })} value={editUserData.address && editUserData?.address['zipcode']} />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3">
                                                    Pays
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type="text" onChange={(e) => setEditUserData({ ...editUserData, 'address': { ...editUserData.address, country: e.target.value } })} value={editUserData.address && editUserData?.address['country']} />
                                                </Col>
                                            </Form.Group>
                                        </>,
                                    }
                                ]}
                            />

                        </Container>
                    </Spin>
                </Modal>
            </Container>

        </div >
    )
}

export default Users