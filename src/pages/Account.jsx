import React from 'react'
import { useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Navbar from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import Footer from '../components/Footer';
import { API_URL } from '../Variables';
import { Skeleton } from 'antd';
import Cookies from 'js-cookie';
import { format } from 'date-fns';
import countries from "i18n-iso-countries";
import { Spin } from 'antd';

import { useNavigate } from "react-router-dom";

const Account = () => {

    useEffect(() => {
        document.title = "Mon compte - AtypikHouse";
    }, []);

    useEffect(() => {
        document.title = "Mon compte - Atypikhouse"
        fetch(API_URL + '/me', {
            headers: new Headers({
                'Authorization': 'bearer ' + Cookies.get("token"),
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(false);
                    console.log(error)
                }
            )
    }, []);
    const [isEdit, setIsEdit] = useState(false);
    const [isPwEdit, setPwIsEdit] = useState(false);
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
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
                                    <Skeleton loading={!isLoaded} active={!isLoaded} paragraph={false}><p>{items['firstname']}</p></Skeleton>
                                </div>
                                <div className='px-lg-5'>
                                    <strong>Nom</strong>
                                    <Skeleton loading={!isLoaded} active={!isLoaded} paragraph={false}><p>{items['lastname']}</p></Skeleton>
                                </div>
                                <div className='px-lg-5'>
                                    <strong>Email</strong>
                                    <Skeleton loading={!isLoaded} active={!isLoaded} paragraph={false}><p>{items['email']}</p></Skeleton>
                                </div>
                                <div className='px-lg-5'>
                                    <strong>Téléphone</strong>
                                    <Skeleton loading={!isLoaded} active={!isLoaded} paragraph={false}><p>{items['number']}</p></Skeleton>
                                </div>
                                <div className='px-lg-5'>
                                    <strong>Date de naissance</strong>
                                    <Skeleton loading={!isLoaded} active={!isLoaded} paragraph={false}>
                                        <p>
                                            {/* {items['birthday']} */}
                                            {format(new Date(items['birthday'] ? items['birthday'] : '02/11/22'), 'dd/MM/yyyy')}
                                        </p>
                                    </Skeleton>
                                </div>
                                <div className='px-lg-5'>
                                    <strong>Adresse</strong>
                                    <Skeleton loading={!isLoaded} active={!isLoaded} paragraph={false}>
                                        <p>{
                                            items['address'] ?
                                                items['address']['address'] + ', ' +
                                                items['address']['zipcode'] + ' ' +
                                                items['address']['city'] + ', ' +
                                                items['address']['country']
                                                :
                                                'Adresse non renseigné'
                                        }</p>


                                    </Skeleton>

                                    {/* <p>11 AV AUGUSTE RODIN, 94350 VILLIERS-SUR-MARNE, FRANCE</p> */}
                                </div></div> : <EditProfile items={items} />}

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
                            <div className='mt-5 px-5'><EditPassword items={items}/></div> : ''}
                    </div>
                </div>
            </Container >
            <Footer />
        </div >



    )
}

async function edit(data) {
    //console.log(data)
    return fetch(API_URL + '/users/' + data.id + '/update', {
        method: 'PATCH',
        headers: {
            'Authorization': 'bearer ' + Cookies.get("token"),
            'Content-Type': 'application/merge-patch+json'
        },
        body: JSON.stringify(data)
    })
        .then(data => data.json())
}

