import { faBed, faDoorOpen, faLocationDot, faPerson, faRuler, faShower, faSquare, faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Image, Row, Form, FloatingLabel } from 'react-bootstrap'
import AppNavbar from '../components/Navbar'
import Footer from '../components/Footer'
import CommentCard from '../components/CommentCard'
import HouseImages from '../components/HouseImages'
import { useNavigate } from "react-router-dom";
import { Avatar, Divider, Rate } from 'antd';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { DatePicker, Badge, Skeleton, message } from 'antd';
import Moment from 'moment';
import { useParams } from "react-router-dom";
import { API_URL } from '../Variables';
import notFoundImage from '../assets/img/notfound.svg'
import Cookies from 'js-cookie';

const House = () => {
  const { RangePicker } = DatePicker;
  const { id } = useParams()
  const [travelers, setTravelers] = useState(1);
  const [days, setDays] = useState(1);
  const [found, setfound] = useState(true);
  const [houseData, setHouseData] = useState([])
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([])
  const [houseParams, setHouseParams] = useState([])
  const [indisponible, setIndisponible] = useState([])
  const [rating, setRating] = useState(3)
  const [ratingAvg, setRatingAvg] = useState(3)

  const navigate = useNavigate();
  useEffect(() => {
    getHouse()
    getHouseParams()
  }, []);

  const getHouse = async () => {
    await fetch(API_URL + '/houses/' + id)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else if (response.status === 404) {
          return Promise.reject(404)
        }
      })
      .then(data => {
        if (data.status == "APPROVED") {
          const ig = []
          data.images.map((i) => {
            ig.push({ image: i.filePath + '\\' + i.fileName })
          })
          data.disponibilities.map((d) => setIndisponible((indisponible) => [...indisponible, Moment(d.date).format('YYYY-MM-DD')]))
          let ravg = 0;
          data.reviews?.map((r) => ravg += r.grade / data.reviews.length)
          setRatingAvg(ravg.toFixed(1))
          setImages(ig)
          setHouseData(data)
          setLoading(false)
        } else {
          setfound(false)
        }
      })
      .catch(error => { console.log(error); setfound(false) });
  }

  const getHouseParams = async () => {
    await fetch(API_URL + '/propriety_values?house.id=' + id)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else if (response.status === 404) {
          return Promise.reject(404)
        }
      })
      .then(data => {
        setHouseParams(data['hydra:member'])
      })
      .catch(error => { console.log(error); setHouseParams(null) });
  }

  const handleClick = () => {
    navigate("/houses/paiment");
  }

  const dateHandle = (dates) => {
    setDays(Moment(dates[1]).diff(dates[0], 'days'))
  }

  const disabledDate = (current) => {
    let index = indisponible.findIndex(date => date === Moment(current).format('YYYY-MM-DD'))
    return index > -1 && true
  }

  const onReviewSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    let review = form.review.value;
    fetch(API_URL + '/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'bearer ' + Cookies.get("token"),
      },
      body: JSON.stringify({
        grade: rating,
        comment: review,
        user: {
          id: JSON.parse(Cookies.get("user")).id
        },
        house: {
          id: id
        }
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res.comment) {
          message.success("Merci pour votre honnêteté")
          form.review.value = ""
          getHouse()
        } else {
          message.error("Une erreur s'est produite, merci de ressayer")
        }
      })
      .catch(error => { console.log(error); });

  }
  return (
    <div>
      <AppNavbar />
      {!found ?
        <Container className='text-center mt-5'>
          <Image src={notFoundImage} height={300}></Image>
          <h2 className='mt-5'>Annonce non trouvée</h2>
          <a>Le lien que vous avez suivi est peut-être rompu ou l'annonce a été supprimée ou bien en cours de révision</a>
        </Container>
        :
        <>
          <div className="py-4">
            <Container className='text-center'>
              {loading ?
                <Skeleton.Image className="mx-auto" active style={{ width: 1000, height: 450, maxWidth: '100%' }} />
                :
                <HouseImages images={images} loading={loading} />}
            </Container >
          </div >
          <Container className="py-5">
            <Row className='mx-auto d-flex'>
              <Col lg={8} className="px-4">
                <Skeleton loading={loading} paragraph={{ rows: 15 }} active >
                  <Row className='shadow-sm rounded p-4'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <h1 className="house-title">{houseData.title}</h1>
                      <span className='rounded bg-atypik text-white float-right px-2' style={{ width: 'auto' }}>{houseData.category?.name}</span>
                    </div>
                    <div className='d-flex align-items-center'>
                      <FontAwesomeIcon icon={faStar} color="#F97316" className='pe-2' />
                      <span>{ratingAvg == 0 ? 5 : ratingAvg}/5 ({houseData.reviews ? houseData.reviews.length : 0})</span>
                      <span className='px-3'>·</span>
                      <FontAwesomeIcon icon={faLocationDot} color="#767A82" className='pe-2' />
                      <span>{houseData.address?.city}, {houseData.address?.country}</span>
                    </div>
                    <div className='d-flex align-items-center mt-3'>
                      <Avatar style={{ backgroundColor: '#F97316', verticalAlign: 'middle' }} size="large">
                        {houseData.owner?.firstname.charAt(0) + houseData.owner?.lastname.charAt(0)}
                      </Avatar>
                      <span className='ps-2'>Publiée par <strong className='text-weight-bold'>{houseData.owner?.firstname + ' ' + houseData.owner?.lastname}</strong></span>
                      <Button size={'sm'} className='ms-3' variant="atypik">Envoyer un message</Button>
                    </div>
                    <Divider />
                    <div className='d-flex justify-content-around'>
                      <div><FontAwesomeIcon icon={Icons.faSquare} color="#767A82" className='pe-2' />  {houseData.surface}m²</div>
                      <div><FontAwesomeIcon icon={Icons.faUser} color="#767A82" className='pe-2' /> {houseData.nbPerson} personnes</div>
                      <div><FontAwesomeIcon icon={Icons.faBed} color="#767A82" className='pe-2' /> {houseData.beds} lits</div>
                      <div><FontAwesomeIcon icon={Icons.faDoorOpen} color="#767A82" className='pe-2' /> {houseData.rooms} pièces</div>
                    </div>
                  </Row>
                  <Row className='shadow-sm rounded p-4 mt-4'>
                    <h4>Descritpion</h4>
                    <Divider className='mt-0' />
                    <span >
                      {houseData.description}
                    </span>
                  </Row>
                  {houseData.equipments?.length > 0 ? <Row className='shadow-sm rounded p-4 mt-4'>
                    <h4>Les équipements</h4>
                    <Divider className='mt-0' />
                    <Row>
                      {
                        houseData.equipments?.map((e) => {
                          return <Col key={e.id} lg={4} className='my-2'>{e.name}</Col>
                        })
                      }
                    </Row>
                  </Row> : null}
                  {houseParams?.length > 0 ?
                    <Row className='shadow-sm rounded p-4 mt-4'>
                      <h4>Plus d'informations sur le bien</h4>
                      <Divider className='mt-0' />
                      <Row>
                        {
                          houseParams.map((h) => {
                            return <Col key={h.id} lg={4}>{h.propriety?.name} : {h.value}</Col>
                          })
                        }
                      </Row>
                    </Row> : null
                  }
                  <Row className='shadow-sm rounded p-4 mt-4'>
                    <h4>Localisation</h4>
                    <Divider className='mt-0' />
                    <span className='mb-3'>
                      {houseData.address?.address}<br />
                      {houseData.address?.zipcode} {houseData.address?.city}<br />
                      {houseData.address?.country}
                    </span>
                    <MapContainer center={[houseData.address?.latitude, houseData.address?.longitude]} zoom={13} style={{ height: 300 }}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'
                      />
                      <Marker position={[houseData.address?.latitude, houseData.address?.longitude]} icon={
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
                    <h4>Les avis ({houseData.reviews?.length} avis)</h4>
                    <Divider className='mt-0' />

                    {Cookies.get('user') ?
                      <>
                        <Row>
                          <Form className="d-flex" onSubmit={onReviewSubmit}>
                            <FloatingLabel label="Je donne mon avis" className='w-100 pe-2'>
                              <Form.Control
                                type="text"
                                name="review"
                                placeholder="avis"
                                required />
                            </FloatingLabel>
                            <Button type="submit" variant='atypik' style={{ borderRadius: 30 }}><FontAwesomeIcon icon={Icons.faArrowRight} color="#fff" className='px-2' /></Button>
                          </Form>
                        </Row>
                        <Rate allowClear={false} defaultValue={3} className='ms-3' onChange={setRating} />
                      </>
                      : null}
                    <div className='container mt-5'>
                      {
                        houseData.reviews?.sort((a, b) => (b.id - a.id)).map((r) => {
                          return <CommentCard
                            id={Cookies.get("user") && JSON.parse(Cookies.get("user")).id === r.user.id ? r.id : null}
                            reload={getHouse}
                            user={r.user.firstname + ' ' + r.user.lastname}
                            comment={r.comment}
                            date={Moment(r.createdAt).format("DD/MM/YYYY")}
                            rating={r.grade}
                          />
                        })
                      }
                    </div>
                  </Row>
                </Skeleton>

              </Col>
              <Col sm={12} md={12} xs={{ order: 'first' }} lg={{ span: 4, order: 'last' }} className='shadow-sm sticky-top rounded h-100 p-4 mb-5'>
                <Skeleton loading={loading} paragraph={{ rows: 10 }} active >
                  <div className='d-flex justify-content-between align-items-center'>
                    <span><strong style={{ fontSize: '1.6em' }}>{houseData.price}€ </strong>/ nuit</span>
                    <span>
                      <FontAwesomeIcon icon={faStar} color="#F97316" className='pe-2' />
                      {ratingAvg == 0 ? 5 : ratingAvg}/5 ({houseData.reviews ? houseData.reviews.length : 0})
                    </span>
                  </div>

                  <Row className='my-5'>
                    <RangePicker
                      disabledDate={disabledDate}
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
                            disabled={travelers > houseData.nbPerson - 1}>+</Button>
                        </div>
                      </div>
                    </div>
                  </Row>

                  <div className='d-flex justify-content-between'>
                    <span>{houseData.price} € x {days} nuit :</span>
                    <span>{houseData.price * days} €</span>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <span>Les frais de service:</span>
                    <span>15 €</span>
                  </div>
                  <Divider />

                  <div className='d-flex justify-content-between'>
                    <strong>Total:</strong>
                    <strong>{houseData.price * days + 15} €</strong>
                  </div>

                  <Button onClick={handleClick} variant="atypik" className='w-100 mt-5'>Réserver</Button>
                </Skeleton>
              </Col>
            </Row>
          </Container>
        </>
      }
      <Footer />
    </div >
  )
}

const RangePicker = {

}

export default House