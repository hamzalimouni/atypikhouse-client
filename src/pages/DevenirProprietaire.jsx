import React, { useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Footer from '../components/Footer'
import AppNavbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import bg from '../assets/img/hotebg.jpeg'
import { Alert, Steps, Spin, Tag } from 'antd'
import Cookies from 'js-cookie'
import LoginModal from '../components/LoginModal'
import RegisterModal from '../components/RegisterModal'
import { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { API_URL } from '../Variables'

const DevenirProprietaire = () => {

    const { Step } = Steps;
    let curUser = Cookies.get('user');
    let navigate = useNavigate()

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [submited, isSubmited] = useState(false);
    const [refused, isRefused] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = "Devenir propriétaire - AtypikHouse";
        if (curUser) {
            setLoading(true)
            fetch(API_URL + '/owner_requests?user.id=' + JSON.parse(curUser)?.id, {
                headers: {
                    'Authorization': 'bearer ' + Cookies.get("token"),
                }
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result['hydra:totalItems'] > 0) {
                            isSubmited(true)
                            console.log(result['hydra:member'][0])
                            if (result['hydra:member'][0]?.status === "REFUSED") {
                                isRefused(true)
                            } else {
                                navigate('/')
                            }
                        }
                        setLoading(false);
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
    }, []);

    const sendRequest = (e) => {
        e.preventDefault()
        setLoading(true);
        fetch(API_URL + '/owner_requests', {
            method: 'POST',
            headers: {
                'Authorization': 'bearer ' + Cookies.get("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'user': {
                    'id': JSON.parse(curUser).id
                },
                'description': e.target.description.value,
                'procedures': e.target.procedures.value
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if ('id' in result) {
                        isSubmited(true)
                        setLoading(false)
                    }
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    return (
        <div>
            <AppNavbar />
            <Container fluid className='p-0 d-flex align-items-center justify-content-center' style={{
                height: 'calc(100vh - 75px)', backgroundImage: `url(${bg})`, backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }} >
                <Row className='p-0 m-0 align-items-center'>
                    <Col className='p-5'>
                        <h1 className='sbTitle'>Devenir propriétaire</h1>
                        <p className='fs-4 text-white'>
                            C'est gratuit, sans engagement. Nous proposons le même niveau de fonctionnalités que les grandes plateformes.
                            <br />Bref, rien à perdre, tout à gagner !
                        </p>
                    </Col>
                    <Col className='p-5'>
                        <Container className='bg-white p-3 px-5'>
                            {
                                curUser ? <>
                                    {submited ?
                                        <>
                                            {
                                                refused ?
                                                    <Alert
                                                        description="Nous sommes désolés de vous informer que votre demande pour devenir un propriétaire n'a pas été approuvée. Si vous souhaitez faire appel de cette décision, veuillez nous contacter pour vous fournir des informations supplémentaires."
                                                        type="error"
                                                        showIcon
                                                    />
                                                    :
                                                    <Alert
                                                        description="Votre demande a été envoyée avec succès et sera traitée dans les meilleurs delai."
                                                        type="success"
                                                        showIcon
                                                    />
                                            }
                                        </>
                                        :
                                        <>
                                            <center>
                                                <Tag color="success" className='p-2 my-3 mx-auto'>Vous êtes connecter en tant que : <strong>{curUser && JSON.parse(curUser).email}</strong></Tag>
                                            </center>
                                            <Spin spinning={loading}>


                                                <Form onSubmit={sendRequest}>
                                                    <Form.Group className='mb-3'>
                                                        <Form.Label>Un petit mot sur vous</Form.Label>
                                                        <textarea className='form-control' placeholder='Quelques mots sur qui vous êtes, vos passions, votre vision des choses... ce que vous voulez :)' name="description" rows="5" required></textarea>
                                                    </Form.Group>
                                                    <Form.Group className='mb-3'>
                                                        <Form.Label>Votre démarche environnementale</Form.Label>
                                                        <textarea className='form-control' placeholder='En quoi est-ce important pour vous ? Quels gestes avez vous mis en place ? Ou quelle est votre vision plus globalement !' name="procedures" rows="5" required></textarea>
                                                    </Form.Group>
                                                    <ReCAPTCHA
                                                        sitekey="6Lcef-sjAAAAANIurj3XedD2Sd824zWAI-wVv2Qy"
                                                        onChange={(v) => document.querySelector('#sendBtn').removeAttribute('disabled')}
                                                    />
                                                    <Form.Group className='d-flex justify-content-end mt-3'>
                                                        <Button variant="atypik" type='submit' disabled className='w-100' id="sendBtn">Envoyer votre demande</Button>
                                                    </Form.Group>

                                                </Form>
                                            </Spin>
                                        </>}
                                </> :
                                    <p className='py-5 pb-4 fs-6'>Vous devez <strong role='button' onClick={() => setShowLogin(true)} className='text-atypik'>vous connecter</strong> pour faire la demande si vous n'avez pas de compte inscrivez vous par <strong role='button' onClick={() => setShowRegister(true)} className='text-atypik'>ici</strong></p>
                            }

                        </Container>
                    </Col>
                </Row>
                <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
                <RegisterModal show={showRegister} onClose={() => setShowRegister(false)} />
            </Container>
            {/* <Footer /> */}
        </div>
    )
}

export default DevenirProprietaire