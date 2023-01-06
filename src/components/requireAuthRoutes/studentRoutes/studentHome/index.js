import { StyleSheet, Text, View, Button } from 'react-native';
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { GeneralStateContext } from '../../../../context'
import { Auth } from '../../../../services/authentication'

export default function StudentHomeScreen({ navigation }) {
    const { t } = useTranslation();
    const contextData = useContext(GeneralStateContext);
    const authContext = useContext(Auth.AuthenticationContext);
    // contextData.shouldLoadUser
    return (
        <View style={styles.container}>
            <Text>{t("StudentHomeScreen.welcome")} {t("StudentHomeScreen.student")}</Text>
            <View style={styles.button} >
                <Button style={styles.button} title={'refresh'} onPress={() => contextData.setShouldLoadUser(x => !x)} />
                <Button style={styles.button} title={t("StudentHomeScreen.goToScheduleButton")} onPress={() => navigation.navigate('Schedule')} />
                <Button style={styles.button} title={t("StudentHomeScreen.logoutButton")} onPress={() => authContext.SignOut()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginVertical: 20
    }
});
