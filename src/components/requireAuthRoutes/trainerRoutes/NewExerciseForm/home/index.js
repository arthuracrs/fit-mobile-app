import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useState, useContext, useEffect } from "react";
import axios from 'axios';

import { NewExerciseFormStateContext } from '../context'
import { GeneralStateContext } from '../../../../../context'
import { CONSTANTS } from '../../../../../consts'

export default Home = ({ navigation, route }) => {
    const { scheduleId, workoutId } = route.params

    const formContextData = useContext(NewExerciseFormStateContext);
    const generalContextData = useContext(GeneralStateContext);

    const exerciseModel = formContextData.exerciseModel

    const submit = async () => {
        const data = {
            exerciseModelId: exerciseModel.exerciseModelId,
            scheduleId,
            workoutId
        }
        console.log(data)
        generalContextData.firebase.auth.currentUser.getIdToken(true).then(token => {
            axios.post(`${CONSTANTS.BACKEND_URL}/exercise`, data, {
                headers: {
                    'authtoken': token,
                }
            })
                .then(function (response) {
                    console.log('NewExerciseForm | sucesso na criação de Exercise')

                    generalContextData.setShouldLoadCurrentSchedule(x => !x)
                    navigation.goBack()

                    // setIsLoading(false)
                })
                .catch(function (error) {
                    // setErrorloading(true)
                    console.log('NewExerciseForm | erro na criação de Exercise')
                    console.log(error);
                })

        })
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Exercise Model: </Text>
                <Text style={styles.name}>{exerciseModel?.name ? exerciseModel.name : 'empty'}</Text>
                <Button
                    style={styles.button}
                    title="Select Model"
                    onPress={() => navigation.navigate('ExerciseModelsList')}
                />
            </View>
            <Button
                disabled={exerciseModel?.name ? false : true}
                style={styles.submit}
                title="Add New Exercise"
                onPress={submit}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        padding: 30,
        flexDirection: 'column'
    },
    button: {
        borderWidth: 2,
        padding: 15,
        borderRadius: 10,
        marginBottom: 20
    },
    submit: {
        marginTop: 30,
        borderWidth: 2,
        padding: 15,
        borderRadius: 10,
        marginBottom: 20
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        paddingBottom: 10,
    },
    name: {
        fontSize: 20,
        paddingBottom: 20,
        marginLeft: 20
    },
});