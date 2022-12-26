import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useState, useContext, useEffect } from "react";

import { NewExerciseFormStateContext } from '../../context'

export default ExerciseModelItem = ({ item, goBack }) => {
    const formContextData = useContext(NewExerciseFormStateContext)

    return (
        <TouchableOpacity onPress={() => {
            formContextData.setExerciseModel(item)
            goBack()
        }}
            style={styles.exerciseModelItem}>
            <View>
                <Text >{item.name}</Text>
            </View>
        </TouchableOpacity>
    )
};

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