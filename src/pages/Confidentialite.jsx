import { Breadcrumb } from 'antd';
import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../components/Footer';
import AppNavbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';

const Confidentialite = () => {
    useEffect(() => {
        document.title = "Politique de confidentialité - Atypikhouse ";
    }, []);

    return (
        <div>
            <AppNavbar />
            <Container className='pt-4'>
                <Breadcrumb className='bg-light p-2 rounded-pill ps-4 mb-3'>
                    <Breadcrumb.Item href="/">
                        <FontAwesomeIcon icon={Icons.faHome} color="#767A82" className='pe-2' />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Politique de confidentialité</Breadcrumb.Item>
                </Breadcrumb>

                <Row className='text-center'>
                    <h2 className='atypik-cur-title m-0 px-2 text-uppercase'>Politique de confidentialité</h2>
                </Row>
                <Row className='py-4'>
                    <Col sm={12} md={12} lg={12}>
                        <div className="list-group my-5">
                            <a className="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Politique de confidentialité de Atypikhouse</h5>
                                </div>
                                <p>
                                    La présente Politique de confidentialité décrit la façon dont vos informations personnelles sont recueillies, utilisées et partagées lorsque vous vous rendez sur www.atypikhouse.com (le « Site ») ou que vous y effectuez un achat.
                                </p>
                            </a>
                            <a className="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Informations personnelles recueillies</h5>
                                </div>
                                <p>
                                    Lorsque vous vous rendez sur le Site, nous recueillons automatiquement certaines informations concernant votre appareil, notamment des informations sur votre navigateur web, votre adresse IP, votre fuseau horaire et certains des cookies qui sont installés sur votre appareil. En outre, lorsque vous parcourez le Site, nous recueillons des informations sur les pages web ou produits individuels que vous consultez, les sites web ou les termes de recherche qui vous ont permis d'arriver sur le Site, ainsi que des informations sur la manière dont vous interagissez avec le Site. Nous désignons ces informations collectées automatiquement sous l'appellation « Informations sur l'appareil ».
                                </p>
                            </a>
                            <a className="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Comment utilisons-nous vos informations personnelles ?</h5>
                                </div>
                                <p>
                                    En règle générale, nous utilisons les Informations sur la commande que nous recueillons pour traiter toute commande passée par le biais du Site (y compris pour traiter vos informations de paiement, organiser l'expédition de votre commande et vous fournir des factures et/ou des confirmations de commande).  En outre, nous utilisons ces Informations sur la commande pour :
                                    communiquer avec vous ;
                                    évaluer les fraudes ou risques potentiels ; et
                                    lorsque cela correspond aux préférences que vous nous avez communiquées, vous fournir des informations ou des publicités concernant nos produits ou services.
                                    Nous utilisons les Informations sur l'appareil (en particulier votre adresse IP) que nous recueillons pour évaluer les fraudes ou risques potentiels et, de manière plus générale, pour améliorer et optimiser notre Site (par exemple, en générant des analyses sur la façon dont nos clients parcourent et interagissent avec le Site, et pour évaluer la réussite de nos campagnes de publicité et de marketing).
                                </p>
                            </a>
                            <a className="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Partage de vos informations personnelles</h5>
                                </div>
                                <p>
                                    Enfin, il se peut que nous partagions aussi vos Informations personnelles pour respecter les lois et règlementations applicables, répondre à une assignation, à un mandat de perquisition ou à toute autre demande légale de renseignements que nous recevons, ou pour protéger nos droits.
                                </p>
                            </a>
                            <a className="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Publicité comportementale</h5>
                                </div>
                                <p>
                                    Comme indiqué ci-dessus, nous utilisons vos Informations personnelles pour vous proposer des publicités ciblées ou des messages de marketing qui, selon nous, pourraient vous intéresser.  Pour en savoir plus sur le fonctionnement de la publicité ciblée, vous pouvez consulter la page d'information de la Network Advertising Initiative (NAI) à l'adresse suivante : http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
                                </p>
                            </a>
                            <a className="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Ne pas suivre</h5>
                                </div>
                                <p>
                                    Veuillez noter que nous ne modifions pas la collecte de données de notre Site et nos pratiques d'utilisation lorsque nous détectons un signal « Ne pas suivre » sur votre navigateur.
                                </p>
                            </a>
                            <a className="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Vos droits</h5>
                                </div>
                                <p>
                                    Si vous êtes résident(e) européen(ne), vous disposez d'un droit d'accès aux informations personnelles que nous détenons à votre sujet et vous pouvez demander à ce qu'elles soient corrigées, mises à jour ou supprimées. Si vous souhaitez exercer ce droit, veuillez nous contacter au moyen des coordonnées précisées ci-dessous.
                                    Par ailleurs, si vous êtes résident(e) européen(ne), notez que nous traitons vos informations dans le but de remplir nos obligations contractuelles à votre égard (par exemple si vous passez une commande sur le Site) ou de poursuivre nos intérêts commerciaux légitimes, énumérés ci-dessus.  Veuillez également noter que vos informations seront transférées hors de l'Europe, y compris au Canada et aux États-Unis.
                                </p>
                            </a>
                            <a className="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Rétention des données</h5>
                                </div>
                                <p>
                                    Lorsque vous passez une commande par l'intermédiaire du Site, nous conservons les Informations sur votre commande dans nos dossiers, sauf si et jusqu'à ce que vous nous demandiez de les supprimer.
                                </p>
                            </a>
                            <a className="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Mineurs</h5>
                                </div>
                                <p>
                                    Le Site n'est pas destiné aux individus de moins de 16 ans.
                                </p>
                            </a>
                            <a className="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Changements</h5>
                                </div>
                                <p>
                                    Nous pouvons être amenés à modifier la présente politique de confidentialité de temps à autre afin d'y refléter, par exemple, les changements apportés à nos pratiques ou pour d'autres motifs opérationnels, juridiques ou réglementaires.
                                </p>
                            </a>
                            <a className="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Nous contacter</h5>
                                </div>
                                <p>
                                    Pour en savoir plus sur nos pratiques de confidentialité, si vous avez des questions ou si vous souhaitez déposer une réclamation, veuillez nous contacter par e-mail à contact@atypikhouse.com, ou par courrier à l'adresse suivante :
                                    1 Rue de l'Église, Pierrefonds, 60350, France
                                </p>
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default Confidentialite;