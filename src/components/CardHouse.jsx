import React from 'react'
import bg from '../assets/img/bg.png';
import '../assets/css/CardHouse.css';
import { Card, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import * as Icons from '@fortawesome/free-solid-svg-icons';
const CardHouse = (props) => {
    return (
        <Card className='mt-4'>
            <div style={{
                height: 300, width: '100%', backgroundImage: `url(${props.image || bg})`, backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                borderRadius: 20
            }}>
            </div>
            {/* <Card.Img variant="top" src={props.image || bg} height="300px" /> */}
            {/* <Carousel images={images} style={{ height: 300 }}
                hasThumbnails={false}
                hasSizeButton={false}
                hasLeftButton={false}
                hasRightButton={false}
                hasMediaButton={false}
                hasIndexBoard={false}
                hasDotButtons={"bottomCenter"} /> */}
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text><FontAwesomeIcon icon={Icons.faLocationDot} color="#c0c0c0" /> {props.destination}</Card.Text>
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