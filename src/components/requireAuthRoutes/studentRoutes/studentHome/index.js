import { StyleSheet, Text, View, Button, Image, Dimensions } from 'react-native';
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { GeneralStateContext } from '../../../../context'
import { Auth } from '../../../../services/authentication'

export default function StudentHomeScreen({ navigation }) {
    const { t } = useTranslation();
    const win = Dimensions.get('window');

    const contextData = useContext(GeneralStateContext);
    const authContext = useContext(Auth.AuthenticationContext);
    // contextData.shouldLoadUser

    const styles = StyleSheet.create({
        container: {
            paddingTop: 50,
            flex: 1,
            // backgroundColor: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.01)',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'center'
        },
        bannerContainer: {
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: 20,
            
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowOpacity: 0.6,
            shadowRadius: 15,
            elevation: 15,
        },
        button: {
            marginVertical: 20
        },
        mainContainer: {
            padding: 20,
            marginVertical: 20,
            // backgroundColor: 'rgba(0, 0, 0, 0.01)',
            backgroundColor: 'white',
            flex: 1,
            justifyContent: 'space-between',

            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 15,
            elevation: 5,
        },
        image: {
            flex: 1,
            resizeMode: "cover",
            width: win.width * 0.9,
            maxWidth: 500,
            maxHeight: 200,
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
            <Text>{t("StudentHomeScreen.welcome")} {t("StudentHomeScreen.student")}</Text>
            <View style={styles.mainContainer}>
                <Button style={styles.button} title={t("StudentHomeScreen.goToScheduleButton")} onPress={() => navigation.navigate('Schedule')} />
                <Button style={styles.button} title={t("StudentHomeScreen.logoutButton")} onPress={() => authContext.SignOut()} />
            </View>
        </View>
    );
}


