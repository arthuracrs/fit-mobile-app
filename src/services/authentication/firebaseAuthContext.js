import { createContext, useState } from "react";

const loginServiceUrl = 'http://localhost:4001'

export const AuthenticationContext = createContext({});

export const AuthenticationProvider = (props) => {

    const [token, setToken] = useState(null)
    const [authenticateduser, setAuthenticateduser] = useState(null)

    const SignIn = async ({ email, password }) => {
        const token = (await axios.post(`${loginServiceUrl}/login`, { email, password })).data.token
        setToken(token)
    }

    const GetAuthUser = async () => {
        const user = (await axios.post(`${loginServiceUrl}/validate`, {}, {
            headers: {
                authtoken: token
            }
        })).data
        setAuthenticateduser(user)
    }

    const SignOut = () => {
        setAuthenticateduser(null)
    }

    const contextData = {
        SignIn,
        token,
        GetAuthUser,
        SignOut,
        authenticateduser
    }

    return (
        <AuthenticationContext.Provider value={contextData}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}

