import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useState, useContext, useEffect } from "react";

import ExerciseModelItem from './exerciseModelItem'

export default function ExerciseModelsCategory({ navigation, route }) {
    const { exerciseModels } = route.params

    return (
        <>
            <View style={styles.container}>
                <FlatList
                    data={exerciseModels}
                    renderItem={({ item }) => <ExerciseModelItem goBack={() => navigation.navigate('Home')} item={item} />}
                    keyExtractor={item => item.exerciseModelId}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20
    },
    input: {
        borderWidth: 2,
        padding: 15,
        borderRadius: 10,
        marginBottom: 20
    },
    title: {
        fontSize: 25,
        fontWeight: '700',
        paddingBottom: 10,
        marginLeft: 10
    },
});
