import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const GeneralStateProvider = (props) => {
    
    const [userData, setUserData] = useState(null)

    const SetAuthStatus = async()=>{
         
    }

    const contextData = {
    userData
    }

    return (
        <GeneralStateContext.Provider value={contextData}>
            {props.children}
        </GeneralStateContext.Provider>
    )
}

