import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { Divider } from 'antd'
import { useNavigate } from "react-router-dom";


const SearchItem = (props) => {
    let navigate = useNavigate();
    const image = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60";
    return (
        <div className='border searchItem shadow-sm row mb-3 p-0 rounded' onClick={() => navigate("/houses/" + props.id)}>
            <Col lg={5} className="p-0">
                <img className='img-fluid' width='100%' style={{ height: '100%' }} src={image} alt="" />
            </Col>
            <Col lg={7}>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <h2 className='m-0  searchItemTitle'>{props.title}</h2>
                    <span className="rounded bg-atypik text-white float-right px-2" style={{ width: 'auto' }}>{props.category}</span>
                </div>
                <small> <FontAwesomeIcon className='icon' icon={faLocationDot} color="#8ED081" /> {props.location}</small>
                <p className='my-2 mr-3 searchItemDescription'>{props.description}</p>
                <div className='d-flex justify-content-around border-top border-bottom py-2'>
                    <div><FontAwesomeIcon icon={Icons.faUser} color="#767A82" className='pe-1' /> {props.travelers} personnes</div>
                    <div><FontAwesomeIcon icon={Icons.faBed} color="#767A82" className='pe-1' /> {props.beds} lits</div>
                    <div><FontAwesomeIcon icon={Icons.faDoorOpen} color="#767A82" className='pe-1' /> {props.rooms} pièces</div>
                </div>
                <div className="d-flex justify-content-between align-items-end px-3 py-3">
                    <div>
                        <FontAwesomeIcon icon={Icons.faStar} color="#F97316" className='pe-2' />
                        <span>{props.reviews}</span>
                    </div>
                    <span><strong className='text-bold text-atypik'>{props.price}€</strong> /nuit</span>
                </div>
            </Col>
        </div >
    )
}

export default SearchItem