import React, { Component } from 'react'
import { GoogleLogout } from 'react-google-login'

const client_id = "253144225575-s1bjpvji0j3qh3m6sv8daknic2tvu07f.apps.googleusercontent.com"

function Logout({setIsLoggedIn}) {
    const onSuccess = () => {
        console.log('Logout Success');
        localStorage.removeItem('token')
        setIsLoggedIn(false)
    };

    return(
        <div>
            <GoogleLogout
                clientId={client_id}
                buttonText='Logout'
                onLogoutSuccess={onSuccess}
            >
            </GoogleLogout>
        </div>
    );
}

export default Logout;