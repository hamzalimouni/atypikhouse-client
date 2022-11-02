import React from 'react'
import '../assets/css/CardHouse.css';
import { Button, Alert, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';
import { API_URL } from '../Variables';
import { Spin } from 'antd';
import Cookies from 'js-cookie'


const LoginModal = props => {
    const { show, onClose } = props;
    const [alertShow, setAlertShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [valid, setValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const [isInvalid, setIsInvalid] = useState({
        username: false,
        password: false,
    })

    const [isValid, setIsValid] = useState({
        username: false,
        password: false,
    })

    const handleSubmit = async (event) => {
        setLoading(true);
        const form = event.currentTarget;
        event.preventDefault();
        let username = form.username.value;
        let password = form.password.value;
        const response = await login({
            username,
            password
        });
        setLoading(false);
        if ('token' in response) {
            Cookies.set('token', response['token'], { expires: 1 })
            Cookies.set('user', JSON.stringify(response['data']), { expires: 1 })
            //window.location.href = "/";
            onClose(true);
        } else {
            setAlertShow(true);
        }
    };

    async function login(credentials) {
        return fetch(API_URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json())
    }

    const onInputChange = e => {
        const { name, value } = e.currentTarget
        let isv = e.currentTarget.checkValidity();
        setIsValid(prev => {
            return {
                ...prev, [name]: isv ? true : false
            }
        })
        setIsInvalid(prev => {
            return {
                ...prev, [name]: isv ? false : true
            }
        })
        setValid(isValid.username && isValid.password);

    }
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title >Connexion</Modal.Title>
            </Modal.Header>
            {/* <h3 className='text-center p-3'>Connexion</h3> */}
            <Spin spinning={loading}>
                <Modal.Body>
                    <Form className='px-3 pt-3' noValidate validated={validated} onSubmit={handleSubmit}>
                        {alertShow ? <Alert
                            className='mb-3 border-0'
                            variant='danger'
                        >Adresse email ou mot de passe incorrect</Alert> : ''}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Votre email address" name="username" required
                                isInvalid={isInvalid.username}
                                isValid={isValid.username}
                                onChange={onInputChange}
                                onBlur={onInputChange} />
                            <Form.Control.Feedback type="invalid">
                                Merci de renseigner une adresse mail valide.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="Votre mot de passe" name="password" required
                                isInvalid={isInvalid.password}
                                isValid={isValid.password}
                                onChange={onInputChange}
                                onBlur={onInputChange} />
                            <Form.Control.Feedback type="invalid">
                                Merci de remplir ce champ.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className='text-center'>
                            <Button variant="atypik" disabled={!valid} className='w-50 d-flex mx-auto justify-content-center' type="submit">
                                Se connecter
                            </Button>
                            <a href="#" className='text-atypik py-2 d-flex mx-auto justify-content-center'>Mot de passe oublié</a>
                        </div>

                        <Modal.Footer className='mt-4 mb-0'>
                            <a href="#"
                                className='text-atypik pt-3 d-flex mx-auto justify-content-center'
                                style={{ fontWeight: '600', fontSize: '1.2em' }}>
                                Créer un compte
                            </a>
                        </Modal.Footer>


                    </Form>

                </Modal.Body>
            </Spin>
        </Modal>
    )
}

export default LoginModal