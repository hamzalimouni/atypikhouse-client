import React, { useEffect } from 'react'
import { Accordion, Container, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import AppNavbar from '../components/Navbar'

const Faq = () => {

    useEffect(() => {
        document.title = "Les questions fréquentes - AtypikHouse";
    }, []);

    return (
        <div>
            <AppNavbar />
            <Container className='py-4'>
                <Row className='text-center mb-4'>
                    <h2 className='atypik-cur-title m-0 px-2 text-uppercase'>Faq</h2>
                </Row>
                <Row>
                    <p className='fs-6'>Envie de vous lancer dans l’aventure AtypikHouse ? Ou besoin de réponses concernant votre prochain séjour chez nous ? Nous vous avons listés les questions les plus posées dans notre FAQ. <br />
                        Au cas où votre question ne serait pas listée ci-dessous, n’hésitez pas à nous en faire part en nous contactant via le formulaire de contact.</p>
                    <h2 className='text-atypik mt-3 mb-3'>Nos réponses à vos questions</h2>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header >Facturez-vous des frais pour vos services ?</Accordion.Header>
                            <Accordion.Body>
                                Non, atypikhouse.com ne facture aucun frais pour ses services. Notre service est entièrement gratuit et nous n'ajouterons à votre hébergement aucun frais supplémentaire pour notre service.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>J'ai fait une réservation mais je n'ai reçu aucune confirmation. Que devrais-je faire?</Accordion.Header>
                            <Accordion.Body>
                                Avant de finaliser votre réservation, veuillez vérifier votre adresse e-mail car une erreur dans l'adresse e-mail est la raison la plus courante pour laquelle nos clients ne reçoivent pas leurs confirmations. Dans certains cas, nos e-mails peuvent également se retrouver dans le "dossier spam", veuillez donc le vérifier également. Dans tous les cas, veuillez essayer de nous contacter par e-mail car nous serons très heureux de vous aider et de résoudre le problème dans les plus brefs délais.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2" >
                            <Accordion.Header>Pourquoi avez-vous besoin des détails de ma carte de crédit pour les réservations ?</Accordion.Header>
                            <Accordion.Body>
                                atypikhouse.com agit comme intermédiaire entre nos clients et les hôtels. Les détails de votre carte de crédit sont exigés par les hôtels dans la plupart des cas comme garantie de votre réservation en cas d'annulation tardive ou de « non-présentation ». Les hôtels ont le droit d'effectuer une préautorisation de votre carte de crédit, veuillez donc vous assurer que votre carte de crédit est valide. Veuillez également noter que si vous réservez une chambre non remboursable, ce type de chambre a des conditions particulières et votre carte de crédit sera débitée à l'avance. Veuillez toujours vérifier les conditions de paiement et d'annulation de la chambre qui vous intéresse avant de procéder à la réservation.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3" >
                            <Accordion.Header> À propos de votre réservation?</Accordion.Header>
                            <Accordion.Body>
                                Les détails de votre réservation sont disponibles sur votre compte. Vous pouvez accéder à votre compte via notre site Web pour afficher les informations de réservation, notamment : Les coordonnées de l’hôte La politique d’annulation associée à votre réservation L’adresse de l’hébergement Les dispositifs de sécurité de l’hébergement, tels que les instructions pour le Wi-Fi, les informations d’accès et les codes de porte. Remarque : les codes de porte et les informations d’accès sont généralement disponibles 3 jours avant l’arrivée. Vous recevrez un e-mail de notre part 3 jours avant votre arrivée, contenant les informations fournies par l’hôte. Si votre date d’arrivée est prévue dans les 3 jours suivant le moment de la réservation, ce message sera envoyé une fois que vous aurez reçu l’e-mail de confirmation de votre réservation. Si un hôte ne nous a pas fourni ces détails, utilisez votre compte AtypikHouse pour le contacter.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4" >
                            <Accordion.Header> À propos des remboursements?</Accordion.Header>
                            <Accordion.Body>
                                Le remboursement est basé sur la politique d'annulation de la propriété. Si vous annulez votre réservation et que vous êtes dans la période de remboursement intégral, les frais de service vous seront remboursés automatiquement lorsque l'annulation sera confirmée. Les remboursements prennent jusqu'à 5 jours ouvrés pour apparaître sur votre compte. Si une réservation a été facturée dans une devise différente, les totaux de paiement et de remboursement peuvent varier en fonction des taux de change et des frais de change de la banque. Votre remboursement sera versé sur le moyen de paiement d'origine. Si ce compte est fermé, veuillez contacter votre institution financière.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default Faq