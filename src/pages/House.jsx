import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/house.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Container } from 'react-bootstrap'
import AppNavbar from '../components/Navbar'

const House = () => {

  const photo = [
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
    }
  ];

  return (
    <div>
      <AppNavbar />
      <Container className="house-container">
        <div className="house-wrapper">
          <h1 className="house-title">Le Clos de la Loutre</h1>
          <div className="house-adress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span> Nyons, Drôme, Auvergne-Rhône-Alpes</span>
          </div>
          <div className="house-rating my-1">
            <FontAwesomeIcon icon={faStar} />
            <span> 4.9/5 </span>
            <span>(10 Avis)</span>
          </div>
          <div className="house-images">
            {photo.map(photo => (
              <div className="house-img-wrapper">
                <img src={photo.src} className="house-img" alt="" />
              </div>
            ))}
          </div>
          <div className="houses-informations">
            <div className="house-detail-price">
              <div className='price-rate'>
                <span className='price'>166€ / nuit</span>
                <span className='rating'>
                  <FontAwesomeIcon icon={faStar} /> 4.9 / 5
                </span>
              </div>
              <div className="travel-detail">
                <div className="travel-client-detail">
                  <div className="date-detail">
                    <h4>Date :</h4>
                  </div>
                  <div className="voyageur-detail">
                    <h4>Voyageurs :</h4>
                  </div>
                </div>
                <div className="house-details">
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60" alt="" />
                  <div className="house-detail">
                    <h5>Le Clos de la Loutre</h5>
                    <span>1</span>
                    <span>1</span>
                    <span>1</span>
                    <span>1</span>
                  </div>
                </div>
                <button>Réserver</button>
                <div className="price-details">
                  <div className="price-night">
                    <span>165 € x 1 nuit :</span>
                    <span>165 €</span>
                  </div>
                  <div className="price-taxe">
                    <span>Taxe de séjour :</span>
                    <span>1 €</span>
                  </div>
                  <div className="price-total">
                    <span>Total :</span>
                    <span>166 €</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="house-details">
              <div className="description">
                <h2>Description</h2>
                <p>En lisière de forêt, au calme, sur une propriété de 600 ha avec chemins de randonnée, vous êtes accueillis au Clos de la Loutre avec ses hébergements insolites.</p>
              </div>
              <div className="equipement">
                <h2>Equipement</h2>
              </div>
              <div className="location">
                <h2>Localisation</h2>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default House