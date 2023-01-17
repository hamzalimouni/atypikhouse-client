import React, { useState } from 'react'
import bg from '../assets/img/bg.png';
import '../assets/css/CardHouse.css';
import { Card, Image, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faLocationPin, faStar } from '@fortawesome/free-solid-svg-icons';
import StarRatings from 'react-star-ratings';
import { Rate, Avatar } from 'antd';

const ReviewCard = (props) => {

    return (
        <Card style={{ maxWidth: '300px' }} className='mx-auto mt-4'>
            <Row className='mx-auto mt-4'>
                <Avatar style={{ backgroundColor: '#F97316', verticalAlign: 'middle' }} size="large">
                    {(props.name.charAt(0) + '.').toUpperCase()}
                </Avatar>
            </Row>
            <Card.Body>
                <Row className='text-center'>
                    <h5>{props.name}</h5>
                    <small style={{ color: '#b2b2b2' }}><FontAwesomeIcon icon={faLocationDot} color="#8ED081" /> {props.location}</small>
                </Row>
            </Card.Body>
            <Card.Body className='text-center mt-2'>
                <small style={{
                    'display': '-webkit-box',
                    '-webkit-line-clamp': '4',
                    '-webkit-box-orient': 'vertical',
                    'overflow': 'hidden',
                    'text-overflow': 'ellipsis'
                }}>{props.review}</small>
                <br /><br />
                <Rate disabled value={props.stars} style={{ fontSize: '1.2em' }} />
            </Card.Body>
        </Card >
    )
}

export default ReviewCard