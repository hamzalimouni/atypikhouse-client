import React, { useState, useEffect } from 'react'
import { Form, Container, Modal, Badge, Button, ButtonGroup } from 'react-bootstrap';
import Sidebar from '../../components/admin/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { Popconfirm, message, Spin } from 'antd';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { API_URL } from '../../Variables';
import Cookies from 'js-cookie';

const Equipment = () => {

    useEffect(() => {
        document.title = "Gestion des equipments - AtypikHouse";
    }, []);

    const [items, setItems] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        id: null,
        name: null,
        status: null
    })
    const handleClose = () => {
        setData({ id: null, name: null, status: null })
        setShow(false);
    }

    const getEquipment = () => {
        fetch(API_URL + '/equipements')
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
        getEquipment();
    }, []);

    const myButton = () => {
        return (
            <ButtonGroup>
                <Button variant='atypik' size='sm' onClick={() => {
                    setShow(true);
                }
                }><FontAwesomeIcon icon={Icons.faPlus} className='me-2' /> Ajouter</Button>
            </ButtonGroup>
        );
    }

    const actionFormat = (id, cell) => {
        return <div className='d-flex justify-content-center'>
            <Popconfirm title="Voulez-vous vraiment supprimer ce équipement?" onConfirm={() =>
                fetch(API_URL + '/equipements/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'bearer ' + Cookies.get("token"),
                        'Content-Type': 'application/merge-patch+json'
                    }
                })
                    .then(
                        (result) => {
                            if (result.status === 204) {
                                message.success('Équipement supprimée avec succès');
                            } else {
                                message.error('Impossible de supprimer l\'équipement car il est mentioné dans des annonces publiées');
                            }
                            getEquipment();
                        }
                    )
            } onOpenChange={() => console.log('open change')}>
                <Button variant='flat' className='text-danger' size='sm'>
                    <FontAwesomeIcon icon={Icons.faTrash} />
                </Button>
            </Popconfirm>

            <Button variant='flat' className='text-primary' size='sm' onClick={() => {
                setData({ id: id, name: cell.name, status: cell.status })
                setShow(true);
            }}>
                <FontAwesomeIcon icon={Icons.faEdit} />
            </Button>
        </div>;
    }

    function statusFormat(status) {
        return status ? <Badge bg='atypik'>Activée</Badge> : <Badge bg='danger'>Désactivée</Badge>;
    }

    const options = {
        btnGroup: myButton
    };


    const handleSubmit = async (event) => {
        setLoading(true);
        const form = event.currentTarget;
        event.preventDefault();
        let id = data['id'];
        const response = await equipment(
            id ? 'PATCH' : 'POST',
            {
                'name': form.name.value,
                'status': (form.status.value === 'true' ? true : false)
            },
            id ? ('/' + id) : '',
            id ? 'application/merge-patch+json' : 'application/json'
        );
        if ('name' in response) {
            id ? message.success("Équipement modifié avec succès")
                : message.success("Équipement ajouté avec succès");
        } else {
            message.error("Erreur")
        }
        getEquipment();
        setShow(false);
        setLoading(false);
        form.name.value = "";
        setData({ id: null, name: null, status: null })
    }

    async function equipment(method, data, id = '', ctype) {
        return fetch(API_URL + '/equipements' + id, {
            method: method,
            headers: {
                'Authorization': 'bearer ' + Cookies.get("token"),
                'Content-Type': ctype
            },
            body: JSON.stringify(data)
        })
            .then(data => data.json())
    }

    return (
        <div className='d-flex'>
            <Sidebar />
            <Container className='p-0'>
                <Container className='bg-blue ps-5 d-flex align-items-center' style={{ height: 220 }}>
                    <h1 className='text-white p-0 m-0'><FontAwesomeIcon icon={Icons.faTv} className='me-3' /> Gestion des équipements</h1>
                </Container>
                <Container className='p-5'>
                    <Spin spinning={loading}>
                        <BootstrapTable data={items["hydra:member"]} search={true} options={options} pagination bordered={false} >
                            <TableHeaderColumn className='border' dataSort={true} isKey dataField='id'>#</TableHeaderColumn>
                            <TableHeaderColumn className='border' dataSort={true} dataField='name'>Titre</TableHeaderColumn>
                            <TableHeaderColumn className='border' dataSort={true} dataField='status' dataFormat={statusFormat}>Status</TableHeaderColumn>
                            <TableHeaderColumn className='border' dataField='id' dataFormat={actionFormat}>-</TableHeaderColumn>
                        </BootstrapTable>
                    </Spin>
                </Container >
            </Container>
            <Modal show={show} onHide={handleClose} animation={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{data['id'] ? 'Modifier' : 'Ajouter'} un équipement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Spin spinning={loading}>
                        <Form className='px-5' onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Titre</Form.Label>
                                <Form.Control type="text" name="name"
                                    value={data['name'] ? data['name'] : null}
                                    onChange={(e) => setData({ ...data, 'name': e.target.value })}
                                    required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select name="status" defaultValue={data['status'] ? 'true' : (data['status'] == null ? 'true' : false)}>
                                    <option value="true">Activée</option>
                                    <option value="false">Désactivée</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Control type="hidden" name="id" value={data['id']} />
                            <Form.Group className="mt-5 text-center">
                                <Button variant="atypik" type="submit">
                                    {data['id'] ? 'Modifier' : 'Ajouter'}
                                </Button>
                            </Form.Group>
                        </Form>
                    </Spin>
                </Modal.Body>
            </Modal>
        </div >
    )
}

export default Equipment