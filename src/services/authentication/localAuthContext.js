import { createContext, useState } from "react";
import axios from "axios";
import { CONSTANTS } from '../../consts'

const loginServiceUrl = CONSTANTS.AUTHSERVICE_URL
// const loginServiceUrl = 'http://144.22.204.203:3000'
// const loginServiceUrl = 'http://meuloru.com:3001'

export const AuthenticationContext = createContext({});

export const AuthenticationProvider = (props) => {

    const [token, setToken] = useState(null)
    const [authenticateduser, setAuthenticateduser] = useState(null)
    const [userCredentials, setUserCredentials] = useState({})

    const SignIn = async ({ email, password }) => {
        try {
            const token = (await axios.post(`${loginServiceUrl}/login`, { email, password })).data.token
            if (token.error == undefined) {
                setToken(token)
                setUserCredentials({ email, password })
            }
        } catch (error) {
            console.log(error)
            return { error: error.response.data.error }

        }
    }

    const GetToken = async () => {
        const token = (await axios.post(`${loginServiceUrl}/login`, { email: userCredentials })).data.token
        setUserCredentials({ email, password })

        return token
    }

    const GetAuthUser = async () => {
        const user = (await axios.post(`${loginServiceUrl}/validate`, {}, {
            headers: {
                authtoken: token
            }
        })).data
        setAuthenticateduser(user)
    }

    const SignUp = async ({ email, password }) => {
        const responseBody = (await axios.post(`${loginServiceUrl}/register`, { email, password })).data

        return responseBody
    }

    const SignOut = () => {
        console.log('SignOut')
        setToken(null)
    }

    const contextData = {
        SignIn,
        SignUp,
        token,
        GetAuthUser,
        SignOut,
        authenticateduser,
        GetToken,
    }

    return (
        <AuthenticationContext.Provider value={contextData}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}

