import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import AppNavbar from '../components/Navbar'

const ConditionGeneral = () => {
    return (
        <div>
            <AppNavbar />
            <Container className='pt-4'>
                <Row className='text-center'>
                    <h2 className='atypik-cur-title m-0 px-2 text-uppercase'>Cgv / cgu</h2>
                </Row>
                <Row className='py-4'>
                    <Col sm={12} md={12} lg={12}>
                        <h4 className='text-atypik'>Conditions générales d’utilisation et de vente</h4>
                        <p className='fs-6'>Les informations publiées sur le site sont sous la seule responsabilité des propriétaires et ne
                            sont pas garanties par AtypikHouse, qui ne peut être tenu pour responsable de la précision ou
                            de la véracité des annonces.</p>
                        <div className="list-group my-5">
                            <a className="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Propriétaires et locataires</h5>
                                </div>
                                <p>Vous êtes seuls responsables de conduire vos propres investigations concernant toutes
                                    réclamations faites par les locataires ou les propriétaires. Vous assumez toutes
                                    responsabilités pour l’usage de toutes informations trouvées sur le site AtypikHouse.</p>
                            </a>
                            <a className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Propriétaires et locataires</h5>
                                </div>
                                <p>Vous êtes seuls responsables de conduire vos propres investigations concernant toutes
                                    réclamations faites par les locataires ou les propriétaires. Vous assumez toutes
                                    responsabilités pour l’usage de toutes informations trouvées sur le site AtypikHouse.</p>
                            </a>
                            <a className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Propriétaires et gestionnaires</h5>
                                </div>
                                <p>Nous essayons de vous fournir des informations exactes, mais nous ne garantissons pas
                                    l’exactitude et l’exhaustivité des informations ni leur mise à jour. Ainsi, nous déclinons
                                    toute responsabilité en cas de dommage résultant de l’utilisation de ces informations et
                                    des documents disponibles sur AtypikHouse.com.
                                    AtypikHouse.com est par principe accessible 24/24h, et 7/7j. Toutefois nous ne
                                    garantissons pas que AtypikHouse.com fonctionnera sans erreur ou sans interruption. En
                                    particulier, AtypikHouse.com et/ou les services pourront être momentanément
                                    interrompus pour cause de maintenance, de mise à jour ou d’améliorations techniques,
                                    ou pour en faire évoluer le contenu et/ou la présentation.
                                    AtypikHouse.com pourra également ne pas être accessible pour cas de force majeure.
                                    Etant de fait soumis à une obligation de moyens, nous ne saurions être tenus responsable
                                    de tout dommage ou perte occasionnée, quelle qu’en soit la nature, résultant d’une indisponibilité de AtypikHouse.com. Nous ne saurions être tenus responsable d’éventuels
                                    actes de piratage.
                                    Les informations suivantes concernent les titulaires des annonces publiées
                                    par AypikHouse: Si vous souhaitez retirer votre propriété du site, vous pouvez le faire
                                    directement via votre espace propriétaire ou bien en nous contactant.
                                </p>
                            </a>
                            <a className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Plainte des locataires</h5>
                                </div>
                                <p>AtypikHouse se réserve le droit de supprimer une annonce du site si, par exemple, des
                                    plaintes sont reçues de locataires ou pour tout autre motif à sa discrétion.</p>
                            </a>
                            <a className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Ventes des biens et services</h5>
                                </div>
                                <p>Les services que nous offrons comprennent : <br />
                                    • Location d’hébergement insolite <br />
                                    Les services liés à ce document sont les services qui sont affichés sur notre site au
                                    moment où vous y accédez. Toutes les informations, descriptions ou images que nous
                                    fournissons sur nos services sont décrites et présentées avec précision. Cependant, nous
                                    ne sommes pas légalement tenus par ces informations, descriptions ou images car nous
                                    ne pouvons pas garantir
                                    l’exactitude de chaque produit ou service que nous fournissons.</p>
                            </a>
                            <a className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Modalités de paiement</h5>
                                </div>
                                <p>Nous acceptons les modes de paiement suivants sur ce site : <br />
                                    • Carte bleue <br />
                                    • Paypal <br />
                                    En fournissant vos informations de paiement, vous confirmez que vous nous autorisez à
                                    facturer le montant dû lors de votre réservation. Si nous estimons que votre paiement a
                                    violé une loi ou l’une de nos conditions d’utilisation, nous nous réservons le droit
                                    d’annuler votre transaction.</p>
                            </a>
                            <a className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Modalités d’annulation ou de remboursement</h5>
                                </div>
                                <p>Pour chaque bien proposé en location, il y a un délai d’annulation fixé par le propriétaire.
                                    Pendant ce délai, vous pouvez annuler votre réservation à tout moment sans frais
                                    supplémentaires. Passé ce délai, en cas d’annulation vous ne serez pas remboursé.</p>
                            </a>
                            <a className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Lois applicables</h5>
                                </div>
                                <p>Ce document est soumis aux lois applicables en France et vise à se conformer à ses règles
                                    et règlements nécessaires. Cela inclut la réglementation à l’échelle de l’Union Européenne
                                    énoncée dans le RGPD (Règlement général sur la protection des données).</p>
                            </a>
                            <a className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-2 text-atypik">Limitation de responsabilité</h5>
                                </div>
                                <p>En cas de problème survenu lors de l’utilisation de notre site, la responsabilité reviendra à
                                    AtypikHouse, à condition que cela ne relève pas d’une utilisation inappropriée, illégale ou
                                    contraire à nos conditions d’utilisation. En cas de violation de nos conditions d’utilisation,
                                    AtypikHouse ne sera pas tenu pour responsable.
                                    La société AtypikHouse ne pourra être tenue responsable des dommages directs et
                                    indirects causés au matériel du visiteur, lors de l’accès au site, ou résultant de l’utilisation
                                    d’un matériel défectueux ou encore de l’apparition d’un bug ou d’une incompatibilité.
                                    En tant qu’utilisateur, en acceptant nos conditions générales d’utilisation et de vente, en
                                    connaissance de cause et sans aucune réserve, vous déchargez la société AtypikHouse de
                                    toute responsabilité, cause d’action, dommage ou dépense découlant de votre utilisation
                                    de ce site ou de votre violation de l’une des dispositions énoncées ci-dessus.</p>
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default ConditionGeneral