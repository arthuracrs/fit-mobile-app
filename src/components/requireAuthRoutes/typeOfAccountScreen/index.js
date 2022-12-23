import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useContext } from "react";
import * as Linking from 'expo-linking';
import { signOut } from "firebase/auth";

import { GeneralStateContext } from '../../../context'
import { CONSTANTS } from '../../../consts'

export default function TypeOfAccountScreen() {
    const contextData = useContext(GeneralStateContext);
    const auth = contextData.firebase.auth
    
    const Stack = createNativeStackNavigator();

    const TypeOfAccount = ({ navigation }) => (
        <View style={styles.container}>
            <Button title="Trainner" onPress={() => navigation.navigate('TrainerRegisterInfo')} />
            <Button title="Student" onPress={() => navigation.navigate('StudentRegisterInfo')} />
            <View style={styles.sigout}>
                <Button style={styles.button} title="Logout" onPress={() => signOut(auth)} />
            </View>
        </View>
    )

    const TrainerRegisterInfo = ({ navigation }) => (
        <View style={styles.container}>
            <Text style={styles.text}>You need to register as a trainer on the website</Text>
            <Button title="Go to the Website" onPress={() => Linking.openURL(`${CONSTANTS.BACKEND_URL}/health`)} />
        </View>
    )

    const StudentRegisterInfo = ({ navigation }) => (
        <View style={styles.container}>
            <Text style={styles.text}>Ask for your trainer for the student link, to get access to your schedule</Text>
        </View>
    )

    return (
        <Stack.Navigator>
            <Stack.Screen name="TypeOfAccount" component={TypeOfAccount} />
            <Stack.Screen name="TrainerRegisterInfo" component={TrainerRegisterInfo} />
            <Stack.Screen name="StudentRegisterInfo" component={StudentRegisterInfo} />
        </Stack.Navigator>
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
    text: {
        textAlign: 'center'
    },
    sigout:{
        marginTop: 50
    },
    button: {
        display: 'flex',
        // marginTop: 50,
        // marginVertical: 20
    }
});