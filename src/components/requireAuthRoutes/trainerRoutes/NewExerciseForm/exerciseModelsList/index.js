import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useState, useContext, useEffect } from "react";
import axios from 'axios';

import Loading from "../../../../shared/loading";
import { GeneralStateContext } from '../../../../../context'
import { CONSTANTS } from '../../../../../consts'

import ExerciseModelItem from './exerciseModelItem'

export default function ExerciseModelsList({ navigation, route }) {

    const { scheduleId, workoutId } = route.params
    const contextData = useContext(GeneralStateContext);

    const [name, setName] = useState(false)
    const [exerciseModels, setExerciseModels] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const [retry, setRetry] = useState(true)
    const [errorloading, setErrorloading] = useState(false)

    const handleRetry = () => {
        setErrorloading(false)
        setIsLoading(true)
        setRetry(!retry)
    }

    const submit = async () => {
        const data = {
            "exerciseModelId": "4b92b590-64f7-4978-ac5b-aadd3376dd95",
            scheduleId, workoutId
        }

        contextData.firebase.auth.currentUser.getIdToken(true).then(token => {
            axios.post(`${CONSTANTS.BACKEND_URL}/exercise`, data, {
                headers: {
                    'authtoken': token,
                }
            })
                .then(function (response) {
                    console.log('NewExerciseForm | sucesso na criação de Workout')

                    contextData.setShouldLoadCurrentSchedule(x => !x)
                    navigation.goBack()
                    // const user = response.data
                    // contextData.setUserData(user)
                    // setIsLoading(false)
                })
                .catch(function (error) {
                    // setErrorloading(true)
                    console.log('NewExerciseForm | erro na criação de Workout')
                    console.log(error);
                })

        })
    }

    const getExerciseModels = async () => {
        contextData.firebase.auth.currentUser.getIdToken(true).then(token => {
            axios.get(`${CONSTANTS.BACKEND_URL}/exerciseModel`, {
                headers: {
                    'authtoken': token,
                }
            })
                .then(function (response) {
                    console.log('getExerciseModels | sucesso')
                    setExerciseModels(response.data.exerciseModels)
                    setIsLoading(false)
                })
                .catch(function (error) {
                    setErrorloading(true)
                    console.log('getExerciseModels | erro')
                    console.log(error);
                })
        })
    }

    useEffect(() => {
        getExerciseModels()
    }, [])

    return (
        <>
            {isLoading
                ? <Loading handleRetry={handleRetry} error={errorloading} />
                :
                <View style={styles.container}>
                    <FlatList
                        data={exerciseModels}
                        renderItem={ExerciseModelItem}
                        numColumns={2}
                        keyExtractor={item => item.exerciseModelId}
                    />
                </View>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    input: {
        borderWidth: 2,
        padding: 15,
        borderRadius: 10,
        marginBottom: 20
    },
    title: {
        fontSize: 25,
        fontWeight: '700',
        paddingBottom: 10,
        marginLeft: 10
    },
});
