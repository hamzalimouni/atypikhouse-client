import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/main.css'
import '../assets/css/navbar.css'
import bg from '../assets/img/bg.png';
import { Container, Row, Col, Form, Button, InputGroup, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faLocationPin, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import moment from 'moment';
import { DatePicker, Popover, AutoComplete } from 'antd';
import { createSearchParams, useNavigate } from "react-router-dom";
import { API_URL } from '../Variables';

const { RangePicker } = DatePicker;

const SearchForm = () => {
    const navigate = useNavigate();
    const disabledDate = (current) => {
        return current && current < moment().startOf('day');
    };
    const [options, setOptions] = useState({
        travelers: 2,
        rooms: 1
    });
    const [destination, setDestination] = useState("");
    const [destinationOptions, setDestinationOptions] = useState([]);
    const [dates, setDates] = useState({
        from: new Date(),
        to: moment(new Date()).add(1, 'days')
    });

    useEffect(() => {
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


    const handleOptions = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev, [name]: operation === "+" ? options[name] + 1 : options[name] - 1
            }
        })
    };


    const handleSearch = () => {
        navigate({
            pathname: "/houses",
            search: `?${createSearchParams({
                destination: destination,
                from: moment(dates.from).format('MM/DD/YYYY'),
                to: moment(dates.to).format('MM/DD/YYYY'),
                travelers: options.travelers,
                rooms: options.rooms
            })}`
        })
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
                <Row className="align-items-center my-5 bg-white p-2 rounded">
                    <Col lg className='py-2'>
                        <InputGroup className='atypik-input'>
                            <InputGroup.Text className='icon'><FontAwesomeIcon icon={faLocationPin} /></InputGroup.Text>
                            {/* <Form.Control className='input'
                                placeholder="Destination" onChange={(e) => setDestination(e.target.value)}
                            /> */}
                            <AutoComplete
                                className='form-control input border-0'
                                options={destinationOptions}
                                onSelect={(e) => setDestination(e)}
                                filterOption={(inputValue, option) =>
                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                                placeholder="Destination"
                            />
                        </InputGroup>
                    </Col>
                    <Col lg className='py-2'>
                        <div className='atypik-input form-control py-0'>
                            <div className='w-100 d-flex align-items-center' style={{ height: "36px" }}>
                                <div className="icon"><FontAwesomeIcon icon={faCalendarDays} /></div>
                                <RangePicker
                                    disabledDate={disabledDate}
                                    onChange={(d) => setDates({ from: d[0].toDate(), to: d[1].toDate() })}
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
                        <Button variant="atypik" className="w-100" onClick={handleSearch}>Rerchercher</Button>
                    </Col>

                </Row>

            </Container>
        </Container >
    )
}

export default SearchForm