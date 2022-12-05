import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button } from "react-native";
import { useState, useContext, useEffect } from "react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { GeneralStateContext } from '../../context'

export default function SignupScreen({ navigation }) {
    const contextData = useContext(GeneralStateContext);

    const [log, setLog] = useState("Log Vazio");
    const [username, setUsername] = useState("Arthur");
    const [email, onChangeEmail] = useState("Email@gmail.com");
    const [password, onChangePassword] = useState('Ffffff');
    const [confirmPassword, onChangeConfirmPassword] = useState('');

    const submitUser = async () => {
        const auth = contextData.firebase.auth
        
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: username,
                }).then(() => {
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    // An error occurred
                    // ...
                    console.log('erro aqui')
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLog({
                    errorCode,
                    errorMessage
                })
            });
    }

    useEffect(() => {
        if (confirmPassword !== password && confirmPassword !== '') {
            setLog({
                errorCode: 'as senhas estão diferentes'
            })
        } else {
            setLog({
                errorCode: ''
            })

        }
    }, [confirmPassword])

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="Email"
                />
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
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeConfirmPassword}
                    value={confirmPassword}
                    placeholder="Repita a Senha"
                    secureTextEntry={true}
                    keyboardType="default"
                />
            </SafeAreaView>
            <Button title="Sign Up" onPress={submitUser} />
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