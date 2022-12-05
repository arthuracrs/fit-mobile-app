import { createContext, useState } from "react";

import { auth } from './firebaseConfig'
 
export const GeneralStateContext = createContext({});

export const GeneralStateProvider = (props) => {
    const [updateRequireAuthRoutes, setUpdateRequireAuthRoutes] = useState(false)

    const updateFom = () => {
        setUpdateRequireAuthRoutes(!updateRequireAuthRoutes)
    }

    const contextData = {
        updateFom,
        text: 'kkk',
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

