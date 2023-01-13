import { StyleSheet, Text, View, Button } from 'react-native';
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { GeneralStateContext } from '../../../../context'
import { Auth } from '../../../../services/authentication'

export default function TrainerHomeScreen({ navigation }) {
    const contextData = useContext(GeneralStateContext);
    const authContext = useContext(Auth.AuthenticationContext);
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <Text>{t("TrainerHomeScreen.welcome")} {t("TrainerHomeScreen.trainer")}</Text>
            <View style={styles.button} >
                <Button style={styles.button} title={t("TrainerHomeScreen.goToStudents")} onPress={() => navigation.navigate('StudentsList')} />
                <Button style={styles.button} title="Dnd" onPress={() => navigation.navigate('DndScreen')} />
                <Button style={styles.button} title={t("TrainerHomeScreen.logout")} onPress={() => authContext.SignOut()} />
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
        marginVertical: 200,
        flex: 1,
        // backgroundColor: 'gold',
        justifyContent: 'space-evenly'
    }
});
