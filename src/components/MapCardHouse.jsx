import React from 'react'
import '../assets/css/CardHouse.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const MapCardHouse = (props) => {
    let navigate = useNavigate();

    return (
        <div role='button' onClick={() => navigate("/houses/" + props.id)}>
            <div style={{
                height: 150, width: '100%', backgroundImage: `url(${props.thumbnail})`, backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                borderRadius: 10
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
            <h4 className='mt-2 mb-0 mb-2 searchItemTitle'>{props.title}</h4>
            <span><FontAwesomeIcon className='icon' icon={Icons.faLocationDot} color="#8ED081" /> {props.destination}</span>
            <div class="d-flex justify-content-between mt-2">
                <strong>
                    {props.price}€ / nuit
                </strong>
                <div>
                    <span><FontAwesomeIcon icon={Icons.faStar} color="#F97316" /> {props.reviews}</span>
                </div>
            </div>
        </div>
    )
}

export default MapCardHouse