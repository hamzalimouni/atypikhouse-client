import React, { useState } from 'react'
import bg from '../assets/img/bg.png';
import '../assets/css/CardHouse.css';
import { Card, Image, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faLocationPin, faStar } from '@fortawesome/free-solid-svg-icons';
import StarRatings from 'react-star-ratings';

const ReviewCard = (props) => {

    return (
        <Card style={{ maxWidth: '300px' }} className='mx-auto mt-4'>
            <Image className='mx-auto mt-3 rounded-circle' src={bg} height="70px" width="70px" />
            <Card.Body>
                <Row className='text-center'>
                    <h5>{props.name}</h5>
                    <small style={{ color: '#b2b2b2' }}><FontAwesomeIcon icon={faLocationDot} /> {props.location}</small>
                </Row>
            </Card.Body>
            <Card.Body className='text-center mt-2'>
                <Card.Title style={{ fontSize: '1.1em' }}>{props.house}</Card.Title>
                <small>{props.review}</small>
                <br /><br />
                <StarRatings
                    rating={props.stars}
                    starRatedColor="gold"
                    numberOfStars={5}
                    name='rating'
                    starEmptyColor='#f2f2f2'
                    starDimension='20'
                    starSpacing='3'
                />
            </Card.Body>
        </Card>
    )
}

export default ReviewCard