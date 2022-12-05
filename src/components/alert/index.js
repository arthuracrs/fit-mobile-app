import { Alert, Text, View } from 'react-native';

export default function AlertCompo({ text }) {

    Alert.alert(
        "Alert Title",
        "My Alert Msg" ?? text,
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    );

    return (
        <View >
            <Text>fom</Text>
        </View>
    )
}