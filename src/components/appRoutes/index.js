import { useContext, useEffect, useState } from "react";

import AuthRoutes from "../authRoutes";
import Loading from "../shared/loading";
import RequireAuthRoutes from "../requireAuthRoutes";
import { Auth } from "../../services/authentication"
import { apiCall } from "../../services/apiCalls"
import { GeneralStateContext } from '../../context'

export const AppRoutes = () => {
    const authContext = useContext(Auth.AuthenticationContext)
    const contextData = useContext(GeneralStateContext)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (authContext.token !== null) {
            console.log('AppRoutes | autenticou')
            apiCall.getUser(authContext.token)
                .then(user => {
                    setIsLoading(false)
                    contextData.setUserData(user)
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            console.log('AppRoutes | falha em autenticar')
            setIsLoading(false)
        }
    }, [authContext.token, contextData.shouldLoadCurrentSchedule])

    return (
        <>
            {isLoading ? <Loading /> :
                authContext.token ?
                    <RequireAuthRoutes />
                    : <AuthRoutes />
            }
        </>
    )
}