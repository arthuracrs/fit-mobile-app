import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useContext } from "react";
import * as Linking from 'expo-linking';
import { signOut } from "firebase/auth";

import { GeneralStateContext } from '../../../context'
import { CONSTANTS } from '../../../consts'
import { Auth } from '../../../services/authentication'

export default function CompleteProfileRoutes() {
    const contextData = useContext(GeneralStateContext);
    const authContext = useContext(Auth.AuthenticationContext);

    const Stack = createNativeStackNavigator();

    const InitialScreen = ({ navigation }) => (
        <View style={styles.container}>
            <Button title="Preencher" onPress={() => navigation.navigate('SetUsername')} />
            <View style={styles.sigout}>
                <Button style={styles.button} title="Logout" onPress={() => authContext.SignOut()} />
            </View>
        </View>
    )

    const SetUsername = ({ navigation }) => (
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
            <Stack.Screen name="InitialScreen" component={InitialScreen} />
            <Stack.Screen name="SetUsername" component={SetUsername} />
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
    sigout: {
        marginTop: 50
    },
    button: {
        display: 'flex',
        // marginTop: 50,
        // marginVertical: 20
    }
});