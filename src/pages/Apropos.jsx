import { Breadcrumb } from 'antd'
import React, { useEffect } from 'react'
import { Accordion, Container, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import AppNavbar from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
const Apropos = () => {

    useEffect(() => {
        document.title = "Qui sommes-nous - AtypikHouse";
    }, []);

    return (
        <div>
            <AppNavbar />
            <Container className='py-4'>
                <Breadcrumb className='bg-light p-2 rounded-pill ps-4 mb-3'>
                    <Breadcrumb.Item href="/">
                        <FontAwesomeIcon icon={Icons.faHome} color="#767A82" className='pe-2' />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Qui sommes-nous</Breadcrumb.Item>
                </Breadcrumb>
                <Row className='text-center mb-4'>
                    <h2 className='atypik-cur-title m-0 px-2 text-uppercase'>Qui sommes-nous?</h2>
                </Row>
                <Row>
                    <p className='fs-6'>
                        AtypikHouse est une équipe passionnée d’experts de location en ligne et ayant pour mission : vous faire rêver dans des lieux totalement atypiques, dans des cadres idylliques et définitivement enchanteurs au cœur de nos belles régions françaises et européennes !
                        <br /><br />
                        Nous avons à notre actif plusieurs centaines de destinations à travers toute la France et ce chiffre ne cesse de croître de jour en jour.
                        Quand vous réservez sur AtypikHouse, vous vous permetterez de vivre un moment totalement magique et hors du temps. C'est ça la magie de l'insolite, vivre une expérience unique et non simplement une nuit.
                        La force d’AtypikHouse tient en cela ; une réelle passion, une connaissance parfaite du secteur, une équipe à votre écoute et bien évidemment des souvenirs inoubliables avec vos proches.
                        <br /><br />
                        Et oui c’est ça l’esprit AtypikHouse. Vous faire rêver dans un hébergement insolite, vous proposer une démarche expérientielle hors des sentiers battus !
                        Il ne s’agit pas juste de trouver un lieu où dormir, il s’agit de trouver un lieu qui sort de l’ordinaire où vivre une expérience inédite et susciter des émotions uniques !
                        <br /><br />
                        En plus, un hébergement insolite est un hébergement qui surprend, qui étonne, qui sort de l'ordinaire, qui donne envie de tenter l'aventure.
                        C'est en général un logement que l'on découvre pour la première fois, et qui amène de l'excitation avant même d'y aller.
                    </p>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default Apropos