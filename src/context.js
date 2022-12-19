import { createContext, useState } from "react";

import { auth } from './firebaseConfig'

export const GeneralStateContext = createContext({});

export const GeneralStateProvider = (props) => {
    const [updateRequireAuthRoutes, setUpdateRequireAuthRoutes] = useState(false)
    const [userData, setUserData] = useState(null)
    const [shouldLoadCurrentSchedule, setShouldLoadCurrentSchedule] = useState(false)

    const [currentSchedule, setCurrentSchedule] = useState([])

    const handleUpdateRequireAuthRoutes = () => {
        setUpdateRequireAuthRoutes(!updateRequireAuthRoutes)
    }

    const update = () => setShouldLoadCurrentSchedule(!shouldLoadCurrentSchedule)

    const updateCurrentSchedule = (data) => setCurrentSchedule(data)

    const contextData = {
        handleUpdateRequireAuthRoutes,
        updateRequireAuthRoutes,
        userData,
        setUserData,
        shouldLoadCurrentSchedule,
        currentSchedule,
        updateCurrentSchedule,
        setCurrentSchedule,
        update,
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

