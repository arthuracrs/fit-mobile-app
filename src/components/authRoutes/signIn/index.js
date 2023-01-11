import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button, Alert } from "react-native";
import { useState, useContext } from "react";
import { useTranslation } from 'react-i18next'

import { GeneralStateContext } from '../../../context'
import { AuthenticationContext } from '../../../services/authentication/localAuthContext'

export default function SignInScreen({ navigation }) {
    const { t } = useTranslation()
    const contextData = useContext(GeneralStateContext)
    const authContext = useContext(AuthenticationContext)

    const [errorMessage, setErrorMessage] = useState("");
    const [email, onChangeEmail] = useState("a@g.com");
    const [password, onChangePassword] = useState('1');

    const SignIn = async () => {
        try {
            const result = await authContext.SignIn({ email, password })
            if(result.error) setErrorMessage(result.error)
        } catch (error) {
            console.log(error)
            const errorCode = error.code;
            const errorMessage = error.message;

            setLog({ errorCode })

        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                    placeholder={t("SignInScreen.emailPlaceholder")}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder={t("SignInScreen.passwordPlaceholder")}
                    secureTextEntry={true}
                    keyboardType="default"
                />
            </SafeAreaView>
            <Text style={{textAlign: 'center'}}>{errorMessage}</Text>
            <Button title={t("SignInScreen.signInButton")} onPress={SignIn} />
            <Button title={t("SignInScreen.signUpButton")} onPress={() => navigation.navigate('SignUp')} />
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