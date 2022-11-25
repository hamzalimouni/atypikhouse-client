import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { Divider } from 'antd'

const SearchItem = (props) => {
    const image = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60";
    return (
        <div className='border searchItem shadow-sm row mb-3 p-0 rounded'>
            <Col lg={5} className="p-0">
                <img className='img-fluid' width='100%' style={{ height: '100%' }} src={image} alt="" />
            </Col>
            <Col lg={7}>
                <h2 className='m-0 mt-3 searchItemTitle'>Hôtel Opéra Liège{props.title}</h2>
                <small> <FontAwesomeIcon className='icon' icon={faLocationDot} color="#8ED081" /> Puisseguin, Gironde, Nouvelle-Aquitaine{props.location}</small>
                <p className='my-2 mr-3 searchItemDescription'>Lorem ipsum dolor sit amet adipisicing elit, consectetur adipisicing elit.{props.description}</p>
                <div className='d-flex justify-content-around border-top border-bottom py-2'>
                    <div><FontAwesomeIcon icon={Icons.faUser} color="#767A82" className='pe-1' /> 5 personnes</div>
                    <div><FontAwesomeIcon icon={Icons.faBed} color="#767A82" className='pe-1' /> 2 lits</div>
                    <div><FontAwesomeIcon icon={Icons.faDoorOpen} color="#767A82" className='pe-1' /> 2 pièces</div>
                </div>
                <div className="d-flex justify-content-between align-items-end px-3 py-3">
                    <div>
                        <FontAwesomeIcon icon={Icons.faStar} color="#F97316" className='pe-2' />
                        <span>5/5 (20)</span>
                    </div>
                    <span><strong className='text-bold text-atypik'>235€</strong> /nuit</span>
                </div>
            </Col>
        </div >
    )
}

export default SearchItem