import React from 'react'
import './Login.css';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { Button } from '@material-ui/core';
import { auth, provider } from "./firebase"
function Login() {
    const signIn = () =>{
        auth.signInWithPopup(provider).catch(err=>alert(err.message));
    };

    return (
        <div className="login">
            <div className="login__logo">
                <FingerprintIcon style={{ fontSize: 130 }}/>
                <h1>Message</h1>
            </div>
            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
