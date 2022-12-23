import { StyleSheet, View, Text, SafeAreaView, Image, ActivityIndicator, Button } from 'react-native';

import LoadingGif from './loading.gif'

export default function Loading({ error, handleRetry }) {
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
        <>
            {error ?
                <View style={styles.view}>
                    <Text style={styles.text}>Error</Text>
                    <Button style={styles.button} title="retry" onPress={handleRetry} />
                </View>
                : <View style={styles.view}>
                    <Image style={styles.image} source={LoadingGif} />
                    <Text style={styles.text}>Loading</Text>
                </View>}
        </>
    )
}