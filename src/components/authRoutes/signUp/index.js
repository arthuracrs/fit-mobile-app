import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button } from "react-native";
import { useState, useContext, useEffect } from "react";
import { useTranslation } from 'react-i18next'

import { GeneralStateContext } from '../../../context'
import { Auth } from '../../../services/authentication'

export default function SignupScreen({ navigation }) {
    const authContext = useContext(Auth.AuthenticationContext);
    const { t } = useTranslation()

    const [log, setLog] = useState("Log Vazio");
    const [username, setUsername] = useState("Arthur");
    const [email, onChangeEmail] = useState("trainer@fit.test");
    const [password, onChangePassword] = useState('Aaaaaa');
    const [confirmPassword, onChangeConfirmPassword] = useState('');

    const submitUser = async () => {

        authContext.SignUp({ email, password })
            .then(res => {
                console.log('SignUp | sucesso')
            })
            .catch(error => {
                console.log('SignUp | error')
                const responseBody = error.response.data
                if (responseBody.error != undefined) {
                    const errorCode = responseBody.error;
                    console.log('errorCode: ' + errorCode)
                    setLog({ errorCode })
                }
            })

        // const auth = contextData.firebase.auth
        // createUserWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         updateProfile(auth.currentUser, {
        //             displayName: username,
        //         }).then(() => {
        //             // Profile updated!
        //             // ...
        //         }).catch((error) => {
        //             // An error occurred
        //             // ...
        //             console.log(error)
        //         });
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         setLog({
        //             errorCode,
        //             errorMessage
        //         })
        //     });
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
                    placeholder={t("SignUpScreen.usernamePlaceholder")}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                    placeholder={t("SignUpScreen.emailPlaceholder")}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder={t("SignUpScreen.passwordPlaceholder")}
                    secureTextEntry={true}
                    keyboardType="default"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeConfirmPassword}
                    value={confirmPassword}
                    placeholder={t("SignUpScreen.repeatPasswordPlaceholder")}
                    secureTextEntry={true}
                    keyboardType="default"
                />
            </SafeAreaView>
            <Button title={t("SignUpScreen.signUpButton")} onPress={submitUser} />
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