import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useState, useContext, useEffect } from "react";
import axios from 'axios';


import { NewExerciseFormStateContext } from '../context'
import { GeneralStateContext } from '../../../../../context'
import { CONSTANTS } from '../../../../../consts'

import Loading from "../../../../shared/loading";
import ExerciseModelItem from './exerciseModelItem'

export default function ExerciseModelsList({ navigation, route }) {

    const contextData = useContext(GeneralStateContext);
    const formContextData = useContext(NewExerciseFormStateContext);

    const [exerciseModels, setExerciseModels] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const [retry, setRetry] = useState(true)
    const [errorloading, setErrorloading] = useState(false)

    const handleRetry = () => {
        setErrorloading(false)
        setIsLoading(true)
        setRetry(!retry)
    }

    useEffect(() => {
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
    }, [])

    return (
        <>
            {isLoading
                ? <Loading handleRetry={handleRetry} error={errorloading} />
                :
                <View style={styles.container}>
                    <FlatList
                        data={exerciseModels}
                        renderItem={({ item }) => <ExerciseModelItem goBack={() => navigation.goBack()} item={item} />}
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
