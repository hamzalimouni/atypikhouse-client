import React, { useState, useEffect } from 'react'
import { Form, Container, Row, Modal, Badge, Button, ButtonGroup } from 'react-bootstrap';
import Sidebar from '../../components/admin/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { Popconfirm, message, Spin } from 'antd';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { API_URL } from '../../Variables';
import Cookies from 'js-cookie';

const Properties = () => {

    const [items, setItems] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState({
        id: null,
        name: null,
        type: null,
        isRequired: null,
        category: null
    })
    const handleClose = () => {
        setData({ id: null, name: null, type: null, isRequired: null, category: null })
        setShow(false);
    }
    const handleShow = () => setShow(true);


    useEffect(() => {
        getProperties();
        getCategories();
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

    const getProperties = () => {
        fetch(API_URL + '/proprieties')
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
            <Popconfirm title="Voulez-vous vraiment supprimer cette propriété?" onConfirm={() =>
                fetch(API_URL + '/proprieties/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'bearer ' + Cookies.get("token"),
                        'Content-Type': 'application/merge-patch+json'
                    }
                })
                    .then(
                        (result) => {
                            if (result.status == 204) {
                                message.success('Propriété supprimée avec succès');
                            } else {
                                message.error('Impossible de supprimer la propriété car il est mentioné dans des annonces publiées');
                            }
                            getProperties();
                        }
                    )
            } onOpenChange={() => console.log('open change')}>
                <Button variant='flat' className='text-danger' size='sm'>
                    <FontAwesomeIcon icon={Icons.faTrash} />
                </Button>
            </Popconfirm>

            <Button variant='flat' className='text-primary' size='sm' onClick={() => {
                setData({ id: id, name: cell.name, type: cell.type, isRequired: cell.isRequired, category: cell.category.id })
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
        const response = await property(
            id ? 'PATCH' : 'POST',
            {
                'name': form.name.value,
                'type': form.type.value,
                'isRequired': form.required.checked,
                'category': {
                    'id': form.category.value
                }
            },
            id ? ('/' + id) : '',
            id ? 'application/merge-patch+json' : 'application/json'
        );
        if ('name' in response) {
            id ? message.success("Propriété modifié avec succès")
                : message.success("Propriété ajouté avec succès");
        } else {
            message.error("Erreur")
        }
        getProperties();
        setShow(false);
        setLoading(false);
        form.name.value = "";
        setData({ id: null, name: null, type: null, isRequired: null, category: null })
    }

    async function property(method, data, id = '', ctype) {
        return fetch(API_URL + '/proprieties' + id, {
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
                    <h1 className='text-white p-0 m-0'><FontAwesomeIcon icon={Icons.faListCheck} className='me-3' /> Gestion des propriétés</h1>
                </Container>
                <Container className='p-5'>
                    <Spin spinning={loading}>
                        <BootstrapTable data={items["hydra:member"]} search={true} options={options} pagination bordered={false} >
                            <TableHeaderColumn className='border' dataSort={true} isKey dataField='id'>#</TableHeaderColumn>
                            <TableHeaderColumn className='border' dataSort={true} dataField='name'>Propriété</TableHeaderColumn>
                            <TableHeaderColumn className='border' dataSort={true} dataField='type'>Type</TableHeaderColumn>
                            <TableHeaderColumn className='border' dataSort={true} dataField='isRequired'>Champs requis</TableHeaderColumn>
                            <TableHeaderColumn className='border' dataSort={true} dataField='category' dataFormat={(c) => c.name}>Catégorie</TableHeaderColumn>
                            <TableHeaderColumn hidden dataField='category' dataFormat={(c) => c.id}></TableHeaderColumn>
                            <TableHeaderColumn className='border' dataField='id' dataFormat={actionFormat}>-</TableHeaderColumn>
                        </BootstrapTable>
                    </Spin>
                </Container >
            </Container>
            <Modal show={show} onHide={handleClose} animation={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{data['id'] ? 'Modifier' : 'Ajouter'} une propriété</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Spin spinning={loading}>
                        <Form className='px-5' onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Titre</Form.Label>
                                <Form.Control type="text" name="name"
                                    value={data['name'] ? data['name'] : null}
                                    onChange={(e) => setData({ ...data, ['name']: e.target.value })}
                                    required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Type</Form.Label>
                                <Form.Select name="type" defaultValue={data['id'] ? data['type'] : null}>
                                    <option value="text">Text</option>
                                    <option value="number">Numéro</option>
                                    <option value="bool">Booléan</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Catégorie</Form.Label>
                                <Form.Select name="category" defaultValue={data['id'] ? data['category'] : null}>
                                    {categories.map(category => <option value={category['id']}>{category['name']}</option>)}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    defaultChecked={data['id'] ? data['isRequired'] : null}
                                    type="switch"
                                    name="required"
                                    label="Le champs est obligatoire?"
                                />
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

export default Properties