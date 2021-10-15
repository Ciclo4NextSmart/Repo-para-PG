import React from "react";
import {useAuth0} from '@auth0/auth0-react'
import './LoginTest.css'


export function LoginTest(){
    const {loginWithRedirect} = useAuth0()

    return(
        <button className='loginBtn' onClick={() => loginWithRedirect()}>Login</button>
    )
}