import React from 'react'
import bg from '../assets/img/bg.png';
import '../assets/css/CardHouse.css';
import { Card, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const CardHouse = (props) => {
    return (
        <Card className='mt-4'>
            <Card.Img variant="top" src={bg} height="300px" />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.destination}</Card.Text>
            </Card.Body>
            <Card.Body>
                <div class="d-flex justify-content-between">
                    <strong>
                        {props.price} € / nuit
                    </strong>
                    <div>
                        <FontAwesomeIcon icon={faStar} color="#ffb406" /> {props.reviews}
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CardHouse