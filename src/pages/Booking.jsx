import * as Icons from '@fortawesome/free-solid-svg-icons'
import * as Brands from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { Button as Btn, Col, Container, Image, Row, Form, FloatingLabel } from 'react-bootstrap'
import AppNavbar from '../components/Navbar'
import Footer from '../components/Footer'
import { DatePicker, Badge, Avatar, Spin, Divider, Skeleton, Tag, message } from 'antd';
import Moment from 'moment';
import { useNavigate, useParams, useLocation, createSearchParams } from "react-router-dom";
import { API_URL, MEDIA_URL } from '../Variables';
import notFoundImage from '../assets/img/notfound.svg'
import Cookies from 'js-cookie'
import axios from "axios";
import LoginModal from '../components/LoginModal';
import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_631m0AfxKfhX0g5eGHVmynE8006o5Rg39s', { locale: 'fr' });

const Paiment = () => {

    useEffect(() => {
        document.title = "Réserver - AtypikHouse";
    }, []);

    let stripe, elements;
    const location = useLocation()
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search)
    const { RangePicker } = DatePicker;
    const { id } = useParams()
    const [showLogin, setShowLogin] = useState(false);
    const [found, setfound] = useState(true);
    const [houseData, setHouseData] = useState([])
    const [loading, setLoading] = useState(true);
    const [loadingPayment, setLoadingPayment] = useState(true);
    const [indisponible, setIndisponible] = useState([])
    const [thumbnail, setThumbnail] = useState([])
    const [errorMessage, setErrorMessage] = useState(null);
    const [messageContent, setMessageContent] = useState(null);
    const [stripeClientSecret, setStripeClientSecret] = useState(null)
    const [options, setOptions] = useState({
        house: parseInt(id),
        from: params.get("from") || new Moment(),
        to: params.get("to") || new Moment().add(1, 'days'),
        travelers: parseInt(params.get("travelers")) || 1,
        total: 0
    })


    useEffect(() => {
        getHouse()

    }, []);

    useEffect(() => {
        if (options.total > 0) {
            axios({
                url: API_URL + '/stripe/client_secret',
                method: "POST",
                data: JSON.stringify({
                    amount: Math.round(options.total * 100)
                }),
            })
                .then((result) => {
                    console.log(result.data)
                    setStripeClientSecret(result.data.client_secret)
                    setLoadingPayment(false)
                })
                .catch(err => {
                    console.log(err.response.status)
                })
        }
    }, [options.total])

    useEffect(() => {
        navigate({
            pathname: "/houses/" + id + '/booking',
            search: `?${createSearchParams({
                from: Moment(options.from).format('MM/DD/YYYY'),
                to: Moment(options.to).format('MM/DD/YYYY'),
                travelers: options.travelers,
            })}`
        })
    }, [options]);

    const disabledDate = (current) => {
        let index = indisponible.findIndex(date => date === Moment(current).format('YYYY-MM-DD'))
        return (index > -1 && true) || (current && current < Moment().startOf('day'));
    }

    const getHouse = async () => {
        setLoading(true)
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
                    data.disponibilities.map((d) => setIndisponible((indisponible) => [...indisponible, Moment(d.date).format('YYYY-MM-DD')]))
                    setHouseData(data)
                    setLoading(false)
                    setOptions({ ...options, total: data.price * Moment(options.to).diff(options.from, 'days') })
                    setThumbnail(MEDIA_URL + data?.images[0]?.fileName)
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



    const InitStripe = () => {
        stripe = useStripe();
        elements = useElements();
    }

    const onBookHouse = async (e) => {
        e.preventDefault();

        if (Cookies.get('user')) {

            let isDispo = true;
            indisponible.map((i) => {
                if (Moment(i).isBetween(Moment(options.from).format('MM/DD/YYYY'), Moment(options.to).format('MM/DD/YYYY'))) {
                    isDispo = false;
                    return;
                }
            })
            if (isDispo) {
                console.log("PAYMENT...")
                setLoadingPayment(true)

                if (!stripe || !elements) {
                    setErrorMessage('Une erreur est survenue, veuillez réessayer plus tard.')
                    setLoadingPayment(false)
                    return;
                }
                stripe
                    .confirmCardPayment(stripeClientSecret, {
                        payment_method: {
                            card: elements?.getElement(CardNumberElement)
                        }
                    })
                    .then(function (result) {
                        if (result.error) {
                            // Show error to your customer
                            // console.log();
                            setErrorMessage(result.error.message)
                            setLoadingPayment(false);
                        } else {
                            // The payment succeeded!
                            bookHouse()
                        }
                    });

            } else {
                setErrorMessage('L\'habitat n\'est pas disponible aux dates sélectionnées.')
            }



        } else {
            setShowLogin(true)
        }
    }

    async function bookHouse() {

        let formData = new FormData();

        formData.append('house', options.house)
        formData.append('total', options.total)
        formData.append('from', Moment(options.from))
        formData.append('to', Moment(options.to))
        formData.append('travelers', options.travelers)

        return axios({
            url: API_URL + '/reservations',
            method: "POST",
            headers: {
                authorization: 'bearer ' + Cookies.get("token"),
            },
            data: formData,
        })
            .then((result) => {
                if (messageContent) {
                    fetch(API_URL + '/messages', {
                        method: 'POST',
                        headers: {
                            'Authorization': 'bearer ' + Cookies.get("token"),
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            receiver: { id: houseData.owner.id },
                            content: messageContent
                        })
                    })
                        .then(data => data.json())
                        .then(res => {
                            if ('id' in result.data) {
                                navigate('/account/reservation/' + result.data.id)
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            if ('id' in result.data) {
                                navigate('/account/reservation/' + result.data.id)
                            }
                        });
                } else {
                    navigate('/account/reservation/' + result.data.id)
                }
            })
            .catch(err => {
                setErrorMessage('Une erreur est survenue, veuillez nous contacter.')
                setLoadingPayment(false);
            })


    }

    return (
        <div>
            <AppNavbar />
            <Container className='my-5'>
                {!found ?
                    <Container className='text-center mt-5'>
                        <Image src={notFoundImage} height={300}></Image>
                        <h2 className='mt-5'>Annonce non trouvée</h2>
                        <a>Le lien que vous avez suivi est peut-être rompu ou l'annonce a été supprimée ou bien en cours de révision</a>
                    </Container>
                    :
                    <Row>
                        <Skeleton loading={loading} paragraph={{ rows: 10 }} active >
                            <Col className='mx-5 border rounded'>
                                <div className="border-bottom text-center p-3">
                                    <h1 className='fs-2 m-0'>Réservation</h1>
                                    {/* <small>Confirmée sous 24h par votre hôte</small> */}
                                </div>
                                <div className="p-5 pb-1">
                                    <Divider orientation='left'><h3>Voyage</h3></Divider>

                                    <Row className='my-5'>
                                        <Col>
                                            <RangePicker
                                                disabledDate={disabledDate}
                                                defaultValue={[Moment(options.from), Moment(options.to)]}
                                                onChange={(d) => {
                                                    setOptions({ ...options, from: d[0].toDate(), to: d[1].toDate(), total: houseData.price * Moment(d[1].toDate()).diff(d[0].toDate(), 'days') + 15 })
                                                }}
                                                style={{ border: '1px solid #f0f0f0', padding: 19, borderRadius: 10 }}
                                                placeholder={["Date d'arrivé", "Date de départ"]}
                                                suffixIcon=""
                                                separator={<FontAwesomeIcon icon={Icons.faArrowRight} color="#cecece" />} />
                                        </Col>
                                        <Col>
                                            <div style={{ border: '1px solid #f0f0f0', padding: 14, borderRadius: 10, height: 62 }}>
                                                <div className="d-flex justify-content-around align-items-center">
                                                    <span>
                                                        Voyageurs
                                                    </span>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <Btn variant="atypik" size="sm" style={{ width: "35px" }}
                                                            onClick={() => {
                                                                setOptions({ ...options, travelers: options.travelers - 1 })
                                                            }}
                                                            disabled={options.travelers <= 1}>-</Btn>
                                                        <Badge bg="light" text="dark" className='mx-2'>
                                                            {options.travelers}
                                                        </Badge>
                                                        <Btn variant="atypik" size="sm" style={{ width: "35px" }}
                                                            onClick={() => {
                                                                setOptions({ ...options, travelers: options.travelers + 1 })
                                                            }}
                                                            disabled={options.travelers > houseData.nbPerson - 1}>+</Btn>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="px-5 pb-5 ">
                                    <Divider orientation='left'><h3>Message</h3></Divider>
                                    <div className='ms-3'>
                                        <p className=''>N’hésitez pas à dire un mot à l'hébergeur au sujet de votre réservation.</p>
                                        <div className='d-flex align-items-center'>
                                            <Avatar style={{ backgroundColor: '#F97316', verticalAlign: 'middle' }} size="large" className='me-2'>
                                                {houseData.owner?.firstname.charAt(0) + houseData.owner?.lastname.charAt(0)}
                                            </Avatar>
                                            <div className=''>
                                                <strong className='m-0'>{houseData.owner?.firstname + ' ' + houseData.owner?.lastname}</strong> · <small>{houseData.owner?.address && (houseData.owner?.address?.city + ', ' + houseData.owner?.address?.country)}</small>
                                            </div>
                                        </div>

                                        <FloatingLabel label="Votre message" className='mt-3'>
                                            <Form.Control
                                                as="textarea"
                                                placeholder="Votre message"
                                                onChange={(e) => setMessageContent(e.target.value)}
                                                value={messageContent}
                                                name="message"
                                                style={{ height: '150px' }}
                                                required
                                            />
                                        </FloatingLabel>
                                    </div>

                                </div>
                                <form onSubmit={onBookHouse}>
                                    <div className="px-5 pb-5 text-center">
                                        <Divider orientation='left'><h3>Paiement</h3></Divider>
                                        {errorMessage && <Tag color="error" className='p-2 fs-6 mb-3'>{errorMessage}</Tag>}
                                        <span className='d-flex align-items-center justify-content-center'>
                                            <FontAwesomeIcon icon={Icons.faLock} color="#cecece" className='me-2' size='1x' />
                                            Paiement sécurisé avec
                                            <FontAwesomeIcon icon={Brands.faCcVisa} color="#cecece" className='mx-2' size='2x' />
                                            <FontAwesomeIcon icon={Brands.faCcMastercard} color="#cecece" className='me-2' size='2x' />
                                        </span>
                                        <Spin spinning={loadingPayment}>
                                            {
                                                stripeClientSecret && (

                                                    <Col md={6} className='ms-3 mt-3 mx-md-auto'>
                                                        <Elements stripe={stripePromise} options={{
                                                            clientSecret: stripeClientSecret,
                                                        }}>
                                                            {/* <CardElement onReady={el => setCard(el)} /> */}
                                                            <CardNumberElement className='form-control py-2' />
                                                            <Row className='mt-2'>
                                                                <Col>
                                                                    <CardExpiryElement className='form-control py-2' />
                                                                </Col>
                                                                <Col>
                                                                    <CardCvcElement className='form-control py-2' />
                                                                </Col>
                                                            </Row>
                                                            <InitStripe />
                                                        </Elements>
                                                    </Col>
                                                )
                                            }
                                        </Spin>

                                        {/* <Col md={6} className='ms-3'>
                                            <FloatingLabel label="Nom complet" className='my-3'>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Titre"
                                                    name="title"
                                                    required />
                                            </FloatingLabel>
                                            <InputMask mask="9999-9999-9999-9999" maskChar="_" onChange={(e) => setCc(e.value)}>
                                                {() =>
                                                    <FloatingLabel label="Numéro de carte" className='my-3'>
                                                        <Form.Control
                                                            value={cc}
                                                            type="text"
                                                            placeholder="Titre"
                                                            name="title"
                                                            required />
                                                    </FloatingLabel>
                                                }
                                            </InputMask>
                                            <Row>
                                                <Col>
                                                    <InputMask mask="99/99" maskChar="_" onChange={(e) => setExpiration(e.value)}>
                                                        {() =>
                                                            <FloatingLabel label="Date d'expiration">
                                                                <Form.Control
                                                                    value={expiration}
                                                                    type="text"
                                                                    placeholder="Titre"
                                                                    name="title"
                                                                    required />
                                                            </FloatingLabel>
                                                        }
                                                    </InputMask>
                                                </Col>
                                                <Col>
                                                    <InputMask mask="9999" maskChar=" " onChange={(e) => setCvv(e.value)}>
                                                        {() =>
                                                            <FloatingLabel label="Cryptogramme">
                                                                <Form.Control
                                                                    value={cvv}
                                                                    type="text"
                                                                    placeholder="Titre"
                                                                    name="title"
                                                                    required />
                                                            </FloatingLabel>
                                                        }
                                                    </InputMask>
                                                </Col>
                                            </Row>
                                        </Col> */}
                                    </div>
                                    <div className="px-5 pb-5 ">
                                        {/* <Divider orientation='left'><h3>Confirmation</h3></Divider> */}
                                        <div className='text-center'>
                                            {/* onClick={() => bookHouse()} */}
                                            <button disabled={loadingPayment} type='submit' style={{ border: 'none' }} className='w-50 mb-3 btn btn-atypik atypik'>Payer et réserver</button><br />
                                            <small>En cliquant sur le bouton ci-dessus, j’accepte les conditions générales de vente et
                                                d’utilisation de AtypikHouse et j’envoie ma demande pour de très belles vacances,
                                                équitables et responsables !
                                            </small>
                                        </div>
                                    </div>
                                </form>
                            </Col>
                            <Col sm={12} md={6} lg={4} className='border rounded sticky-top h-100 p-5'>
                                <Image src={thumbnail} height={250} width='100%' style={{ objectFit: 'cover', borderRadius: 20 }} />
                                <h4 className='p-2 text-center'>{houseData.title}</h4>
                                <Divider />
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
                                    <strong>{options.total} €</strong>
                                </div>
                            </Col>
                        </Skeleton>
                    </Row>
                }
            </Container>
            <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
            <Footer />
        </div>
    )
}

export default Paiment