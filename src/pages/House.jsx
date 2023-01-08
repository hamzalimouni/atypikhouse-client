import { faLocationDot, faStar, } from '@fortawesome/free-solid-svg-icons'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Image, Row, Form, FloatingLabel, ButtonGroup } from 'react-bootstrap'
import AppNavbar from '../components/Navbar'
import Footer from '../components/Footer'
import CommentCard from '../components/CommentCard'
import HouseImages from '../components/HouseImages'
import { useNavigate, useLocation, createSearchParams } from "react-router-dom";
import { Avatar, Divider, Rate } from 'antd';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { DatePicker, Badge, Skeleton, message, Popconfirm, Tag, Modal } from 'antd';
import Moment from 'moment';
import { useParams } from "react-router-dom";
import { API_URL, MEDIA_URL } from '../Variables';
import notFoundImage from '../assets/img/notfound.svg'
import Cookies from 'js-cookie';

const House = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  let curUser = JSON.parse(Cookies.get('user') || null);
  const { RangePicker } = DatePicker;
  const { id } = useParams()
  const [found, setfound] = useState(true);
  const [houseData, setHouseData] = useState([])
  const [myReservation, setMyReservation] = useState([])
  const [isMine, setIsMine] = useState(false)
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([])
  const [houseParams, setHouseParams] = useState([])
  const [indisponible, setIndisponible] = useState([])
  const [rating, setRating] = useState(3)
  const [ratingAvg, setRatingAvg] = useState(3)
  const [openMessage, setOpenMessage] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [options, setOptions] = useState({
    from: params.get("from") || new Moment(),
    to: params.get("to") || new Moment().add(1, 'days'),
    travelers: parseInt(params.get("travelers")) || 1
  })

  const navigate = useNavigate();

  useEffect(() => {
    getHouse()
    getHouseParams()
  }, []);

  useEffect(() => {
    navigate({
      pathname: "/houses/" + id,
      search: `?${createSearchParams({
        from: Moment(options.from).format('MM/DD/YYYY'),
        to: Moment(options.to).format('MM/DD/YYYY'),
        travelers: options.travelers,
      })}`
    })
  }, [options]);

  const getHouse = async () => {
    setLoading(true)
    await fetch(API_URL + '/houses/' + id, Cookies.get("token") && {
      headers: { 'Authorization': 'bearer ' + Cookies.get("token") }
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else if (response.status === 404) {
          return Promise.reject(404)
        } else if (response.status === 403) {
          return Promise.reject(403)
        }
      })
      .then(data => {
        if (data?.status == "APPROVED" ||
          curUser?.roles.indexOf('ROLE_ADMIN') > -1 ||
          curUser?.id == data.owner.id
        ) {
          const ig = []
          data.images.map((i) => {
            ig.push({ image: MEDIA_URL + i.fileName })
          })
          setIndisponible([]);
          data.disponibilities.map((d) => setIndisponible((indisponible) => [...indisponible, Moment(d.date).format('YYYY-MM-DD')]))
          let ravg = 0;
          data.reviews?.map((r) => ravg += r.grade / data.reviews.length)
          setRatingAvg(ravg.toFixed(1))
          setImages(ig)
          setHouseData(data)
          setLoading(false)
          setMyReservation(data.reservations.find(r => r.user.id === curUser?.id))
          setIsMine(curUser?.id == data.owner.id)
          document.title = data.title + " - AtypikHouse";
          let reservedDates = [];
          data.reservations.map((r) => {
            if (Moment(r.fromDate).isSameOrAfter(Moment())) {
              for (var m = Moment(r.fromDate); m.isBefore(r.toDate); m.add(1, 'days')) {
                reservedDates.push(m.format('YYYY-MM-DD'));
              }
            }
          })
          reservedDates.map((d) => setIndisponible((indisponible) => [...indisponible, d]))
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


  // const dateHandle = (dates) => {
  //   setDays(Moment(dates[1]).diff(dates[0], 'days'))
  // }

  //   const disabledDate = (current) => {
  //     return current && current < moment().startOf('day');
  // };

  const sendMessage = async () => {
    setSending(true)
    await fetch(API_URL + '/messages', {
      method: 'POST',
      headers: {
        'Authorization': 'bearer ' + Cookies.get("token"),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ receiver: { id: houseData?.owner?.id }, content: messageContent })
    })
      .then(data => data.json())
      .then(res => {
        if (res.content) {
          message.success("Message envoyé avec success")
          setOpenMessage(false)
          setMessageContent('')
          setSending(false)
        } else {
          message.error("Une erreur s'est produite, merci de ressayer")
          setSending(false)
        }
      })
      .catch(error => { console.log(error); });
  }

  const disabledDate = (current) => {
    let index = indisponible.findIndex(date => date === Moment(current).format('YYYY-MM-DD'))
    return (index > -1 && true) || (current && current < Moment().startOf('day'));
  }

  async function changeStatus(status) {
    return fetch(API_URL + '/houses/' + id, {
      method: 'PATCH',
      headers: {
        'Authorization': 'bearer ' + Cookies.get("token"),
        'Content-Type': 'application/merge-patch+json'
      },
      body: JSON.stringify({ status: status })
    })
      .then(data => data.json())
      .then((response) => getHouse())
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
          {curUser?.roles.indexOf('ROLE_ADMIN') > -1 ?
            <Container className='border shadow-sm my-5 p-5 text-center'>
              <Skeleton loading={loading} paragraph={{ rows: 2 }} active >
                <p>
                  <>
                    Vous êtes connecté en tant que admin, l'annonce suivante est
                    {houseData.status == 'UNDER_REVIEW' ?
                      <strong className='text-primary'> en cours de révision </strong> :
                      houseData.status == 'APPROVED' ?
                        <strong className='text-success'> acceptée </strong> :
                        <strong className='text-danger'> réfusée </strong>
                    }
                    vous pouvez toujours changer le status de l'annonce
                  </>
                </p>

                <ButtonGroup className='my-2'>
                  {houseData.status == 'UNDER_REVIEW' || houseData.status == 'REJECTED' ?
                    <Popconfirm title="Voulez-vous vraiment valider cette annonce?" onConfirm={() =>
                      changeStatus('APPROVED')
                    }>
                      <Button size='sm' variant='atypik' className='mx-1'>Valider l'annonce</Button>
                    </Popconfirm>
                    : null}
                  {houseData.status == 'UNDER_REVIEW' || houseData.status == 'APPROVED' ?
                    <Popconfirm title="Voulez-vous vraiment réfuser cette annonce?" onConfirm={() =>
                      changeStatus('REJECTED')
                    }>
                      <Button size='sm' variant='danger' className='mx-1'>Réfuser l'annonce</Button>
                    </Popconfirm>
                    : null}
                </ButtonGroup>
              </Skeleton>
            </Container> : null
          }

          {isMine ?
            <Container className='text-center pt-4'>
              {houseData.status == 'REJECTED' ?
                <Tag color="error" className='p-2 my-3'><strong>Votre annonce est réfusée par notre equipe de révision</strong>, vous êtes le seul à pouvoir voir cette page</Tag>
                : houseData.status == 'UNDER_REVIEW' ?
                  <Tag color="warning" className='p-2 my-3'><strong>Votre annonce est en cours de révision</strong>, vous êtes le seul à pouvoir voir cette page</Tag>
                  : null
              }
            </Container>
            : null
          }
          <div className="py-4">
            <Container className='text-center'>
              {loading ?
                <Skeleton.Image className="mx-auto" active style={{ width: 1000, height: 450, maxWidth: '100%' }} />
                :
                <>
                  {myReservation ?
                    <Tag color="success" className='p-2 my-3'>Vous avez déja réservé cette habitat <strong role='button' onClick={() => navigate('/account/reservations')}>voir mes réservation</strong></Tag>
                    : null
                  }
                  <HouseImages images={images} loading={loading} />
                </>
              }
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
                      <Button size={'sm'} onClick={() => setOpenMessage(true)} disabled={!Cookies.get('user')} className='ms-3' variant="atypik">Envoyer un message</Button>
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
                            return <Col key={h.id} lg={4}>{h.propriety?.name} : {h.value == 1 ? 'Oui' : h.value}</Col>
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

                    {Cookies.get('user') && myReservation && Moment().diff(myReservation.fromDate, 'days') >= 0 && myReservation.status != 'CANCELED' ?
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
                            key={r.id}
                            id={(curUser?.id === r.user.id) || curUser?.roles.indexOf('ROLE_ADMIN') > -1 ? r.id : null}
                            reload={getHouse}
                            user={r.user.firstname + ' ' + r.user.lastname}
                            comment={r.comment}
                            date={Moment(r.createdAt).fromNow()}
                            rating={r.grade}
                          />
                        })
                      }
                    </div>
                  </Row>
                </Skeleton>

              </Col>
              <Col sm={12} md={12} xs={{ order: 'first' }} lg={{ span: 4, order: 'last' }} className='shadow-sm sticky-top rounded h-100 p-4 mb-5' style={{ zIndex: 0 }}>
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
                      defaultValue={[Moment(options.from), Moment(options.to)]}
                      onChange={(d) => setOptions({ ...options, from: d[0].toDate(), to: d[1].toDate() })}
                      style={{ border: '1px solid #f0f0f0', padding: 19, borderRadius: 10 }}
                      placeholder={["Date d'arrivé", "Date de départ"]}
                      suffixIcon=""
                      separator={<FontAwesomeIcon icon={Icons.faArrowRight} color="#cecece" />} />
                    <div className="mt-2" style={{ border: '1px solid #f0f0f0', padding: 19, borderRadius: 10 }}>
                      <div className="d-flex justify-content-around align-items-center">
                        <span>
                          Voyageurs
                        </span>
                        <div className="d-flex justify-content-center align-items-center">
                          <Button variant="atypik" size="sm" style={{ width: "35px" }}
                            onClick={() => {
                              setOptions({ ...options, travelers: options.travelers - 1 })
                            }}
                            disabled={options.travelers <= 1}>-</Button>
                          <Badge bg="light" text="dark" className='mx-2'>
                            {options.travelers}
                          </Badge>
                          <Button variant="atypik" size="sm" style={{ width: "35px" }}
                            onClick={() => {
                              setOptions({ ...options, travelers: options.travelers + 1 })
                            }}
                            disabled={options.travelers > houseData.nbPerson - 1}>+</Button>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className='d-flex justify-content-between'>
                    <span>{houseData.price} € x {Moment(options.to).diff(options.from, 'days')} nuit :</span>
                    <span>{houseData.price * Moment(options.to).diff(options.from, 'days')} €</span>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <span>Les frais de service:</span>
                    <span>Gratuit</span>
                  </div>
                  <Divider />
                  <div className='d-flex justify-content-between'>
                    <strong>Total:</strong>
                    <strong>{houseData.price * Moment(options.to).diff(options.from, 'days')} €</strong>
                  </div>
                  <Button onClick={() => {
                    let isDispo = true;
                    indisponible.map((i) => {
                      if (Moment(i).isBetween(Moment(options.from).format('MM/DD/YYYY'), Moment(options.to).format('MM/DD/YYYY'))) {
                        isDispo = false;
                        return;
                      }
                    })
                    if (isDispo) {
                      navigate({
                        pathname: "/houses/" + id + '/booking',
                        search: `?${createSearchParams({
                          from: Moment(options.from).format('MM/DD/YYYY'),
                          to: Moment(options.to).format('MM/DD/YYYY'),
                          travelers: options.travelers,
                        })}`
                      })
                    } else {
                      message.error("L'habitat n'est pas disponible aux dates sélectionnées.");
                    }
                  }
                  } variant="atypik" className='w-100 mt-5'>Réserver</Button>
                </Skeleton>
              </Col>
            </Row>
          </Container>
        </>
      }
      <Modal
        title="Envoyer un message"
        open={openMessage}
        onOk={() => { setSendingMessage(true) }}
        confirmLoading={sendingMessage}
        footer={
          <Button size='sm' variant='atypik' onClick={sendMessage} disabled={messageContent == '' || sending}>Envoyer</Button>
        }
        onCancel={() => setOpenMessage(false)}>
        <FloatingLabel label="Message" className='w-100 pe-2'>
          <Form.Control
            as="textarea"
            name="message"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="message"
            style={{ height: '200px' }}
            required />
        </FloatingLabel>
      </Modal>
      <Footer />
    </div >
  )
}

const RangePicker = {

}

export default House