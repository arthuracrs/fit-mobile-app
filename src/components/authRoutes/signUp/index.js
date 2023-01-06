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