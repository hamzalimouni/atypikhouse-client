import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Image, Badge, ButtonGroup, Dropdown } from 'react-bootstrap'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Divider, Modal, Popconfirm, Skeleton, Descriptions, message } from 'antd';
import bg from '../assets/img/bg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie'
import { API_URL } from '../Variables';
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const AnnonceReservations = () => {

    useEffect(() => {
        document.title = "Réservations - AtypikHouse";
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState([]);

    let navigate = useNavigate();
    let curUser = Cookies.get('user');
    const { id } = useParams()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getReservations()
    }, []);


    const myButton = () => {
        return (
            <ButtonGroup>
                <Dropdown>
                    <Dropdown.Toggle variant="atypik">
                        Filtrer les réservations
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => getReservations()}>Afficher tous</Dropdown.Item>
                        <Dropdown.Item onClick={() => getReservations('APPROVED')}>Réserées</Dropdown.Item>
                        <Dropdown.Item onClick={() => getReservations('CANCELED')}>Annulées</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ButtonGroup>
        );
    }

    const getReservations = (filter) => {
        setLoading(true)
        fetch(API_URL + '/reservations?house.id=' + id + '&order[createdAt]=desc' + (filter ? '&status=' + filter : ''), {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + Cookies.get("token"),
            },
        })
            .then(res => res.json())
            .then((result) => { setData(result["hydra:member"]); setLoading(false) })
    }

    function actionFormat(id, cell) {
        return cell.status == 'APPROVED' && moment().diff(cell.fromDate, 'days') < 0 ? <div className='d-flex'>
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
        </div> : null
    }

    const options = {
        btnGroup: myButton
    };

    return (
        <div>
            <Navbar />
            <Container className='mt-5'>
                <Divider><h2 className='text-center text-blue'>Réservations</h2></Divider>
                {/* <div className='row justify-content-md-center mt-5'>
                    <Empty description="Aucune réservation" />
                </div> */}
                <Container>
                    <Skeleton loading={loading} paragraph={{ rows: 10 }} active >
                        <BootstrapTable data={data} search={false} options={options} pagination bordered={false} >
                            <TableHeaderColumn headerAlign='center' width={'3%'} dataSort={true} isKey dataField='id'>#</TableHeaderColumn>
                            <TableHeaderColumn width={'30%'} dataSort={true} dataField='user' dataFormat={(u) => <span>{u.firstname} {u.lastname}  <FontAwesomeIcon onClick={() => { setIsModalOpen(true); setModalData(u) }} icon={Icons.faEye} color='#0a2d74' /></span>}>Voyageur</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='fromDate' dataFormat={(d) => moment(d).format('DD MMM YYYY')}>De</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='toDate' dataFormat={(d) => moment(d).format('DD MMM YYYY')}>A</TableHeaderColumn>
                            <TableHeaderColumn width={'10%'} dataSort={true} dataField='nbPersons'>Nb voyageurs</TableHeaderColumn>
                            <TableHeaderColumn width={'10%'} dataSort={true} dataField='amount' dataFormat={(m) => m + ' €'}>Montant payé</TableHeaderColumn>
                            <TableHeaderColumn width={'10%'} dataSort={true} dataField='status' dataFormat={(s) => s == 'APPROVED' ? <Badge bg='atypik'>RÉSERVÉE</Badge> : <Badge bg='danger'>ANNULÉE</Badge>}>Status</TableHeaderColumn>
                            <TableHeaderColumn width={'10%'} dataField='id' dataFormat={actionFormat}>-</TableHeaderColumn>
                        </BootstrapTable>
                    </Skeleton>
                </Container>
                <Modal title="Fiche de voyageur" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                    <Container>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Nom">{modalData.firstname}</Descriptions.Item>
                            <Descriptions.Item label="Prénom">{modalData.lastname}</Descriptions.Item>
                            <Descriptions.Item label="Tél">{modalData.number}</Descriptions.Item>
                            <Descriptions.Item label="Email">{modalData.email}</Descriptions.Item>
                            <Descriptions.Item label="Date de naissance">{moment(modalData.birthday).format('DD MMM YYYY')}</Descriptions.Item>
                            <Descriptions.Item label="Address">{modalData.address ? modalData.address?.city + ', ' + modalData.address?.country : '-'}</Descriptions.Item>
                            {/* <Descriptions.Item label="Méthod de paiement">Carte bancaire</Descriptions.Item> */}
                        </Descriptions>
                    </Container>
                </Modal>
            </Container >

            <Footer />
        </div >
    )
}

export default AnnonceReservations