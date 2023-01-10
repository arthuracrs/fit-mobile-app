import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useState, useContext, useEffect } from "react";
import axios from 'axios';


import { NewExerciseFormStateContext } from '../context'
import { GeneralStateContext } from '../../../../../context'
import { CONSTANTS } from '../../../../../consts'
import { Auth } from '../../../../../services/authentication'
import { apiCall } from '../../../../../services/apiCalls'

import Loading from "../../../../shared/loading";
import ExerciseModelCategoryItem from './exerciseModelCategoryItem'

export default function ExerciseModelsCategoriesList({ navigation, route }) {

    const contextData = useContext(GeneralStateContext);
    const authContext = useContext(Auth.AuthenticationContext);
    const formContextData = useContext(NewExerciseFormStateContext);

    const [exerciseModelsCategoriesList, setExerciseModelsCategoriesList] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const [retry, setRetry] = useState(true)
    const [errorloading, setErrorloading] = useState(false)

    const handleRetry = () => {
        setErrorloading(false)
        setIsLoading(true)
        setRetry(!retry)
    }

    useEffect(() => {
        apiCall.getExerciseModelsCategories(authContext.token)
            .then(function (response) {
                console.log('getExerciseModelsCategories | sucesso')
                setExerciseModelsCategoriesList(response.exerciseModelCategories)
                setIsLoading(false)
            })
            .catch(function (error) {
                setErrorloading(true)
                console.log('getExerciseModelsCategories | erro')
                console.log(error);
            })

    }, [])

    return (
        <>
            {isLoading
                ? <Loading handleRetry={handleRetry} error={errorloading} />
                :
                <View style={styles.container}>
                    <FlatList
                        data={exerciseModelsCategoriesList}
                        renderItem={
                            ({ item }) => <ExerciseModelCategoryItem
                                goToCategory={
                                    () => navigation.navigate('ExerciseModelsCategory',
                                        { exerciseModels: item.exerciseModelsList })}
                                item={item}
                            />}
                        numColumns={2}
                        keyExtractor={item => item.exerciseModelCategoryId}
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
