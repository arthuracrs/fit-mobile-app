import { StyleSheet, Text, View } from 'react-native';

import Exercice from '../../components/exercice'

export default function Home() {

    const exerciceList = ['Exercicio 1', 'Exercicio 2', 'Exercicio 3']

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            {exerciceList.map((x, id) => <Exercice key={id} title={x} />)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
