import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useState, useContext, useEffect } from "react";

import { NewExerciseFormStateContext } from '../../context'

export default ExerciseModelCategoryItem = ({ item, goToCategory }) => {
    const formContextData = useContext(NewExerciseFormStateContext)

    // {
    //     "exerciseModelCategoryId": "679cc0d7-b0af-4b71-b853-1f3c342ae423",
    //     "name": "treino de biceps",
    //     "creator": "ce519a7a-e54a-47d6-9840-fbeb06658902",
    //     "exerciseModelsList": []
    // }

    return (
        <TouchableOpacity onPress={() => {
            goToCategory()
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