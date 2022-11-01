import React from 'react'
import '../assets/css/CardHouse.css';
import { Button, Card, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';

const LoginModal = props => {
    const { show, onClose } = props;
    const [validated, setValidated] = useState(false);
    const [valid, setValid] = useState(false);
    const [isInvalid, setIsInvalid] = useState({
        email: false,
        password: false,
    })

    const [isValid, setIsValid] = useState({
        email: false,
        password: false,
    })

    const handleSubmit = (event) => {
        setValidated(true);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
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
        setValid(isValid.email && isValid.password);

    }
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title >Connexion</Modal.Title>
            </Modal.Header>
            {/* <h3 className='text-center p-3'>Connexion</h3> */}
            <Modal.Body>
                <Form className='px-3 pt-3' noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Votre email address" name="email" required
                            isInvalid={isInvalid.email}
                            isValid={isValid.email}
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
        </Modal>
    )
}

export default LoginModal