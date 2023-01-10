import React, { useState } from 'react'
import Cookies from 'js-cookie';

function CookieBanner() {

    const [isAccepted, setIsAccepted] = useState(Cookies.get('cookies_accepted'));

    return (
        <>
            {!isAccepted && <div className='position-fixed bg-blue w-100 text-center py-2' style={{ zIndex: 999, bottom: 0 }}>
                <p className='text-white'>
                    Ce site utilise des cookies strictement nécessaires pour améliorer votre visite et pour recueillir des statistiques de navigation.</p>
                <button type="button" onClick={() => { Cookies.set('cookies_accepted', true); setIsAccepted(true) }}>Accepter</button>
                <button type="button" onClick={() => { setIsAccepted(false) }}>Réfuser</button>
            </div>}
        </>
    )
}

export default CookieBanner;