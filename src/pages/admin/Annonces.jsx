import React, { Fragment } from 'react'
import { Col, Container, Row, Table, Badge, Button, ButtonGroup } from 'react-bootstrap';
import Sidebar from '../../components/admin/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { Divider } from 'antd';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const Annonces = () => {

    const myButton = () => {
        return (
            <ButtonGroup>
                <Button variant='atypik' size='sm'>Les annonces en attente de validation</Button>
            </ButtonGroup>
        );
    }

    let products = [{
        id: 1,
        title: "Product1",
        category: 150,
        price: 150,
        destination: "Amsterdam, Holland",
        status: "Rejetée",
        actionid: 1
    }, {
        id: 2,
        title: "Product 2",
        category: 150,
        price: 150,
        destination: "Paris, France",
        status: "Acceptée",
        actionid: 2
    }, {
        id: 2,
        title: "Product 2",
        category: 150,
        price: 150,
        destination: "Paris, France",
        status: "En attente",
        actionid: 2
    }];

    function actionFormat(cell) {
        return <div className='d-flex'>
            <Button variant='flat' id={cell} className='text-atypik' size='sm'>
                <FontAwesomeIcon icon={Icons.faCheckCircle} />
            </Button>
            <Button variant='flat' className='text-danger' size='sm'>
                <FontAwesomeIcon icon={Icons.faTrash} />
            </Button>
            <Button variant='flat' className='text-primary' size='sm'>
                <FontAwesomeIcon icon={Icons.faEdit} />
            </Button>
            <Button variant='flat' className='text-primary' size='sm'>
                <FontAwesomeIcon icon={Icons.faEye} />
            </Button>
        </div>;
    }

    function statusFormat(status) {
        return <Badge bg={status == 'Acceptée' ? 'atypik' : (status == "Rejetée" ? "danger" : "primary")}>{status}</Badge>;
    }

    const options = {
        btnGroup: myButton
    };

    return (
        <div className='d-flex'>
            <Sidebar />
            <Container className='p-5'>
                <BootstrapTable data={products} search={true} options={options} pagination >
                    <TableHeaderColumn dataSort={true} isKey dataField='id'>#</TableHeaderColumn>
                    <TableHeaderColumn dataSort={true} dataField='title'>Titre</TableHeaderColumn>
                    <TableHeaderColumn dataSort={true} dataField='category'>Catégorie</TableHeaderColumn>
                    <TableHeaderColumn dataSort={true} dataField='price'>Prix</TableHeaderColumn>
                    <TableHeaderColumn dataSort={true} dataField='destination'>Destination</TableHeaderColumn>
                    <TableHeaderColumn dataSort={true} dataField='status' dataFormat={statusFormat}>Status</TableHeaderColumn>
                    <TableHeaderColumn dataField='actionid' dataFormat={actionFormat}>-</TableHeaderColumn>
                </BootstrapTable>
            </Container >
        </div >

    )
}

export default Annonces