const EditProfile = (items) => {
    let navigate = useNavigate();

    countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);

    const [editAddress, setEditAddress] = useState({
        address: items.items['address'] ? items.items['address']['address'] : '',
        city: items.items['address'] ? items.items['address']['city'] : '',
        zipcode: items.items['address'] ? items.items['address']['zipcode'] : '',
        country: items.items['address'] ? items.items['address']['country'] : '',
    })
    const [editInfo, setEditInfo] = useState({
        id: items.items['id'],
        firstname: items.items['firstname'],
        lastname: items.items['lastname'],
        email: items.items['email'],
        number: items.items['number'],
        birthday: format(new Date(items.items['birthday'] ? items.items['birthday'] : '02/11/22'), 'yyyy-MM-dd'),
        address: editAddress,
    });

    const handleChange = (e) => {
        setEditInfo({ ...editInfo, [e.target.name]: e.target.value });
    };
    const handleChangeAddress = (e) => {
        setEditAddress({ ...editAddress, [e.target.name]: e.target.value });
        setEditInfo({ ...editInfo, ['address']: editAddress });
    };
    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        setValidated(true);
        const response = await edit(editInfo);
        if ('email' in response) {
            window.location.reload();
        } else {
            console.log("ERR")
        }
        setLoading(false);
    };
    const countryArr = Object.entries(countries.getNames("fr", { select: "official" })).map(([key, value]) => {
        return {
            label: value,
            value: key
        };
    });
    return (<Spin spinning={loading}><Form className='px-3 pt-3' noValidate validated={validated} onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
            <Form.Label>Prénom</Form.Label>
            <Form.Control type="text" placeholder="Votre prénom" required
                value={editInfo.firstname}
                onChange={e => handleChange(e)}
                name="firstname" />
            <Form.Control.Feedback type="invalid">
                Merci de remplir ce champ.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" placeholder="Votre nom" required
                value={editInfo.lastname}
                onChange={e => handleChange(e)}
                name="lastname" />
            <Form.Control.Feedback type="invalid">
                Merci de remplir ce champ.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Votre email address" required
                value={editInfo.email}
                onChange={e => handleChange(e)}
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
                onChange={value => setEditInfo({ ...editInfo, number: value })}
                value={editInfo.number}
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
                value={editInfo.birthday}
                onChange={e => handleChange(e)}
                name="birthday" />
            <Form.Control.Feedback type="invalid">
                Merci de remplir ce champ.
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Pays/région</Form.Label>
            <Form.Select
                required
                aria-label=""
                name="country"
                value={editAddress.country}
                onChange={e => handleChangeAddress(e)}
                onBlur={e => handleChangeAddress(e)}
            >
                <option></option>
                {!!countryArr?.length &&
                    countryArr.map(({ label, value }) => (
                        <option value={label}>{label}</option>
                    ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                Merci de remplir ce champ.
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Adresse</Form.Label>
            <Form.Control type="text" placeholder="" required
                value={editAddress.address}
                onChange={e => handleChangeAddress(e)}
                onBlur={e => handleChangeAddress(e)}
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
                        value={editAddress.city}
                        onChange={e => handleChangeAddress(e)}
                        onBlur={e => handleChangeAddress(e)}
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
                        value={editAddress.zipcode}
                        onChange={e => handleChangeAddress(e)}
                        onBlur={e => handleChangeAddress(e)}
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

    </Form></Spin>)
}

const EditPassword = (items) => {
    const [validated, setValidated] = useState(false);
    const [pwMessage, setPwMessage] = useState('Merci de remplir ce champ.');
    const [loading, setLoading] = useState(false);
    const [isInvalid, setIsInvalid] = useState({
        password: false,
        passwordc: false,
    })

    const [isValid, setIsValid] = useState({
        password: false,
        passwordc: false,
    })

    const [pwInput, setpwInput] = useState({
        id: items.items['id'],
        password: '',
        passwordc: ''
    })

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        setValidated(true);
        const response = await edit(pwInput);
        if ('email' in response) {
            window.location.reload();
        } else {
            console.log("ERR")
        }
        setLoading(false);
    }

    const onInputChange = e => {
        setpwInput({ ...pwInput, [e.target.name]: e.target.value.trim() });
        verifyPassword(e);
    }

    const verifyPassword = (evnt) => {
        setValidated(isValid['password'] && isValid['passwordc']);
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
    return (<Spin spinning={loading}><Form className='px-3 pt-3' noValidate validated={validated} onSubmit={handleSubmit}>
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
                disabled={!validated}
                type="submit">
                Changer le mot de passe
            </Button>
        </div>

    </Form></Spin>)
}

export default Account