import React from 'react'
import '../assets/css/CardHouse.css';
import { Button, Card, Alert, Form, Modal, Row } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import { useState } from 'react';
import { API_URL } from '../Variables';
import { Spin } from 'antd';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const RegisterModal = props => {
    let navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [valid, setValid] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState('Something went wrong.');
    const [loading, setLoading] = useState(false);
    const [pwMessage, setPwMessage] = useState('Merci de remplir ce champ.');
    const [isInvalid, setIsInvalid] = useState({
        firstname: false,
        lastname: false,
        email: false,
        birthday: false,
        password: false,
        passwordc: false,
    })

    const [isValid, setIsValid] = useState({
        firstname: false,
        lastname: false,
        email: false,
        birthday: false,
        password: false,
        passwordc: false,
    })

    const [pwInput, setpwInput] = useState({
        password: '',
        passwordc: ''
    })

    const handleSubmit = async (event) => {
        setLoading(true);
        setValidated(true);
        const form = event.currentTarget;
        event.preventDefault();
        setValidated(true);
        let firstname = form.firstname.value;
        let lastname = form.lastname.value;
        let email = form.email.value;
        let birthday = form.birthday.value;
        let number = form.number.value;
        let password = form.password.value;
        const response = await register({
            firstname, lastname, email, birthday, number, password,
        });
        if ('email' in response) {
            fetch(API_URL + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: email, password: password })
            })
                .then((res) => res.json())
                .then(data => {
                    if ('token' in data) {
                        Cookies.set('token', data['token'], { expires: 1 })
                        Cookies.set('user', JSON.stringify(data['data']), { expires: 1 })
                        onClose(true);
                        setLoading(false);
                        navigate(0)
                    }
                })

            //window.location.href = "/";

        } else {
            setAlertMessage(response['hydra:description'])
            setAlertShow(true);
            setLoading(false);
        }

    };

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
        setValid(isValid.firstname && isValid.lastname && isValid.email && isValid.birthday && isValid.password && isValid.passwordc);
        setpwInput({ ...pwInput, [e.target.name]: e.target.value.trim() });
        verifyPassword(e);
    }

    async function register(data) {
        return fetch(API_URL + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(data => data.json())
    }

    const verifyPassword = (evnt) => {
        const field = evnt.target.name;
        if (field === 'password') {
            let errMsg = "";
            if (evnt.target.value.trim().length === 0) {
                errMsg = "Merci de remplir ce champ.";
            } else if (!/(?=.*?[A-Z])/.test(evnt.target.value.trim())) {
                errMsg = "At least one Uppercase";
            } else if (!/(?=.*?[a-z])/.test(evnt.target.value.trim())) {
                errMsg = "At least one Lowercase";
            } else if (!/(?=.*?[0-9])/.test(evnt.target.value.trim())) {
                errMsg = "At least one digit";
            } else if (!/(?=.*?[#?!@$%^&*-])/.test(evnt.target.value.trim())) {
                errMsg = "At least one Special Characters";
            } else if (!/.{8,}/.test(evnt.target.value.trim())) {
                errMsg = "At least minumum 8 characters";
            } else {
                errMsg = "";
            }
            if (errMsg != "") {
                setIsInvalid({ ...isInvalid, ['password']: true });
                setIsValid({ ...isValid, ['password']: false });
            } else {
                setIsInvalid({ ...isInvalid, ['password']: false });
                setIsValid({ ...isValid, ['password']: true });
            }
            setPwMessage(errMsg)
        }
        if (field === "passwordc" || (field === "password" && pwInput.passwordc.length > 0)) {
            if (pwInput.password !== pwInput.passwordc) {
                setIsInvalid({ ...isInvalid, ['passwordc']: true });
                setIsValid({ ...isValid, ['passwordc']: false });
            } else {
                setIsInvalid({ ...isInvalid, ['passwordc']: false });
                setIsValid({ ...isValid, ['passwordc']: true });
            }
        }
    }

    const { show, onClose } = props;
    return (
        <Modal show={show} onHide={onClose} centered
        >
            <Modal.Header closeButton>
                <Modal.Title >Inscription</Modal.Title>
            </Modal.Header>
            {/* <h3 className='text-center p-3'>Connexion</h3> */}
            <Spin spinning={loading}>
                <Modal.Body>
                    <Form className='px-3 pt-3' noValidate validated={validated} onSubmit={handleSubmit}>
                        {alertShow ? <Alert
                            className='mb-3 border-0'
                            variant='danger'
                        >{alertMessage}</Alert> : ''}
                        <Form.Group className="mb-3">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control type="text" placeholder="Votre prénom" required
                                isInvalid={isInvalid.firstname}
                                isValid={isValid.firstname}
                                name="firstname"
                                onChange={onInputChange}
                                onBlur={onInputChange} />
                            <Form.Control.Feedback type="invalid">
                                Merci de remplir ce champ.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control type="text" placeholder="Votre nom" required
                                isInvalid={isInvalid.lastname}
                                isValid={isValid.lastname}
                                name="lastname"
                                onChange={onInputChange}
                                onBlur={onInputChange} />
                            <Form.Control.Feedback type="invalid">
                                Merci de remplir ce champ.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Votre email address" required
                                isInvalid={isInvalid.email}
                                isValid={isValid.email}
                                name="email"
                                onChange={onInputChange}
                                onBlur={onInputChange} />
                            <Form.Control.Feedback type="invalid">
                                Merci de renseigner une adresse mail valide.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Numéro de téléphone</Form.Label>
                            <PhoneInput
                                country={'fr'}
                                inputClass="py-2 w-100"
                                specialLabel=''
                                inputProps={{
                                    name: 'number',
                                    required: true
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Merci de remplir ce champ.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date de naissance</Form.Label>
                            <Form.Control type="date" placeholder="" required
                                isInvalid={isInvalid.birthday}
                                isValid={isValid.birthday}
                                name="birthday"
                                onChange={onInputChange}
                                onBlur={onInputChange} />
                            <Form.Control.Feedback type="invalid">
                                Merci de remplir ce champ.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="Votre mot de passe" required
                                isInvalid={isInvalid.password}
                                isValid={isValid.password}
                                name="password"
                                onChange={onInputChange}
                                onKeyUp={verifyPassword}
                                onBlur={onInputChange}
                                value={pwInput.password} />
                            <Form.Control.Feedback type="invalid">
                                {pwMessage}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Confirmation du mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="Confirmation du mot de passe" required
                                isInvalid={isInvalid.passwordc}
                                isValid={isValid.passwordc}
                                name="passwordc"
                                onChange={onInputChange}
                                onKeyUp={verifyPassword}
                                onBlur={onInputChange}
                                value={pwInput.passwordc} />
                            <Form.Control.Feedback type="invalid">
                                Ces mots de passe ne correspondent pas.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className='text-center mb-5'>
                            <Button
                                variant="atypik"
                                className='w-50 d-flex mx-auto justify-content-center'
                                type="submit"
                                disabled={!valid}>
                                Inscription
                            </Button>
                        </div>

                    </Form>

                </Modal.Body>
            </Spin>
        </Modal>
    )
}

export default RegisterModal