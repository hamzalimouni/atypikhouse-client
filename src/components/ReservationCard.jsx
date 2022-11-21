import { faBed, faDoorOpen, faShower, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Card } from 'react-bootstrap'

const ReservationCard = () => {
    return (
        <Card className='house-detail-price'>
            <div className="travel-detail my-3">
                <div className="reservation-detail m-4">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60" alt="" />
                    <div className="house-detail mt-1">
                        <h5>Le Clos de la Loutre</h5>
                        <div className="icons d-flex justify-content-around">
                            <span><FontAwesomeIcon fontSize={13} icon={faUser} /> 2</span>
                            <span><FontAwesomeIcon fontSize={13} icon={faDoorOpen} /> 2</span>
                            <span><FontAwesomeIcon fontSize={13} icon={faBed} /> 1</span>
                            <span><FontAwesomeIcon fontSize={13} icon={faShower} /> 1</span>
                        </div>
                    </div>
                </div>
                <div className="price-details mx-3">
                    <div className="price-night">
                        <span>165 € x 1 nuit :</span>
                        <span>165 €</span>
                    </div>
                    <div className="price-taxe my-1">
                        <span>Taxe de séjour :</span>
                        <span>1 €</span>
                    </div>
                    <div className="price-total fw-bold">
                        <span>Total :</span>
                        <span>166 €</span>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ReservationCard