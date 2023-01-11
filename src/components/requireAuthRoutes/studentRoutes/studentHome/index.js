import { StyleSheet, Text, View, Button, Image, Dimensions } from 'react-native';
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { GeneralStateContext } from '../../../../context'
import { Auth } from '../../../../services/authentication'

export default function StudentHomeScreen({ navigation }) {
    const { t } = useTranslation()
    const win = Dimensions.get('window')

    const contextData = useContext(GeneralStateContext);
    const authContext = useContext(Auth.AuthenticationContext);

    const styles = StyleSheet.create({
        container: {
            paddingTop: 50,
            flex: 1,
            flexDirection: 'column',
            // backgroundColor: 'red',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
        bannerContainer: {
            zIndex: 1,
            overflow: 'hidden',
            borderRadius: 20,
            margin: 20,
            marginBottom: -50,
            width: win.width * .8,
            maxWidth: 600,
            height: win.height * .2,
            maxHeight: 250,
            alignSelf: 'center'
        },
        image: {
            resizeMode: "cover",
            height: '100%',
            width: win.width * .8,
            maxWidth: 600,
        },
        mainContainer: {
            padding: 20,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            paddingTop: 120,
            flex: 1,
            backgroundColor: 'white',
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.bannerContainer}>
                <Image
                    style={styles.image}
                    source={{
                        uri: 'https://img.freepik.com/free-photo/portrait-concentrated-young-afro-american-sportsman_171337-9464.jpg?w=2000          '
                    }} />
            </View>
            <View style={styles.mainContainer}>
                <Text style={{ textAlign: 'center' }}>{t("StudentHomeScreen.welcome")} {t("StudentHomeScreen.student")}</Text>
                <Button title={t("StudentHomeScreen.goToScheduleButton")} onPress={() => navigation.navigate('Schedule')} />
                <Button title={t("StudentHomeScreen.logoutButton")} onPress={() => authContext.SignOut()} />
            </View>
        </View>
    );
}


