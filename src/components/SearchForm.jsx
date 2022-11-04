import React, { useState } from 'react'
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/main.css'
import '../assets/css/navbar.css'
import bg from '../assets/img/bg.png';
import { Container, Row, Col, Form, Button, InputGroup, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCalendarDays, faCoffee, faLocationPin, faPeopleArrows, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import moment from 'moment';
import { DatePicker, Popover } from 'antd';
import { useNavigate } from 'react-router-dom';


const { RangePicker } = DatePicker;

const SearchForm = () => {
    const disabledDate = (current) => {
        return current && current < moment().endOf('day');
    };
    const [options, setOptions] = useState({
        travelers: 2,
        rooms: 1
    });
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            Key: "selection"
        }
    ]);

    const handleOptions = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev, [name]: operation === "+" ? options[name] + 1 : options[name] - 1
            }
        })
    };
    const navigate = useNavigate();
    const handleSearch = () => {
        navigate("/houses", { state: { destination, date, options } })
    };
    return (
        <Container fluid className='p-0 d-flex align-items-center justify-content-center' style={{
            height: 500, backgroundImage: `url(${bg})`, backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>

            <Container className="align-items-center">
                <Row className="align-items-center">
                    <h1 className='sbTitle'>Quelle sera votre prochaine destination ?</h1>
                </Row>
                <Row className="align-items-center my-5">
                    <Col lg className='py-2'>
                        <InputGroup className='atypik-input'>
                            <InputGroup.Text className='icon'><FontAwesomeIcon icon={faLocationPin} /></InputGroup.Text>
                            <Form.Control className='input'
                                placeholder="Destination" onChange={(e) => setDestination(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                    <Col lg className='py-2'>
                        <div className='atypik-input form-control py-0'>
                            <div className='w-100 d-flex align-items-center' style={{ height: "36px" }}>
                                <div className="icon"><FontAwesomeIcon icon={faCalendarDays} /></div>
                                <RangePicker
                                    disabledDate={disabledDate}
                                    style={{ border: "none" }}
                                    placeholder={["Date d'arrivé", "Date de départ"]}
                                    suffixIcon=""
                                    separator="" />
                            </div>
                        </div>
                    </Col>
                    <Col lg className='py-2'>
                        <div className='atypik-input form-control py-0'>
                            <div className='w-100 d-flex align-items-center' style={{ height: "36px" }}>
                                <div className="icon"><FontAwesomeIcon icon={faPeopleGroup} /></div>
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
                                    <span className='ms-2 atypik-sm-text'>
                                        {options.travelers} Voyageurs - {options.rooms} Chambre
                                    </span>
                                </Popover>
                            </div>
                        </div>
                    </Col>
                    <Col lg className='py-2'>
                        <Button variant="atypik" className="w-100" onClick={handleSearch}>Rercherche</Button>
                    </Col>

                </Row>

            </Container>
        </Container >
    )
}

export default SearchForm