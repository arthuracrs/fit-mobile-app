import { StyleSheet, View, Text, SafeAreaView, Image, Dimensions, Button } from 'react-native';

import LoadingGif from './loading.gif'

export default function Loading({ error, handleRetry }) {
    const win = Dimensions.get('window')
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
            marginTop: 30,
        },
        image: {
            height: win.height * .2,
            maxHeight: 80,
            resizeMode: 'contain',
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