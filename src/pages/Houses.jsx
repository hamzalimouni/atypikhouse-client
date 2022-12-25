import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { Badge, Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import AppNavbar from '../components/Navbar'
import Footer from '../components/Footer'
import { DatePicker, Popover, Skeleton, AutoComplete } from 'antd';
import SearchItem from '../components/SearchItem'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import MapCardHouse from '../components/MapCardHouse'
import Moment from 'moment';
import { createSearchParams, useNavigate, useLocation } from "react-router-dom";
import { API_URL, MEDIA_URL } from '../Variables';

const { RangePicker } = DatePicker;

const Houses = () => {
  const navigate = useNavigate();

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const [options, setOptions] = useState({
    travelers: parseInt(params.get("travelers")) || 1,
    rooms: parseInt(params.get("rooms")) || 1
  });
  const [destination, setDestination] = useState(params.get("destination") || '');
  const [dates, setDates] = useState({
    from: params.get("from") || new Moment(),
    to: params.get("to") || new Moment().add(1, 'days'),
  });

  const [houses, setHouses] = useState([])
  const [nbHouses, setNbHouses] = useState(0)
  const [loading, setLoading] = useState(true);
  const [destinationOptions, setDestinationOptions] = useState([]);

  const handleOptions = (name, operation) => {
    setOptions(prev => {
      return {
        ...prev, [name]: operation === "+" ? options[name] + 1 : options[name] - 1
      }
    })
  };

  useEffect(() => {
    getHouses()
    fetch(API_URL + '/search')
      .then(res => res.json())
      .then(
        (result) => {
          setDestinationOptions([]);
          let filteredArray = result.filter((v, i, a) => a.findIndex(t => (JSON.stringify(t) === JSON.stringify(v))) === i);
          filteredArray.map((a) => {
            // setDestinationOptions(...destinationOptions, [])
            setDestinationOptions(destinationOptions => [...destinationOptions, { value: a.city + ', ' + a.country }]);

          })
        },
        (error) => {
          console.log(error)
        }
      )
  }, []);

  const getHouses = async () => {
    let adrQuery = destination != "" ? "&address.city=" + destination.split(', ')[0] + "&address.country=" + destination.split(', ')[1] : '';
    await fetch(API_URL + "/houses?rooms[gte]=" + options.rooms +
      `${adrQuery}&nbPerson[gte]=` + options.travelers +
      "&status=APPROVED" +
      "&order[createdAt]=DESC")
      .then(response => {
        if (response.ok) {
          return response.json()
        } else if (response.status === 404) {
          return Promise.reject(404)
        }
      })
      .then(data => {
        setHouses(data['hydra:member'])
        setNbHouses(data['hydra:totalItems'])
        setLoading(false)
      })
      .catch(error => { console.log(error); setHouses(null) });
  }

  useEffect(() => {
    navigate({
      pathname: "/houses",
      search: `?${createSearchParams({
        destination: destination,
        from: Moment(dates.from).format('MM/DD/YYYY'),
        to: Moment(dates.to).format('MM/DD/YYYY'),
        travelers: options.travelers,
        rooms: options.rooms
      })}`
    })
    getHouses()
    setLoading(true)
  }, [dates, destination, options]);


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
                      <InputGroup.Text className='icon'><FontAwesomeIcon icon={Icons.faLocationPin} /></InputGroup.Text>
                      {/* <Form.Control className='input'
                        placeholder="Destination"
                        value={destination}
                        onChange={(d) => setDestination(d.target.value)}
                      /> */}

                      <AutoComplete
                        className='form-control input border-0'
                        options={destinationOptions}
                        value={destination}
                        onSelect={(e) => setDestination(e)}
                        onChange={(e) => setDestination(e)}
                        filterOption={(inputValue, option) =>
                          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        placeholder="Destination"
                      />
                    </InputGroup>
                  </Col>
                  <Col lg={5} className="py-1">
                    <div className='atypik-input form-control py-0'>
                      <div className='w-100 d-flex align-items-center' style={{ height: "36px" }}>
                        <div className="icon"><FontAwesomeIcon icon={Icons.faCalendarDays} /></div>
                        <RangePicker
                          defaultValue={[Moment(dates.from), Moment(dates.to)]}
                          onChange={(d) => setDates({ from: d[0].toDate(), to: d[1].toDate() })}
                          style={{ border: "none" }}
                          placeholder={["Date d'arrivé", "Date de départ"]}
                          suffixIcon=""
                          separator="" />
                      </div>
                    </div>
                  </Col>
                  <Col lg={3} className="py-1">
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
                  {/* <Col lg={1} className="py-1">
                    <Button variant="atypik" onClick={handleSearch}><FontAwesomeIcon icon={Icons.faSearch} /></Button>
                  </Col> */}
                </Row>
                <Row className='my-3 pb-3 square border-bottom'>
                  <h1>Destination</h1>
                  <div className="result-list-total-filter d-flex justify-content-between align-items-center">
                    <div className="result-total">
                      <span>{nbHouses} logments trouvé</span>
                    </div>
                    <div className="filter">
                      <Button variant="atypik">Filter</Button>
                    </div>
                  </div>
                </Row>
                <Skeleton loading={loading} paragraph={{ rows: 15 }} active >
                  {
                    houses.map((h) => {
                      let ravg = 0;
                      h.reviews.map((r) => ravg += r.grade / h.reviews.length)
                      return <SearchItem
                        key={h.id}
                        thumbnail={MEDIA_URL + h.images[0]?.fileName}
                        searchOptions={{ from: dates.from, to: dates.to, travelers: options.travelers }}
                        id={h.id}
                        title={h.title}
                        description={h.description}
                        category={h.category.name}
                        location={h.address.city + ', ' + h.address.country}
                        travelers={h.nbPerson}
                        rooms={h.rooms}
                        price={h.price}
                        beds={h.beds}
                        reviews={ravg == 0 ? '-' : ravg.toFixed(1) + ' (' + h.reviews.length + ')'} />
                    })
                  }
                </Skeleton>
              </Col>
              <Col className="sticky-top h-100 ">
                <MapContainer center={[48.8566, 2.3522]} zoom={5} className="mt-3" style={{ height: '90vh' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'
                  />
                  {
                    houses.map((h) => {
                      let ravg = 0;
                      h.reviews.map((r) => ravg += r.grade / h.reviews.length)
                      return <Marker
                        key={h.id}
                        position={[h.address?.latitude, h.address?.longitude]}
                        icon={
                          L.divIcon({
                            html: '<div class="text-white mt-1">' + h.price + ' €</div>',
                            iconSize: [50, 25],
                            className: 'bg-atypik text-center shadow rounded',
                            shadowUrl: null,
                            shadowSize: null,
                            shadowAnchor: null
                          })
                        } >
                        <Popup className="p-0" style={{ width: '350px !important' }}>
                          <MapCardHouse
                            thumbnail={MEDIA_URL + h.images[0]?.fileName}
                            id={h.id}
                            title={h.title}
                            location={h.address.city + ', ' + h.address.country}
                            price={h.price}
                            reviews={ravg == 0 ? '-' : ravg.toFixed(1) + ' (' + h.reviews.length + ')'} />
                        </Popup>
                      </Marker>
                    })
                  }

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
      </Container >
      <Footer />
    </div >
  )
}

export default Houses