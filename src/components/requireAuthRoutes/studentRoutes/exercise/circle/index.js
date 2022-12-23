import { StyleSheet, Text, View } from 'react-native';

export default function Circle({ number, text }) {
    const styles = StyleSheet.create({
        circle: {
            borderColor: 'gray',
            borderWidth: 5,
            borderRadius: 100,
            width: 80,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center'
        },
        circleView: {
            width: 110,
            height: 110,
            alignItems: 'center'
        },
        circleText: {
            fontWeight: '700',
            fontSize: 18,
            color: 'black',
        },
    });

    return (
        <View style={styles.circleView}>
            <View style={styles.circle}>
                <Text style={styles.circleText}>{number}</Text>
            </View>
            <Text style={styles.circleText}>{text}</Text>
        </View>
    )
}