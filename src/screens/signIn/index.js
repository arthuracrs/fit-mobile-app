import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button, Alert } from "react-native";
import { useState, useContext } from "react";
import { useNavigation } from '@react-navigation/native';

import { signInWithEmailAndPassword } from "firebase/auth";

import { GeneralStateContext } from '../../context'

export default function SignInScreen({ navigation }) {
    const contextData = useContext(GeneralStateContext);

    // const navigation = useNavigation();

    const [log, setLog] = useState("Log Vazio");
    const [email, onChangeEmail] = useState("Email@gmail.com");
    const [password, onChangePassword] = useState('Ffffff');

    const SignIn = async () => {
        const auth = contextData.firebase.auth
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                Alert.alert(
                    "Alert Title",
                    "My Alert Msg",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            });
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                    placeholder="Email"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder="Senha"
                    secureTextEntry={true}
                    keyboardType="default"
                />
            </SafeAreaView>
            <Button title="Sign In" onPress={SignIn} />
            <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
            <Text>{log.errorCode}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});