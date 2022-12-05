import { StyleSheet, View, Text, SafeAreaView, Image, ActivityIndicator } from 'react-native';

// import LoadingGif from '. /loading.gif'
import LoadingGif from '../../../assets/loading.gif'

export default function Loading({ number, text }) {
    const styles = StyleSheet.create({
        view: {
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center'
        },
        text: {
            fontWeight: '700',
            fontSize: 18,
            color: 'black',
        },
        image: {
            height: 70,
            resizeMode: 'center',
        },
    });

    return (
        <View style={styles.view}>
            <Image style={styles.image} source={LoadingGif} />
            <Text style={styles.text}>Loading</Text>
        </View>
    )
}