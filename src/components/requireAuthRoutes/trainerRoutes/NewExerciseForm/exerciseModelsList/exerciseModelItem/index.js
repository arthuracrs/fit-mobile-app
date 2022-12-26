import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

export default ExerciseModelItem = ({ item }) => {
    const styles = StyleSheet.create({
        exerciseModelItem: {
            backgroundColor: 'lightgray',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 150,
            maxWidth: '50%',
            borderColor: 'black',
            borderRightWidth: 1,
            borderBottomWidth: 1
        }
    });

    return (
        <TouchableOpacity onPress={() => { }} style={styles.exerciseModelItem}>
            <View>
                <Text >{item.name}</Text>
            </View>
        </TouchableOpacity>
    )
};