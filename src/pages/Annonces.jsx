import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Divider, Skeleton, Badge, Popconfirm, message, Empty } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie'
import { API_URL, MEDIA_URL } from '../Variables';
import { useNavigate } from 'react-router-dom';

const Annonces = () => {

    useEffect(() => {
        document.title = "Mes annonces - AtypikHouse";
    }, []);

    let navigate = useNavigate();
    let curUser = Cookies.get('user');
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getHouses()
    }, []);

    const getHouses = () => {
        fetch(API_URL + '/houses?owner.id=' + JSON.parse(curUser)['id'] + '&order[createdAt]=desc')
            .then(res => res.json())
            .then((result) => { setHouses(result["hydra:member"]); setLoading(false) })
    }

    return (
        <div>
            <Navbar />
            <Container className='mt-5'>
                <Divider><h2 className='text-center text-blue'>Mes annonces</h2></Divider>
                <Container>
                    <Skeleton loading={loading} paragraph={{ rows: 10 }} active >
                        {houses.length > 0 ? houses.map((h) => {
                            return <Badge.Ribbon text={
                                h.status == "UNDER_REVIEW" ? 'En cours de révision'
                                    : h.status == "APPROVED" ? 'Annonce approvée'
                                        : 'Annonce rejetée'
                            } placement='start' color={
                                h.status == "UNDER_REVIEW" ? 'gold'
                                    : h.status == "APPROVED" ? 'green'
                                        : 'red'
                            }>
                                <div className='mt-5 border shadow-sm p-sm-3 mx-0' >
                                    <div role='button' className='row mb-3 p-0 rounded' onClick={
                                        () => { window.open('../houses/' + h.id, '_blank') }
                                    }>
                                        <Col lg={3} className="px-2">
                                            <div style={{
                                                height: 214, width: '100%', backgroundImage: `url(${MEDIA_URL + h.images[0].fileName})`, backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                            }}></div>
                                        </Col>
                                        <Col lg={9} className="px-4">
                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <h2 className='m-0  searchItemTitle'>{h.title}</h2>
                                                <span className="rounded bg-atypik text-white float-right px-2" style={{ width: 'auto' }}>{h.category?.name}</span>
                                            </div>
                                            <small> <FontAwesomeIcon className='icon' icon={Icons.faLocationDot} color="#8ED081" /> {h.address?.city + ', ' + h.address?.country}</small>
                                            <p className='my-2 mr-3 annonceDescription'>{h.description}</p>
                                            <div className='d-flex justify-content-around border-top border-bottom py-2'>
                                                <div><FontAwesomeIcon icon={Icons.faUser} color="#767A82" className='pe-1' /> {h.travelers} personnes</div>
                                                <div><FontAwesomeIcon icon={Icons.faBed} color="#767A82" className='pe-1' /> {h.beds} lits</div>
                                                <div><FontAwesomeIcon icon={Icons.faDoorOpen} color="#767A82" className='pe-1' /> {h.rooms} pièces</div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-end px-3 py-3">
                                                <div>
                                                    {/* <FontAwesomeIcon icon={Icons.faStar} color="#F97316" className='pe-2' /> */}
                                                    {/* <span>{props.reviews}</span> */}
                                                </div>
                                                <span><strong className='text-bold text-atypik'>{h.price}€</strong> /nuit</span>
                                            </div>
                                        </Col>
                                    </div >
                                    <div className='d-flex justify-content-between'>
                                        <Button variant='flat' onClick={() => navigate('../houses/' + h.id + '/reservations')} className='text-warning btn-sm w-25'><FontAwesomeIcon icon={Icons.faReorder} />Réservations</Button>
                                        <Button variant='flat' onClick={() => navigate('../houses/' + h.id + '/edit')} className='text-primary btn-sm w-25'><FontAwesomeIcon icon={Icons.faEdit} /> Modifier</Button>
                                        <Popconfirm title="Voulez-vous vraiment supprimer cette annonce?" onConfirm={() =>
                                            fetch(API_URL + '/houses/' + h.id, {
                                                method: 'DELETE',
                                                headers: {
                                                    'Authorization': 'bearer ' + Cookies.get("token"),
                                                    'Content-Type': 'application/merge-patch+json'
                                                }
                                            })
                                                .then(
                                                    (result) => {
                                                        if (result.status == 204) {
                                                            message.success('L\'annonce à été supprimée avec succès');
                                                        } else {
                                                            message.error('Impossible de l\'annonce veuillez contacter l\'administration');
                                                        }
                                                        getHouses();
                                                    }
                                                )
                                        }>
                                            <Button variant='flat' className='text-danger btn-sm w-25'><FontAwesomeIcon icon={Icons.faTrash} /> Supprimer</Button>
                                        </Popconfirm>

                                    </div>
                                </div>
                            </Badge.Ribbon>
                        }) :
                            <div className='row justify-content-md-center mt-5'>
                                <Empty description="Aucune annonce publiée" />
                                <Button variant="atypik" className='mt-5 w-25 btn-sm' onClick={() => navigate('../houses/add')}>Publier votre première annonce</Button>
                            </div>
                        }
                    </Skeleton>
                </Container>

            </Container >
            <Footer />
        </div >
    )
}

export default Annonces