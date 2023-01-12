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
        document.title = "Demandes du propriétaires - AtypikHouse";
    }, []);

    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [modalData, setModalData] = useState([]);
    const [reqId, setReqId] = useState([]);

    const getRequests = () => {
        fetch(API_URL + '/owner_requests', {
            headers: {
                'Authorization': 'bearer ' + Cookies.get("token"),
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setItems(result);
                    setLoading(false);
                },
                (error) => {
                    console.log(error)
                }
            )
    }
    useEffect(() => {
        getRequests();
    }, []);


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
        </div>;
    }


    const options = {
        btnGroup: myButton
    };


    const onSubmit = async (status) => {
        setLoading(true);
        status === "approved" ?
            (
                await fetch(API_URL + '/users/' + modalData?.user?.id + '/update', {
                    method: "PATCH",
                    headers: {
                        'Authorization': 'bearer ' + Cookies.get("token"),
                        'Content-Type': 'application/merge-patch+json'
                    },
                    body: JSON.stringify(
                        {
                            "roles": [
                                "ROLE_OWNER"
                            ]
                        }
                    )
                })
                    .then(data => data.json())
                    .then(res => {

                        fetch(API_URL + '/owner_requests/' + modalData?.id, {
                            method: "PATCH",
                            headers: {
                                'Authorization': 'bearer ' + Cookies.get("token"),
                                'Content-Type': 'application/merge-patch+json'
                            },
                            body: JSON.stringify(
                                {
                                    "status": "APPROVED"
                                }
                            )
                        })
                            .then(data => data.json())
                            .then(res => {
                                setIsModalOpen(false)
                                getRequests();
                            })
                            .catch(err => { console.log(err); setLoading(false); })
                    })
                    .catch(err => { console.log(err); setLoading(false); })
            )
            :
            (await fetch(API_URL + '/users/' + modalData?.user?.id + '/update', {
                method: "PATCH",
                headers: {
                    'Authorization': 'bearer ' + Cookies.get("token"),
                    'Content-Type': 'application/merge-patch+json'
                },
                body: JSON.stringify(
                    {
                        "roles": [
                            "ROLE_USER"
                        ]
                    }
                )
            })
                .then(data => data.json())
                .then(res => {

                    fetch(API_URL + '/owner_requests/' + modalData?.id, {
                        method: "PATCH",
                        headers: {
                            'Authorization': 'bearer ' + Cookies.get("token"),
                            'Content-Type': 'application/merge-patch+json'
                        },
                        body: JSON.stringify(
                            {
                                "status": "REFUSED"
                            }
                        )
                    })
                        .then(data => data.json())
                        .then(res => {
                            setIsModalOpen(false)
                            getRequests();
                        })
                        .catch(err => { console.log(err); setLoading(false); })
                })
                .catch(err => { console.log(err); setLoading(false); })
            )


    }


    return (
        <div className='d-flex'>
            <Sidebar />
            <Container className='p-0'>
                <Container className='bg-blue ps-5 d-flex align-items-center' style={{ height: 220 }}>
                    <h1 className='text-white p-0 m-0'><FontAwesomeIcon icon={Icons.faUsersCog} className='me-3' /> Demandes du propriétaires</h1>
                </Container>
                <Container className='p-5'>
                    <Spin spinning={loading}>
                        <BootstrapTable data={items["hydra:member"]} search={true} options={options} pagination bordered={false} >
                            <TableHeaderColumn width='4%' className='border' dataSort={true} isKey dataField='id'>#</TableHeaderColumn>
                            <TableHeaderColumn className='border' dataSort={true} dataField='user' dataFormat={(user) => user?.firstname}>Nom</TableHeaderColumn>
                            <TableHeaderColumn className='border' dataSort={true} dataField='user' dataFormat={(user) => user?.lastname}>Prénom</TableHeaderColumn>
                            <TableHeaderColumn className='border' dataSort={true} dataField='user' dataFormat={(user) => user?.email}>Email</TableHeaderColumn>
                            <TableHeaderColumn className='border' dataSort={true} dataField='user' dataFormat={(user) => user?.number}>Tél</TableHeaderColumn>
                            <TableHeaderColumn width='8%' className='border' dataSort={true} dataField='status' dataFormat={(s) => s === "UNDER_REVIEW" ? <Badge bg='primary'>En cours</Badge> : s === "APPROVED" ? <Badge bg='atypik'>Accéptée</Badge> : <Badge bg='danger'>Réfusée</Badge>}>Status</TableHeaderColumn>
                            <TableHeaderColumn width='8%' className='border' dataField='id' dataFormat={actionFormat}>-</TableHeaderColumn>
                        </BootstrapTable>
                    </Spin>
                </Container >
                {/* <Modal title="Fiche de l'utilisateur" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                    <Container>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Role">{modalData?.roles && modalData?.roles[0] === "ROLE_ADMIN" ? <Badge bg='primary'>Admin</Badge> : <Badge bg='atypik'>User</Badge>}</Descriptions.Item>
                            <Descriptions.Item label="Nom">{modalData?.firstname}</Descriptions.Item>
                            <Descriptions.Item label="Prénom">{modalData.lastname}</Descriptions.Item>
                            <Descriptions.Item label="Tél">{modalData.number}</Descriptions.Item>
                            <Descriptions.Item label="Email">{modalData.email}</Descriptions.Item>
                            <Descriptions.Item label="Date de naissance">{moment(modalData.birthday).format('DD MMM YYYY')}</Descriptions.Item>
                            <Descriptions.Item label="Address">{modalData.address ? modalData.address?.city + ', ' + modalData.address?.country : '-'}</Descriptions.Item>
                        </Descriptions>
                    </Container>
                </Modal> */}
                <Modal title="Demande du propriétaire" open={isModalOpen} footer={<> <Button variant="atypik" onClick={() => onSubmit('approved')}>Accepter</Button> <Button variant="danger" onClick={() => onSubmit('refused')}>Refuser</Button></>} onCancel={() => setIsModalOpen(false)}>
                    <Spin spinning={loading}>

                        <Container className='p-0'>
                            <Tabs
                                defaultActiveKey="1"
                                items={[
                                    {
                                        label: `Informations personnelles`,
                                        key: '1',
                                        children: <>
                                            <Descriptions bordered column={1}>
                                                <Descriptions.Item label="Nom">{modalData?.user?.firstname}</Descriptions.Item>
                                                <Descriptions.Item label="Prénom">{modalData?.user?.lastname}</Descriptions.Item>
                                                <Descriptions.Item label="Tél">{modalData?.user?.number}</Descriptions.Item>
                                                <Descriptions.Item label="Email">{modalData?.user?.email}</Descriptions.Item>
                                                <Descriptions.Item label="Date de naissance">{moment(modalData?.user?.birthday).format('DD MMM YYYY')}</Descriptions.Item>
                                            </Descriptions>
                                        </>,
                                    },
                                    {
                                        label: `Informations supplemantaires`,
                                        key: '2',
                                        children: <>
                                            <Descriptions bordered column={1}>
                                                <Descriptions.Item label="Un petit mot">{modalData?.description}</Descriptions.Item>
                                                <Descriptions.Item label="Démarche environnementale">{modalData?.procedures}</Descriptions.Item>
                                            </Descriptions>
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