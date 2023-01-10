import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState, useContext, useEffect } from "react";

import { NewExerciseFormStateContext } from '../../context'

export default ExerciseModelItem = ({ item, goBack }) => {
    const formContextData = useContext(NewExerciseFormStateContext)

    return (
        <TouchableOpacity onPress={() => {
            formContextData.setExerciseModel(item)
            goBack()
        }}
            style={styles.exerciseModelItemContainer}>
            <View style={styles.exerciseModelItem}>
                <Image
                    style={styles.image}
                    source={{
                        uri: item.media[0].url
                    }} />

                <Text style={styles.text}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    exerciseModelItemContainer: {
        borderRadius: 10,
        backgroundColor: 'lightgray',
        marginVertical: 10,
        height: 120,
    },
    exerciseModelItem: {
        borderRadius: 20,
        backgroundColor: 'lightgray',
        height: 120,
        padding: 10,
        flexDirection: 'row',
        // backgroundColor: 'gold'
    },
    text: {
        flex: 1,
        fontSize: 18,
        color: 'black',
        fontWeight: '500',
        // backgroundColor: 'green',
        textAlign: 'center'
    },
    image: {
        borderRadius: 10,
        marginRight: 10,
        flex: 1,
        resizeMode: "center",
        height: "100%",
        // backgroundColor: 'red'
    },
});