import { createContext, useState } from "react";

const loginServiceUrl = 'http://localhost:4001'

export const AuthenticationContext = createContext({});

export const AuthenticationProvider = (props) => {

    const [token, setToken] = useState(null)

    const SignIn = async ({ email, password }) => {
        const token = (await axios.post(`${loginServiceUrl}/login`, { email, password })).data.token
        setToken(token)
    }

    const SignOut = () => {
        setToken(null)
    }

    const contextData = {
        SignIn,
        token,
        SignOut
    }

    return (
        <AuthenticationContext.Provider value={contextData}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}

