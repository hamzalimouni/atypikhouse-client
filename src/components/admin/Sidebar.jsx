import React from 'react'
import { Nav, Container, NavDropdown, Button, Image, Modal, Row, Col } from 'react-bootstrap';
import logo from '../../assets/img/logo.png';
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    let navigate = useNavigate();
    let location = useLocation();
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light vh-100 shadow" style={{ width: 280 }}>
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <Image className="logo" src={logo} height='30px' />
            </div>

            <Nav defaultActiveKey={location.pathname.split('/').pop().split('/')[0]} className="flex-column nav-pills mt-5 vh-100">
                <Nav.Link eventKey="dashboard" className='my-1' onClick={() => navigate('/admin/dashboard')}><FontAwesomeIcon icon={Icons.faChartLine} className='me-3' /><strong>Statistics</strong></Nav.Link>
                <Nav.Link eventKey="annonces" className='my-1' onClick={() => navigate('/admin/annonces')}><FontAwesomeIcon icon={Icons.faFile} className='me-3' /><strong>Annonces</strong></Nav.Link>
                <Nav.Link eventKey="reservations" className='my-1' onClick={() => navigate('/admin/reservations')}><FontAwesomeIcon icon={Icons.faReorder} className='me-3' /><strong>Réservations</strong></Nav.Link>
                <Nav.Link eventKey="categories" className='my-1' onClick={() => navigate('/admin/categories')} ><FontAwesomeIcon icon={Icons.faTable} className='me-3' /><strong>Catégories</strong></Nav.Link>
                <Nav.Link eventKey="equipment" className='my-1' onClick={() => navigate('/admin/equipment')} ><FontAwesomeIcon icon={Icons.faTv} className='me-3' /><strong>Équipements</strong></Nav.Link>
                <Nav.Link eventKey="properties" className='my-1' onClick={() => navigate('/admin/properties')} ><FontAwesomeIcon icon={Icons.faListCheck} className='me-3' /><strong>Propriétés</strong></Nav.Link>
                <Nav.Link eventKey="users" className='my-1' onClick={() => navigate('/admin/users')} ><FontAwesomeIcon icon={Icons.faUserGroup} className='me-3' /><strong>Utilisateurs</strong></Nav.Link>
            </Nav>

            <div className="dropdown">
                <strong role="button" onClick={() => navigate('/')}><FontAwesomeIcon icon={Icons.faArrowLeft} className='me-3' />Retour au site</strong>
            </div>
        </div>
    )
}

export default Sidebar