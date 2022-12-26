import { createContext, useState } from "react";

export const NewExerciseFormStateContext = createContext({});

export const NewExerciseFormStateProvider = (props) => {

    const [exerciseModel, setExerciseModel] = useState({})

    const contextData = {
        exerciseModel,
        setExerciseModel
    }

    return (
        <NewExerciseFormStateContext.Provider value={contextData}>
            {props.children}
        </NewExerciseFormStateContext.Provider>
    )
}

