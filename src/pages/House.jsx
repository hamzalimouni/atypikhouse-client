import { faBed, faDoorOpen, faLocationDot, faPerson, faRuler, faShower, faSquare, faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Col, Container, Image, Row, Form, FloatingLabel } from 'react-bootstrap'
import AppNavbar from '../components/Navbar'
import Footer from '../components/Footer'
import CommentCard from '../components/CommentCard'
import HouseImages from '../components/HouseImages'
import { useNavigate } from "react-router-dom";
import { Avatar, Divider, Rate } from 'antd';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { DatePicker, Badge } from 'antd';
import Moment from 'moment';

const House = () => {
  const { RangePicker } = DatePicker;
  const [travelers, setTravelers] = useState(1);
  const [days, setDays] = useState(1);
  const [price, setPrice] = useState(150);
  const images = [

    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
    }

  ];
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/houses/paiment");
  }

  const dateHandle = (dates) => {
    setDays(Moment(dates[1]).diff(dates[0], 'days'))
  }
  return (
    <div>
      <AppNavbar />
      <div className="py-4">
        <Container>
          <HouseImages images={images} />
        </Container >
      </div >
      <Container className="houses-informations py-5">
        <Row className='container d-flex'>
          <Col lg={8} className="px-4">
            <Row className='shadow-sm rounded p-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <h1 className="house-title">Le Clos de la Loutre</h1>
                <span className='rounded bg-atypik text-white float-right px-2' style={{ width: 'auto' }}>Cabanes</span>
              </div>
              <div className='d-flex align-items-center'>
                <FontAwesomeIcon icon={faStar} color="#F97316" className='pe-2' />
                <span>4.9/5 (105)</span>
                <span className='px-3'>·</span>
                <FontAwesomeIcon icon={faLocationDot} color="#767A82" className='pe-2' />
                <span>Paris, France</span>
              </div>
              <div className='d-flex align-items-center mt-3'>
                <Avatar style={{ backgroundColor: '#F97316', verticalAlign: 'middle' }} size="large">
                  M
                </Avatar>
                <span className='ps-2'>Publiée par <strong className='text-weight-bold'>MOUDOU M.</strong></span>
                <Button size={'sm'} className='ms-3' variant="atypik">Envoyer un message</Button>
              </div>
              <Divider />
              <div className='d-flex justify-content-around'>
                <div><FontAwesomeIcon icon={Icons.faSquare} color="#767A82" className='pe-2' />  20m²</div>
                <div><FontAwesomeIcon icon={faUser} color="#767A82" className='pe-2' /> 6 personnes</div>
                <div><FontAwesomeIcon icon={faBed} color="#767A82" className='pe-2' /> 2 lits</div>
                <div><FontAwesomeIcon icon={faDoorOpen} color="#767A82" className='pe-2' /> 3 pièces</div>
              </div>
            </Row>
            <Row className='shadow-sm rounded p-4 mt-4'>
              <h4>Descritpion</h4>
              <Divider className='mt-0' />
              <span >
                En lisière de forêt, au calme, sur une propriété de 600 ha avec chemins de randonnée, <br /><br />
                vous êtes accueillis au Clos de la Loutre avec ses hébergements insolites En lisière de forêt, au calme, <br /><br />
                sur une propriété de 600 ha avec chemins de randonnée<br /><br />
                vous êtes accueillis au Clos de la Loutre avec ses hébergements insolites.
              </span>
            </Row>
            <Row className='shadow-sm rounded p-4 mt-4'>
              <h4>Les équipements</h4>
              <Divider className='mt-0' />
              <Row>
                <Col lg={4}>A</Col>
                <Col lg={4}>B</Col>
                <Col lg={4}>C</Col>
                <Col lg={4}>D</Col>
                <Col lg={4}>E</Col>
              </Row>
            </Row>
            <Row className='shadow-sm rounded p-4 mt-4'>
              <h4>Plus d'informations sur le bien</h4>
              <Divider className='mt-0' />
              <Row>
                <Col lg={4}>Hauteur : 10m</Col>
                <Col lg={4}>Lorem : Non</Col>
                <Col lg={4}>Ipsum : Oui</Col>
              </Row>
            </Row>
            <Row className='shadow-sm rounded p-4 mt-4'>
              <h4>Localisation</h4>
              <Divider className='mt-0' />
              <span className='mb-3'>
                11 Avenue Auguste Rodin<br />
                94350 Villiers-sur-marne<br />
                France
              </span>
              <MapContainer center={[48.833859, 2.549111]} zoom={13} style={{ height: 300 }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'
                />
                <Marker position={[48.833859, 2.549111]} icon={
                  require('leaflet').icon({
                    iconUrl: require('../assets/img/marker.png'),
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: null,
                    shadowUrl: null,
                    shadowSize: null,
                    shadowAnchor: null
                  })
                } >
                </Marker>
              </MapContainer>
            </Row>

            <Row className='shadow-sm rounded p-4 mt-4'>
              <h4>Les avis (23 avis)</h4>
              <Divider className='mt-0' />

              <Row>
                <Form className="d-flex">
                  <FloatingLabel label="Je donne mon avis" className='w-100 pe-2'>
                    <Form.Control
                      type="text"
                      placeholder="avis"
                      required />
                  </FloatingLabel>
                  <Button variant='atypik' style={{ borderRadius: 30 }}><FontAwesomeIcon icon={Icons.faArrowRight} color="#fff" className='px-2' /></Button>
                </Form>
              </Row>
              <Rate className='ms-3' />
              <div className='container mt-5'>
                <CommentCard
                  user="Hamza Elyamouni"
                  comment="This is some text within a card body."
                  date="23/10/2022"
                  rating={3}
                />
                <CommentCard
                  user="Moudou Mohammed"
                  comment="This is some text within a card body."
                  date="23/10/2022"
                  rating={3}
                />
              </div>
            </Row>

          </Col>
          <Col sm={12} md={6} lg={4} className='shadow-sm rounded sticky-top h-100 p-4'>
            <div className='d-flex justify-content-between align-items-center'>
              <span><strong style={{ fontSize: '1.6em' }}>166€ </strong>/ nuit</span>
              <span>
                <FontAwesomeIcon icon={faStar} color="#F97316" className='pe-2' />
                4.9/5 (105)
              </span>
            </div>

            <Row className='my-5'>
              <RangePicker
                defaultValue={[Moment(), Moment().add(1, 'days')]}
                style={{ border: '1px solid #f0f0f0', padding: 19, borderRadius: 10 }}
                placeholder={["Date d'arrivé", "Date de départ"]}
                suffixIcon=""
                onChange={dateHandle}
                separator={<FontAwesomeIcon icon={Icons.faArrowRight} color="#cecece" />} />
              <div className="mt-2" style={{ border: '1px solid #f0f0f0', padding: 19, borderRadius: 10 }}>
                <div className="d-flex justify-content-around align-items-center">
                  <span>
                    Voyageurs
                  </span>
                  <div className="d-flex justify-content-center align-items-center">
                    <Button variant="atypik" size="sm" style={{ width: "35px" }}
                      onClick={() => {
                        setTravelers(travelers - 1)
                      }}
                      disabled={travelers <= 1}>-</Button>
                    <Badge bg="light" text="dark" className='mx-2'>
                      {travelers}
                    </Badge>
                    <Button variant="atypik" size="sm" style={{ width: "35px" }}
                      onClick={() => {
                        setTravelers(travelers + 1)
                      }}
                      disabled={travelers > 5}>+</Button>
                  </div>
                </div>
              </div>
            </Row>

            <div className='d-flex justify-content-between'>
              <span>{price} € x {days} nuit :</span>
              <span>{price * days} €</span>
            </div>
            <div className='d-flex justify-content-between'>
              <span>Les frais de service:</span>
              <span>15 €</span>
            </div>
            <Divider />

            <div className='d-flex justify-content-between'>
              <strong>Total:</strong>
              <strong>{price * days + 15} €</strong>
            </div>

            <Button onClick={handleClick} variant="atypik" className='w-100 mt-5'>Réserver</Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div >
  )
}

const RangePicker = {

}

export default House