import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'

const client_id = "253144225575-s1bjpvji0j3qh3m6sv8daknic2tvu07f.apps.googleusercontent.com"

function Login({setIsLoggedIn}){

    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj)
        axios({
            method: "POST",
            url: "http://localhost:3000/auth/googleLogin",
            data: {
                tokenId:res.tokenId
            }
        }).then(response => {
            console.log('Google auth success: ', response)
            localStorage.setItem('token', response.data.token)
            if(response.data.token != undefined){
                setIsLoggedIn(true)
                console.log(localStorage.getItem('token'))
            }
        })
    };

    const onFailure = (res) => {
        console.log('[Login failed] res:', res)
    };

    return(
        <div>
            
            <GoogleLogin
                clientId={client_id}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{marginTop:'100px'}}
                isSignedIn={true}
            >

            </GoogleLogin>
        </div>
    )
}


export default Login;
