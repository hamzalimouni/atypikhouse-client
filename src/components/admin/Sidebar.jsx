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
                <Nav.Link eventKey="reservations" className='my-1'><FontAwesomeIcon icon={Icons.faHistory} className='me-3' /><strong>Réservations</strong></Nav.Link>
                <Nav.Link eventKey="categories" className='my-1' onClick={() => navigate('/admin/categories')} ><FontAwesomeIcon icon={Icons.faTable} className='me-3' /><strong>Catégories</strong></Nav.Link>
                <Nav.Link eventKey="equipment" className='my-1' onClick={() => navigate('/admin/equipment')} ><FontAwesomeIcon icon={Icons.faTv} className='me-3' /><strong>Équipements</strong></Nav.Link>
                <Nav.Link eventKey="properties" className='my-1' onClick={() => navigate('/admin/properties')} ><FontAwesomeIcon icon={Icons.faListCheck} className='me-3' /><strong>Propriétés</strong></Nav.Link>
                <Nav.Link eventKey="link-6" className='my-1' ><FontAwesomeIcon icon={Icons.faUserGroup} className='me-3' /><strong>Utilisateurs</strong></Nav.Link>
            </Nav>

            <div className="dropdown">
                <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>mdo</strong>
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar