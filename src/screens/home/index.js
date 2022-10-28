import { StyleSheet, Text, View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {

    const exerciceList = ['Exercicio 1', 'Exercicio 2', 'Exercicio 3']

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Button title="Go to Workout" onPress={() => navigation.navigate('Workout')}/>
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
});
