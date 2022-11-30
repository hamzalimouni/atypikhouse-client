import React, { Fragment, useState, useEffect } from 'react'
import { Col, Container, Row, Dropdown, Badge, Button, ButtonGroup } from 'react-bootstrap';
import Sidebar from '../../components/admin/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { Spin, Popconfirm, message } from 'antd';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Cookies from 'js-cookie'
import { API_URL } from '../../Variables';

const Annonces = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const myButton = () => {
        return (
            <ButtonGroup>
                <Dropdown>
                    <Dropdown.Toggle variant="atypik">
                        Filtrer les annonces
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => getAnnonces()}>Afficher tous</Dropdown.Item>
                        <Dropdown.Item onClick={() => getAnnonces('UNDER_REVIEW')}>En attente de révision</Dropdown.Item>
                        <Dropdown.Item onClick={() => getAnnonces('APPROVED')}>Acceptées</Dropdown.Item>
                        <Dropdown.Item onClick={() => getAnnonces('REJECTED')}>Réfusées</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ButtonGroup>
        );
    }

    const getAnnonces = (filter) => {
        setLoading(true)
        fetch(API_URL + '/houses?order[createdAt]=DESC' + (filter ? '&status=' + filter : ''))
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
        getAnnonces();
    }, []);

    function actionFormat(id) {
        return <div className='d-flex'>
            <Popconfirm title="Voulez-vous vraiment supprimer cette annonce?" onConfirm={() =>
                fetch(API_URL + '/houses/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'bearer ' + Cookies.get("token"),
                        'Content-Type': 'application/merge-patch+json'
                    }
                })
                    .then(
                        (result) => {
                            if (result.status == 204) {
                                message.success('Annonce supprimée avec succès');
                            } else {
                                message.error('Impossible de supprimer l\'annonce');
                            }
                            getAnnonces();
                        }
                    )
            }>
                <Button variant='flat' className='text-danger' size='sm'>
                    <FontAwesomeIcon icon={Icons.faTrash} />
                </Button>
            </Popconfirm>
            <Button variant='flat' className='text-primary' size='sm'>
                <FontAwesomeIcon icon={Icons.faEdit} />
            </Button>
            <Button variant='flat' className='text-primary' size='sm' onClick={() => window.open('../houses/' + id, '_blank')}>
                <FontAwesomeIcon icon={Icons.faEye} />
            </Button>
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
                    <h1 className='text-white p-0 m-0'><FontAwesomeIcon icon={Icons.faPager} className='me-3' /> Gestion des annonces</h1>
                </Container>
                <Container className='p-5'>
                    <Spin spinning={loading}>
                        <BootstrapTable data={items["hydra:member"]} search={true} options={options} pagination bordered={false} >
                            <TableHeaderColumn width={'5%'} dataSort={true} isKey dataField='id'>#</TableHeaderColumn>
                            <TableHeaderColumn width={'30%'} dataSort={true} dataField='title'>Titre</TableHeaderColumn>
                            <TableHeaderColumn width={'10%'} dataSort={true} dataField='category' dataFormat={(c) => c.name}>Catégorie</TableHeaderColumn>
                            <TableHeaderColumn width={'10%'} dataSort={true} dataField='price'>Prix</TableHeaderColumn>
                            <TableHeaderColumn width={'15%'} dataSort={true} dataField='address' dataFormat={(a) => a.city + ', ' + a.country}>Destination</TableHeaderColumn>
                            <TableHeaderColumn width={'15%'} dataSort={true} dataField='status' dataFormat={statusFormat}>Status</TableHeaderColumn>
                            <TableHeaderColumn width={'10%'} dataField='id' dataFormat={actionFormat}>-</TableHeaderColumn>
                        </BootstrapTable>
                    </Spin>
                </Container>
            </Container >
        </div >

    )
}

export default Annonces