import { faBed, faDoorOpen, faLocationDot, faShower, faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/house.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import AppNavbar from '../components/Navbar'
import Footer from '../components/Footer'
import review from '../assets/icons/review.png'
import CommentCard from '../components/CommentCard'
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/houses/paiment");
  }

  return (
    <div>
      <AppNavbar />
      <div className="main-background-color py-4">
        <Container className="house-container">
          <div className="house-wrapper">
            <h1 className="house-title">Le Clos de la Loutre</h1>
            <div className="house-adress">
              <FontAwesomeIcon icon={faLocationDot} color="#8ED081" />
              <span> Nyons, Drôme, Auvergne-Rhône-Alpes</span>
            </div>
            <div className="house-rating my-1">
              <FontAwesomeIcon icon={faStar} color="gold" />
              <span> 4.9/5 </span>
              <span>(10 Avis)</span>
            </div>
            <div className="house-images">
              {photo.map(photo => (
                <div className="house-img-wrapper">
                  <img src={photo.src} className="house-img rounded" alt="" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
      <Container className="houses-informations py-5">
        <Row className='container d-flex flex-row-reverse'>
          <Col sm={12} md={6} lg={4} className='house-detail-price h-100'>
            <div className='price-rate'>
              <span className='price'>166€ / nuit</span>
              <span className='rating'>
                <FontAwesomeIcon icon={faStar} color="gold" /> 4.9 / 5
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
              <div className="reservation-detail my-3">
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
              <div className="reserver">
                <Button onClick={handleClick} variant="atypik" className='w-100'>Réserver</Button>
              </div>
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
          </Col>
          <Col className=''>
            <div className="house-details">
              <div className="description">
                <h2>Description</h2>
                <p>En lisière de forêt, au calme, sur une propriété de 600 ha avec chemins de randonnée, vous êtes accueillis au Clos de la Loutre avec ses hébergements insolites En lisière de forêt, au calme, sur une propriété de 600 ha avec chemins de randonnée, vous êtes accueillis au Clos de la Loutre avec ses hébergements insolites.</p>
              </div>
              <div className="equipement">
                <h2>Equipement</h2>
              </div>
              <div className="location">
                <h2>Localisation</h2>
              </div>
            </div>

            <div className="py-5">
              <div className='text-center mt-4 d-flex justify-content-center align-items-center py-2'>
                <Image className='atypik-img-title' src={review} height='70px' />
                <h2 className='atypik-cur-title m-0 px-2'> Ce que les gens disaient</h2>
              </div>
              <Row className='container mt-5'>
                <Col lg={12}>
                  <CommentCard
                    userImage="https://wac-cdn.atlassian.com/fr/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=619"
                    userName="Hamza Elyamouni"
                    comment="This is some text within a card body."
                  />
                </Col>
                <Col lg={12}>
                  <CommentCard
                    userImage="https://wac-cdn.atlassian.com/fr/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=619"
                    userName="Hamza Elyamouni"
                    comment="This is some text within a card body."
                  />
                </Col>
              </Row>
            </div>
            <div className='text-center mt-4 d-flex justify-content-center align-items-center py-2'>
              <Image className='atypik-img-title' src={review} height='70px' />
              <h2 className='atypik-cur-title m-0 px-2'> je donne mon avis</h2>
            </div>
            <div className="comment-form mt-5">
              <h4 className='py-1'>Et vous, que pensez-vous ?</h4>
              <textarea className='form-control' name="" id="" rows="8"></textarea>
              <div className="rating-submit d-flex justify-content-between align-items-center mt-3">
                <div className="rate">
                  <FontAwesomeIcon fontSize={20} icon={faStar} color="gold" />
                  <FontAwesomeIcon fontSize={20} icon={faStar} color="gold" />
                  <FontAwesomeIcon fontSize={20} icon={faStar} color="gold" />
                  <FontAwesomeIcon fontSize={20} icon={faStar} color="gold" />
                  <FontAwesomeIcon fontSize={20} icon={faStar} color="gold" />
                </div>
                <Button variant="atypik" className='w-25'>Envoyer</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

export default House