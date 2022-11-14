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

const { RangePicker } = DatePicker;

const Houses = () => {
  // const location = useLocation();
  // const [destination, setDestination] = useState(location.state.destintaion);
  // const [date, setDate] = useState(location.state.date);
  // const [optionss, setOptionss] = useState(location.state.options);
  // console.log(location);

  return (
    <div>
      <AppNavbar />
      <div className="list-container">
        <div className="list-wrapper">
          <Container className='list-search'>
            <Row className='my-3'>
              <Col sm={12} md={12} lg={6} xl={6}>
                <Row className='py-3 square border border-light rounded'>
                  <Col>
                    <InputGroup className='atypik-input'>
                      <InputGroup.Text className='icon'><FontAwesomeIcon icon={faLocationPin} /></InputGroup.Text>
                      <Form.Control className='input'
                        placeholder="Destination"
                      />
                    </InputGroup>
                  </Col>
                  <Col>
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
                  <Col>

                  </Col>
                  <Col>
                    <Button variant="atypik">Rercherche</Button>
                  </Col>
                </Row>
                <Row className='my-3 pb-3 square border-bottom'>
                  <h1>Destination</h1>
                  <div className="result-list-total-filter d-flex justify-content-between align-items-center">
                    <div className="result-total">
                      <span>total Logement</span>
                      <span>, total Hote</span>
                    </div>
                    <div className="filter">
                      <Button variant="atypik">Filter</Button>
                    </div>
                  </div>
                </Row>
                <Row className="list-result">
                  <SearchItem />
                  <SearchItem />
                  <SearchItem />
                  <SearchItem />
                </Row>
              </Col>
              <Col className='maps'>Maps</Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Houses