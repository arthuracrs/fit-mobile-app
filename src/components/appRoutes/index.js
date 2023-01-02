import { useContext, useEffect, useState } from "react";

import AuthRoutes from "../authRoutes";
import Loading from "../shared/loading";
import RequireAuthRoutes from "../requireAuthRoutes";
import { Auth } from "../../services/authentication"

export const AppRoutes = () => {
    const authContext = useContext(Auth.AuthenticationContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (authContext.token !== null) {
            console.log('AppRoutes | autenticou')

            setIsLoading(false)
        } else {
            console.log('AppRoutes | falha em autenticar')

            setIsLoading(false)
        }
    }, [authContext.token])

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