import React, { useEffect } from 'react'
import { Container, Image } from 'react-bootstrap'
import Footer from '../components/Footer'
import AppNavbar from '../components/Navbar'
import notFoundImage from '../assets/img/notfound.svg'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

    let navigate = useNavigate()
    useEffect(() => {
        document.title = "Page non trouvée - AtypikHouse";
    }, []);

    return (
        <div>
            <AppNavbar />
            <div className="py-4">
                <Container>
                    <Container className='text-center mt-5'>
                        <Image src={notFoundImage} height={300}></Image>
                        <h2 className='mt-5'>Page non trouvée</h2>
                        <div role='button' onClick={() => navigate('/')} >Le lien que vous avez suivi est peut-être rompu. Cliquez ici pour retourner à la page d'accueil</div>
                    </Container>
                </Container>
            </div>
            <Footer />
        </div>
    )
}

export default NotFound