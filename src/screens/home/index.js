import { StyleSheet, Text, View, Button } from 'react-native';
import { useContext, useEffect } from "react";
import { signOut } from "firebase/auth";

import { GeneralStateContext } from '../../context'
import { CONSTANTS } from '../../consts'

export default function HomeScreen({ navigation }) {
    const contextData = useContext(GeneralStateContext);
    const auth = contextData.firebase.auth

    const logout = () => {
        signOut(auth).catch((error) => {
            // An error happened.
        });
    }

    const handleSelection = async (type) => {
        const auth = contextData.firebase.auth
        const token = await auth.currentUser.getIdToken(true)
        fetch(`${CONSTANTS.BACKEND_URL}/` + type, {
            method: 'POST',
            headers: {
                authtoken: token
            },
        })
            .catch(error => console.log(error))
    }

    return (
        <View style={styles.container}>
            <Text>Welcome {auth.currentUser.displayName}</Text>
            <View style={styles.button} >
                <Button title="Trainner" onPress={() => handleSelection('trainner')} />
                <Button style={styles.button} title="Go to Schedule" onPress={() => navigation.navigate('Schedule')} />
                <Button style={styles.button} title="Logout" onPress={logout} />
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
