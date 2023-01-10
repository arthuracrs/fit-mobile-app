import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, TouchableOpacity } from 'react-native';
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
            exercise: formContextData.exercise,
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

    const fields = {
        description: () => {
            return (
                <View key={'description'} style={styles.input}>
                    <Text style={{
                        marginBottom: 10,
                        fontSize: 18
                    }}>description:</Text>
                    <TextInput
                        style={{
                            borderWidth: 2,
                            borderColor: 'gray',
                            padding: 15,
                            borderRadius: 10,
                            backgroundColor: 'white',
                            marginHorizontal: 10
                        }}
                        onChangeText={text => {
                            formContextData.setExercise(x => ({ ...x, description: text }))
                        }}
                        multiline={true}
                        numberOfLines={5}
                        value={formContextData.exercise.description}
                        defaultValue={"" + formContextData.exerciseModel.description}
                        placeholder="Digite aqui a descrição"
                    />
                </View>)
        },
        series: () => {
            return (
                <View key={'series'} style={styles.input}>
                    <Text style={{
                        marginBottom: 10,
                        fontSize: 18
                    }}>series:</Text>
                    <TextInput

                        style={{
                            borderWidth: 2,
                            borderColor: 'gray',
                            padding: 15,
                            borderRadius: 10,
                            backgroundColor: 'white',
                            marginHorizontal: 10
                        }}
                        onChangeText={text => {
                            formContextData.setExercise(x => ({ ...x, series: text }))
                        }}
                        keyboardType='numeric'
                        defaultValue={formContextData.exerciseModel.series.toString()}
                        value={formContextData.exercise.series}
                        placeholder="Digite aqui a series"
                    />
                </View>)
        },
        repetitions: () => {
            return (
                <View key={'repetitions'} style={styles.input}>
                    <Text style={{
                        marginBottom: 10,
                        fontSize: 18
                    }}>repetitions:</Text>
                    <TextInput
                        style={{
                            borderWidth: 2,
                            borderColor: 'gray',
                            padding: 15,
                            borderRadius: 10,
                            backgroundColor: 'white',
                            marginHorizontal: 10
                        }}
                        onChangeText={text => {
                            formContextData.setExercise(x => ({ ...x, repetitions: text }))
                        }}
                        keyboardType='numeric'
                        value={formContextData.exercise.repetitions}
                        defaultValue={formContextData.exerciseModel.repetitions.toString()}
                        placeholder={"Digite aqui a repetitions" + formContextData.exerciseModel.repetitions}
                    />
                </View>)
        },
        interval: () => {
            return (
                <View key={'interval'} style={styles.input}>
                    <Text style={{
                        marginBottom: 10,
                        fontSize: 18
                    }}>interval:</Text>
                    <TextInput
                        style={{
                            borderWidth: 2,
                            borderColor: 'gray',
                            padding: 15,
                            borderRadius: 10,
                            backgroundColor: 'white',
                            marginHorizontal: 10
                        }}
                        onChangeText={text => {
                            formContextData.setExercise(x => ({ ...x, interval: text }))
                        }}
                        keyboardType='numeric'
                        value={formContextData.exercise.interval}
                        defaultValue={formContextData.exerciseModel.interval.toString()}
                        placeholder="Digite aqui a interval"
                    />
                </View>)
        },
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{t("TrainerNewExerciseFormScreen.exerciseModel")}: </Text>
                    <Text style={styles.name}>{exerciseModel?.name ? exerciseModel.name : t("TrainerNewExerciseFormScreen.empty")}</Text>
                    <Button
                        style={styles.button}
                        title={t("TrainerNewExerciseFormScreen.selectModel")}
                        onPress={() => navigation.navigate('ExerciseModelsCategoriesList')}
                    />
                </View>
                {exerciseModel?.changeableAttributes &&
                    exerciseModel.changeableAttributes.map(
                        fieldName => fields[fieldName]()
                    )}
                <View style={styles.submit}>
                    < Button
                        disabled={exerciseModel?.name ? false : true}
                        title={t("TrainerNewExerciseFormScreen.addNewExercise")}
                        onPress={submit}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        padding: 30,
        flexDirection: 'column'
    },
    input: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    button: {
        borderWidth: 2,
        padding: 15,
        borderRadius: 10,
        marginBottom: 20
    },
    submit: {
        marginVertical: 30,
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