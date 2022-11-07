import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import '../assets/css/searchItem.css'

const SearchItem = (props) => {
    const image = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60";
    return (
        <div className='search-item-card my-2 rounded'>
            <div className="house-images">
                <img className='rounded' src={image} alt="" />
            </div>
            <div className="house-details">
                <h2>Hôtel Opéra Liège{props.title}</h2>
                <p>Lorem ipsum dolor sit amet adipisicing elit, consectetur adipisicing elit.{props.description}</p>
                <div className="location">
                    <FontAwesomeIcon className='icon' icon={faLocationDot} color="#8ED081" />
                    <h3>Puisseguin, Gironde, Nouvelle-Aquitaine{props.location}</h3>
                </div>
                <div className="search-info">
                    <div className="search-detail">
                        <span>1{props.logement} logement</span>
                        <span>, 2{props.personnes} personnes</span>
                    </div>
                    <div className="search-price">
                        <span>235{props.price} €</span>/nuit
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchItem