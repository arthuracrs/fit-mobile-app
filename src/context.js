import { createContext, useState } from "react";

import { auth } from './firebaseConfig'

export const GeneralStateContext = createContext({});

export const GeneralStateProvider = (props) => {
    
    const [userData, setUserData] = useState(null)
    const [currentSchedule, setCurrentSchedule] = useState({})
    
    const [shouldLoadCurrentSchedule, setShouldLoadCurrentSchedule] = useState(false)

    const contextData = {
        userData,
        setUserData,
        currentSchedule,
        setCurrentSchedule,
        shouldLoadCurrentSchedule,
        setShouldLoadCurrentSchedule,
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

