import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import '../assets/css/searchItem.css'

const SearchItem = () => {
    return (
        <div className='search-item my-2 d-flex rounded'>
            <img className='search-img rounded' src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60" alt="" />
            <div className="search-description d-flex justify-content-center flex-column mx-3">
                <h2 className='mb-1'>Hôtel Opéra Liège</h2>
                <span className='search-subtitle mb-2'>Premier hôtel zero plastiquie à Paris</span>
                <span className='search-location'><FontAwesomeIcon className='icon' icon={faLocationDot} /> Paris, Département de Paris, Île-de-France</span>
                <div className="search-info pb-3 d-flex justify-content-between align-items-end">
                    <div className="search-detail">
                        <span>1 logement</span>
                        <span>, 2 personnes</span>
                    </div>
                    <div className="search-price">
                        <span>235 €</span>/nuit
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchItem