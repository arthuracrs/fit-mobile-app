import { createContext, useState } from "react";
import axios from "axios";
import { CONSTANTS } from '../../consts'

const loginServiceUrl = CONSTANTS.AUTHSERVICE_URL

export const AuthenticationContext = createContext({});

export const AuthenticationProvider = (props) => {

    const [token, setToken] = useState(null)

    const SignIn = async ({ email, password }) => {
        try {
            const token = (await axios.post(`${loginServiceUrl}/login`, { email, password })).data.token
            if (token.error == undefined) {
                setToken(token)
            }
        } catch (error) {
            console.log(error)
            return { error: error.response.data.error }
        }
    }

    const SignUp = async ({ email, password }) => {
        const responseBody = (await axios.post(`${loginServiceUrl}/register`, { email, password })).data
        const token = responseBody.token
        if (token.error == undefined) {
            setToken(token)
        }
    }

    const SignOut = () => {
        console.log('SignOut')
        setToken(null)
    }

    const contextData = {
        SignIn,
        SignUp,
        token,
        SignOut,
    }

    return (
        <AuthenticationContext.Provider value={contextData}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}

