import { StyleSheet, Text, View, Button } from 'react-native';
import { useContext, useEffect } from "react";
import { signOut } from "firebase/auth";

import { GeneralStateContext } from '../../../../context'
import { AuthenticationContext } from '../../../../services/authentication/localAuthContext'

export default function TrainerHomeScreen({ navigation }) {
    const contextData = useContext(GeneralStateContext);
    const authData = useContext(AuthenticationContext);
    const auth = contextData.firebase.auth

    return (
        <View style={styles.container}>
            <Text>Welcome {contextData.userData.type} {auth.currentUser.displayName}</Text>
            <View style={styles.button} >
                <Button style={styles.button} title="Go to Students" onPress={() => navigation.navigate('StudentsList')} />
                <Button style={styles.button} title="Logout" onPress={() => authData.SignOut()} />
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
