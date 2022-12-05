import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button } from "react-native";
import { useState, useContext } from "react";
import { useNavigation } from '@react-navigation/native';
import { GeneralStateContext } from '../../context'

import { CONSTANTS } from '../../consts'

export default function TypeOfAccountScreen({ navigation, route }) {
    const contextData = useContext(GeneralStateContext);

    const handleSelection = async (type) => {
        const auth = contextData.firebase.auth
        const token = await auth.currentUser.getIdToken(true)
        fetch(`${CONSTANTS.BACKEND_URL}/` + type, {
            method: 'POST',
            headers: {
                authtoken: token
            },
        })
            .then((x) => {
                contextData.updateFom()
            })
            .catch(error => console.log(error))
    }

    return (
        <View style={styles.container}>
            <Button title="Trainner" onPress={() => handleSelection('trainer')} />
            <Button title="Student" onPress={() => handleSelection('student')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: "center",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});