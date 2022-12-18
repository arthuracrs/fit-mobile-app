import { createContext, useState } from "react";

import { auth } from './firebaseConfig'

export const GeneralStateContext = createContext({});

export const GeneralStateProvider = (props) => {
    const [updateRequireAuthRoutes, setUpdateRequireAuthRoutes] = useState(false)
    const [userData, setUserData] = useState(null)

    const handleUpdateRequireAuthRoutes = () => {
        setUpdateRequireAuthRoutes(!updateRequireAuthRoutes)
    }

    const contextData = {
        handleUpdateRequireAuthRoutes,
        updateRequireAuthRoutes,
        userData,
        setUserData,
        firebase: {
            auth
        }
    }

    return (
        <GeneralStateContext.Provider value={contextData}>
            {props.children}
        </GeneralStateContext.Provider>
    )
}

