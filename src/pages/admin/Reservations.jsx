import React, { Fragment, useState, useEffect } from 'react'
import { Container, Dropdown, Badge, Button, ButtonGroup } from 'react-bootstrap';
import Sidebar from '../../components/admin/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { Spin, Popconfirm, message, Descriptions, Modal } from 'antd';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Cookies from 'js-cookie'
import moment from 'moment'
import { API_URL } from '../../Variables';

const Reservations = () => {

    useEffect(() => {
        document.title = "Gestion des réservations - AtypikHouse";
    }, []);

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState([]);

    const myButton = () => {
        return (
            <ButtonGroup>
                <Dropdown>
                    <Dropdown.Toggle variant="atypik">
                        Filtrer les réservations
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => getReservations()}>Afficher tous</Dropdown.Item>
                        <Dropdown.Item onClick={() => getReservations('APPROVED')}>Réservée</Dropdown.Item>
                        <Dropdown.Item onClick={() => getReservations('CANCELED')}>Annulées</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ButtonGroup>
        );
    }

    const getReservations = (filter) => {
        setLoading(true)
        fetch(API_URL + '/reservations?order[createdAt]=DESC' + (filter ? '&status=' + filter : ''), {
            headers: { 'Authorization': 'bearer ' + Cookies.get("token") }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result["hydra:member"]);
                    setLoading(false);
                },
                (error) => {
                    console.log(error)
                }
            )
    }
    useEffect(() => {
        getReservations();
    }, []);

    function actionFormat(id, cell) {
        return <div className='d-flex'>
            <Popconfirm title="Voulez-vous vraiment supprimer cette réservation?" onConfirm={() =>
                fetch(API_URL + '/reservations/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'bearer ' + Cookies.get("token"),
                        'Content-Type': 'application/merge-patch+json'
                    }
                })
                    .then(
                        (result) => {
                            if (result.status == 204) {
                                message.success('Réservation supprimée avec succès');
                            } else {
                                message.error('Impossible de supprimer la réservation');
                            }
                            getReservations();
                        }
                    )
            }>
                <Button variant='flat' className='text-danger' size='sm'>
                    <FontAwesomeIcon icon={Icons.faTrash} />
                </Button>
            </Popconfirm>
            {(cell.status == 'APPROVED') && (<div className='d-flex'>
                <Popconfirm title="Voulez-vous vraiment annuler cette réservation?" onConfirm={() =>
                    fetch(API_URL + '/reservations/' + id, {
                        method: 'PATCH',
                        headers: {
                            'Authorization': 'bearer ' + Cookies.get("token"),
                            'Content-Type': 'application/merge-patch+json'
                        },
                        body: JSON.stringify({ status: 'CANCELED' })
                    })
                        .then(res => res.json())
                        .then((result) => {
                            if (result.status == 'CANCELED') {
                                message.success('Réservation annulée avec succès');
                            } else {
                                message.error('Impossible d\'annuler la réservation');
                            }
                            getReservations();
                        })
                }>
                    <Button variant='flat' className='text-danger py-0' size='sm'>
                        <FontAwesomeIcon icon={Icons.faCancel} /> Annuler
                    </Button>
                </Popconfirm>
            </div>)}
        </div>;
    }

    function statusFormat(status) {
        return <Badge bg={status == 'APPROVED' ? 'atypik' : (status == "REJECTED" ? "danger" : "primary")}>{status}</Badge>;
    }



    const options = {
        btnGroup: myButton
    };

    return (
        <div className='d-flex'>
            <Sidebar />
            <Container className='p-0'>
                <Container className='bg-blue ps-5 d-flex align-items-center' style={{ height: 220 }}>
                    <h1 className='text-white p-0 m-0'><FontAwesomeIcon icon={Icons.faReorder} className='me-3' /> Gestion des réservations</h1>
                </Container>
                <Container className='p-5'>
                    <Spin spinning={loading}>
                        <BootstrapTable data={items} search={false} options={options} pagination bordered={false} >
                            <TableHeaderColumn headerAlign='center' width={'3%'} dataSort={true} isKey dataField='id'>#</TableHeaderColumn>
                            <TableHeaderColumn width={'10%'} dataSort={true} dataField='user' dataFormat={(u) => <span>{u.firstname.charAt(0)} {u.lastname.charAt(0)}  <FontAwesomeIcon role='button' onClick={() => { setIsModalOpen(true); setModalData(u) }} icon={Icons.faEye} color='#0a2d74' /></span>}>Voyageur</TableHeaderColumn>
                            <TableHeaderColumn width={'25%'} dataSort={true} dataField='house' dataFormat={(u) => <span>{u.title}  <FontAwesomeIcon role='button' onClick={() => { window.open('/houses/' + u.id) }} icon={Icons.faEye} color='#0a2d74' /></span>}>Annonce</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='fromDate' dataFormat={(d) => moment(d).format('DD MMM YYYY')}>De</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='toDate' dataFormat={(d) => moment(d).format('DD MMM YYYY')}>A</TableHeaderColumn>
                            <TableHeaderColumn width={'10%'} dataSort={true} dataField='nbPersons'>Nb voyageurs</TableHeaderColumn>
                            <TableHeaderColumn width={'10%'} dataSort={true} dataField='amount' dataFormat={(m) => m + ' €'}>Montant payé</TableHeaderColumn>
                            <TableHeaderColumn width={'10%'} dataSort={true} dataField='status' dataFormat={(s) => s == 'APPROVED' ? <Badge bg='atypik'>RÉSERVÉE</Badge> : <Badge bg='danger'>ANNULÉE</Badge>}>Status</TableHeaderColumn>
                            <TableHeaderColumn width={'10%'} dataField='id' dataFormat={actionFormat}>-</TableHeaderColumn>
                        </BootstrapTable>
                    </Spin>
                    <Modal title="Fiche de voyageur" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                        <Container>
                            <Descriptions bordered column={1}>
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
                </Container>
            </Container >
        </div >

    )
}

export default Reservations