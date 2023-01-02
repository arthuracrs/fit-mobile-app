import { StyleSheet, Text, View, Button } from 'react-native';
import { useContext, useEffect } from "react";
import { signOut } from "firebase/auth";

import { GeneralStateContext } from '../../../../context'

export default function StudentHomeScreen({ navigation }) {
    const contextData = useContext(GeneralStateContext);

    return (
        <View style={styles.container}>
            <Text>Welcome {contextData.userData.type}</Text>
            <View style={styles.button} >
                <Button style={styles.button} title="Go to Schedule" onPress={() => navigation.navigate('Schedule')} />
                <Button style={styles.button} title="Logout" onPress={() => signOut(auth)} />
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
