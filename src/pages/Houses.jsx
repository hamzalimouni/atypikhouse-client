import { faCalendarDays, faLocationPin, faPeopleGroup, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Badge, Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import AppNavbar from '../components/Navbar'
import Footer from '../components/Footer'
import { DateRange } from 'react-date-range'
import { setDate } from 'date-fns'
import { DatePicker, Popover } from 'antd';
import SearchItem from '../components/SearchItem'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { MapContainer, TileLayer, Marker, Popup, Polygon, SVGOverlay } from "react-leaflet";
import CardHouse from '../components/CardHouse'
import L from 'leaflet';
import MapCardHouse from '../components/MapCardHouse'

const { RangePicker } = DatePicker;

const Houses = () => {
  // const location = useLocation();
  // const [destination, setDestination] = useState(location.state.destintaion);
  // const [date, setDate] = useState(location.state.date);
  // const [optionss, setOptionss] = useState(location.state.options);
  // console.log(location);
  const [options, setOptions] = useState({
    travelers: 2,
    rooms: 1
  });
  const handleOptions = (name, operation) => {
    setOptions(prev => {
      return {
        ...prev, [name]: operation === "+" ? options[name] + 1 : options[name] - 1
      }
    })
  };


  const text = L.divIcon({ html: 'Your HTML text here' });


  return (
    <div>
      <AppNavbar />
      <Container>
        <div className="list-wrapper">
          <Container className='list-search'>
            <Row className='my-3'>
              <Col sm={12} md={12} lg={7} xl={7}>
                <Row className='py-3 square border border-light rounded'>
                  <Col className="py-1">
                    <InputGroup className='atypik-input'>
                      <InputGroup.Text className='icon'><FontAwesomeIcon icon={faLocationPin} /></InputGroup.Text>
                      <Form.Control className='input'
                        placeholder="Destination"
                      />
                    </InputGroup>
                  </Col>
                  <Col lg={5} className="py-1">
                    <div className='atypik-input form-control py-0'>
                      <div className='w-100 d-flex align-items-center' style={{ height: "36px" }}>
                        <div className="icon"><FontAwesomeIcon icon={faCalendarDays} /></div>
                        <RangePicker
                          style={{ border: "none" }}
                          placeholder={["Date d'arrivé", "Date de départ"]}
                          suffixIcon=""
                          separator="" />
                      </div>
                    </div>
                  </Col>
                  <Col lg={2} className="py-1">
                    <div className='atypik-input form-control p-0'>
                      <div className='w-100 d-flex align-items-center' style={{ height: "36px" }}>
                        <Popover placement="bottom" content={
                          <div>
                            <div className="row py-2">
                              <span className="col">
                                Voyageurs
                              </span>
                              <div className="col d-flex justify-content-center align-items-center">
                                <Button variant="atypik" size="sm" style={{ width: "35px" }}
                                  onClick={() => {
                                    handleOptions("travelers", "-")
                                  }}
                                  disabled={options.travelers <= 1}>-</Button>
                                <Badge bg="light" text="dark" className='mx-2'>
                                  {options.travelers}
                                </Badge>
                                <Button variant="atypik" size="sm" style={{ width: "35px" }}
                                  onClick={() => {
                                    handleOptions("travelers", "+")
                                  }}>+</Button>
                              </div>
                            </div>
                            <div className="row py-2">
                              <span className="col">
                                Chambres
                              </span>
                              <div className="col d-flex justify-content-center align-items-center">
                                <Button variant="atypik" size="sm" style={{ width: "35px" }}
                                  onClick={() => {
                                    handleOptions("rooms", "-")
                                  }}
                                  disabled={options.rooms <= 1}>-</Button>
                                <Badge bg="light" text="dark" className='mx-2'>
                                  {options.rooms}
                                </Badge>
                                <Button variant="atypik" size="sm" style={{ width: "35px" }}
                                  onClick={() => {
                                    handleOptions("rooms", "+")
                                  }}>+</Button>
                              </div>
                            </div>
                          </div>
                        } trigger="click">
                          <span className='w-100 px-2 atypik-sm-text d-flex justify-content-around'>
                            <div>
                              <FontAwesomeIcon icon={Icons.faPeopleGroup} color='#ffb703' className='pe-1' /> {options.travelers}
                            </div>
                            -
                            <div>
                              <FontAwesomeIcon icon={Icons.faDoorOpen} color='#ffb703' className='pe-1' />{options.rooms}
                            </div>
                          </span>
                        </Popover>
                      </div>
                    </div>
                  </Col>
                  <Col lg={1} className="py-1">
                    <Button variant="atypik"><FontAwesomeIcon icon={Icons.faSearch} /></Button>
                  </Col>
                </Row>
                <Row className='my-3 pb-3 square border-bottom'>
                  <h1>Destination</h1>
                  <div className="result-list-total-filter d-flex justify-content-between align-items-center">
                    <div className="result-total">
                      <span>320 logments trouvé</span>
                    </div>
                    <div className="filter">
                      <Button variant="atypik">Filter</Button>
                    </div>
                  </div>
                </Row>
                <div>
                  <SearchItem />
                  <SearchItem />
                  <SearchItem />
                  <SearchItem />
                </div>
              </Col>
              <Col className="sticky-top h-100 ">
                <MapContainer center={[51.505, -0.09]} zoom={13} className="mt-3" style={{ height: '90vh' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'
                  />
                  <Marker
                    position={[51.505, -0.14]}
                    icon={
                      L.divIcon({
                        html: '<div class="text-white mt-1">200 €</div>',
                        iconSize: [50, 25],
                        className: 'bg-atypik text-center shadow rounded',
                        shadowUrl: null,
                        shadowSize: null,
                        shadowAnchor: null
                      })
                    } >
                    <Popup className="p-0" style={{ width: '350px !important' }}>
                      <MapCardHouse
                        title="Hello"
                        destination="Location"
                        price="350"
                        reviews="4.8" />
                    </Popup>
                  </Marker>
                  {/* <Polygon color="blue" positions={[51.505, -0.09]}>
                    <Marker position={[51.505, -0.09]} icon={
                      L.divIcon({ html: '200' })
                    } />
                  </Polygon> */}
                </MapContainer>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
      <Footer />
    </div>
  )
}

export default Houses