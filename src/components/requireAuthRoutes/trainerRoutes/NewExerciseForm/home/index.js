import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { NewExerciseFormStateContext } from '../context'
import { GeneralStateContext } from '../../../../../context'
import { CONSTANTS } from '../../../../../consts'
import { Auth } from '../../../../../services/authentication'
import { apiCall } from '../../../../../services/apiCalls'

export default Home = ({ navigation, route }) => {
    const { scheduleId, workoutId } = route.params
    const { t } = useTranslation();

    const formContextData = useContext(NewExerciseFormStateContext);
    const generalContextData = useContext(GeneralStateContext);
    const authContext = useContext(Auth.AuthenticationContext);

    const exerciseModel = formContextData.exerciseModel

    const submit = async () => {
        const data = {
            exerciseModelId: exerciseModel.exerciseModelId,
            scheduleId,
            workoutId
        }

        apiCall.createExecise(authContext.token, data).then(function (response) {
            console.log('NewExerciseForm | sucesso na criação de Exercise')

            generalContextData.setShouldLoadCurrentSchedule(x => !x)
            navigation.goBack()
        })
            .catch(function (error) {
                console.log('NewExerciseForm | erro na criação de Exercise')
                console.log(error);
            })
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{t("TrainerNewExerciseFormScreen.exerciseModel")}: </Text>
                <Text style={styles.name}>{exerciseModel?.name ? exerciseModel.name : t("TrainerNewExerciseFormScreen.empty") }</Text>
                <Button
                    style={styles.button}
                    title={t("TrainerNewExerciseFormScreen.selectModel")}
                    onPress={() => navigation.navigate('ExerciseModelsList')}
                />
            </View>
            <Button
                disabled={exerciseModel?.name ? false : true}
                style={styles.submit}
                title={t("TrainerNewExerciseFormScreen.addNewExercise")}
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