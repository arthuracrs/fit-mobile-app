import { createContext, useState } from "react";

export const NewExerciseFormStateContext = createContext({});

export const NewExerciseFormStateProvider = (props) => {

    const [exerciseModel, setExerciseModel] = useState({})
    const [exercise, setExercise] = useState({})

    const contextData = {
        exercise,
        setExercise,
        exerciseModel,
        setExerciseModel
    }

    return (
        <NewExerciseFormStateContext.Provider value={contextData}>
            {props.children}
        </NewExerciseFormStateContext.Provider>
    )
}

