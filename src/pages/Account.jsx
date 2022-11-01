import React from 'react'
import { useEffect } from 'react';
import { Button, Col, Container, Form, Nav, Row } from 'react-bootstrap'
import Navbar from '../components/Navbar'
import { Radio, Space, Tabs } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import Footer from '../components/Footer';


const Account = () => {
    useEffect(() => {
        document.title = "Mon compte - Atypikhouse"
    }, []);
    const [isEdit, setIsEdit] = useState(false);
    const [isPwEdit, setPwIsEdit] = useState(false);

    return (
        <div>
            < Navbar />
            <Container className='mt-5'>
                <h2 className='text-center text-blue'><FontAwesomeIcon icon={Icons.faUserEdit} color="#0A2D74" /> Mon compte</h2>
                <div className='row justify-content-md-center mt-5'>
                    <div className='col col-lg-7'>
                        <div className="d-flex justify-content-between border-bottom">
                            <h5>Informations personnelles</h5>
                            <Button variant='flat' className='text-atypik p-0'
                                onClick={() => setIsEdit(!isEdit)}> {isEdit ? 'Annuler' : 'Modifier'}</Button>
                        </div>
                        <div className='mt-5 px-5'>

                            {!isEdit ? <div>
                                <div className='px-lg-5'>
                                    <strong>Prénom</strong>
                                    <p>Mohammed</p>
                                </div>
                                <div className='px-lg-5'>
                                    <strong>Nom</strong>
                                    <p>MOUDOU</p>
                                </div>
                                <div className='px-lg-5'>
                                    <strong>Email</strong>
                                    <p>MOUDOU Mohammed</p>
                                </div>
                                <div className='px-lg-5'>
                                    <strong>Téléphone</strong>
                                    <p>+33635586982</p>
                                </div>
                                <div className='px-lg-5'>
                                    <strong>Date de naissance</strong>
                                    <p>08/05/1998</p>
                                </div>
                                <div className='px-lg-5'>
                                    <strong>Address</strong>
                                    <p>11 AV AUGUSTE RODIN, 94350 VILLIERS-SUR-MARNE, FRANCE</p>
                                </div></div> : <EditProfile />}

                        </div>
                    </div>
                </div>
                <div className='row justify-content-md-center'>
                    <div className='col col-lg-7 mt-5'>
                        <div className="d-flex justify-content-between border-bottom">
                            <h5>Mot de passe</h5>
                            <Button variant='flat' className='text-atypik p-0'
                                onClick={() => setPwIsEdit(!isPwEdit)}> {isPwEdit ? 'Annuler' : 'Modifier'}</Button>
                        </div>
                        {isPwEdit ?
                            <div className='mt-5 px-5'><EditPassword /></div> : ''}
                    </div>
                </div>
            </Container >
            <Footer />
        </div >



    )
}

const EditProfile = () => {
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };
    return (<Form className='px-3 pt-3' noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>Prénom</Form.Label>
            <Form.Control type="text" placeholder="Votre prénom" required
                value="MOUDOU"
                name="firstname" />
            <Form.Control.Feedback type="invalid">
                Merci de remplir ce champ.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" placeholder="Votre nom" required
                name="lastname" />
            <Form.Control.Feedback type="invalid">
                Merci de remplir ce champ.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Votre email address" required
                name="email" />
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
                required
            />
            <Form.Control.Feedback type="invalid">
                Merci de remplir ce champ.
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Date de naissance</Form.Label>
            <Form.Control type="date" placeholder="" required
                name="birthday" />
            <Form.Control.Feedback type="invalid">
                Merci de remplir ce champ.
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Pays/région</Form.Label>
            <Form.Select required aria-label="">
                <option></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                Merci de remplir ce champ.
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Adresse</Form.Label>
            <Form.Control type="text" placeholder="" required
                name="address" />
            <Form.Control.Feedback type="invalid">
                Merci de remplir ce champ.
            </Form.Control.Feedback>
        </Form.Group>

        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Ville</Form.Label>
                    <Form.Control type="text" placeholder="" required
                        name="city" />
                    <Form.Control.Feedback type="invalid">
                        Merci de remplir ce champ.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Code postal</Form.Label>
                    <Form.Control type="text" placeholder="" required
                        name="zipcode" />
                    <Form.Control.Feedback type="invalid">
                        Merci de remplir ce champ.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>

        </Row>


        <div className='text-center mb-5 d-flex'>
            <Button
                variant="atypik"
                className='w-50 d-flex mx-auto justify-content-center'
                type="submit">
                Enregistrer
            </Button>
        </div>

    </Form>)
}

const EditPassword = () => {
    const [validated, setValidated] = useState(false);
    const [pwMessage, setPwMessage] = useState('Merci de remplir ce champ.');
    const [oldPwMessage, setOldPwMessage] = useState('Merci de remplir ce champ.');
    const [isInvalid, setIsInvalid] = useState({
        password: false,
        passwordc: false,
    })

    const [isValid, setIsValid] = useState({
        password: false,
        passwordc: false,
    })

    const [pwInput, setpwInput] = useState({
        password: '',
        passwordc: ''
    })
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };
    const onInputChange = e => {
        setpwInput({ ...pwInput, [e.target.name]: e.target.value.trim() });
        verifyPassword(e);
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
    return (<Form className='px-3 pt-3' noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>Mot de passe actuel</Form.Label>
            <Form.Control type="password" required
                name="oldpassword" />
            <Form.Control.Feedback type="invalid">
                Merci de remplir ce champ.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Nouveau mot de passe</Form.Label>
            <Form.Control type="password" required
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
            <Form.Control type="password" required
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
        <div className='text-center mb-5 d-flex'>
            <Button
                variant="atypik"
                className='w-50 d-flex mx-auto justify-content-center'
                type="submit">
                Enregistrer
            </Button>
        </div>

    </Form>)
}

export default Account