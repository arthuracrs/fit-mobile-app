import { StyleSheet, Text, View, Button } from 'react-native';
import { useContext, useEffect } from "react";
import { signOut } from "firebase/auth";

import { GeneralStateContext } from '../../../../context'
import { Auth } from '../../../../services/authentication'

export default function TrainerHomeScreen({ navigation }) {
    const contextData = useContext(GeneralStateContext);
    const authContext = useContext(Auth.AuthenticationContext);
    const auth = contextData.firebase.auth

    return (
        <View style={styles.container}>
            <Text>Welcome {contextData.userData.type}</Text>
            <View style={styles.button} >
                <Button style={styles.button} title="Go to Students" onPress={() => navigation.navigate('StudentsList')} />
                <Button style={styles.button} title="Logout" onPress={() => authContext.SignOut()} />
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
