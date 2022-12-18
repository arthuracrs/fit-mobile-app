import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button } from "react-native";
import { useState, useContext } from "react";
import { GeneralStateContext } from '../../context'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CONSTANTS } from '../../consts'

export default function TypeOfAccountScreen() {
    const Stack = createNativeStackNavigator();

    const TypeOfAccount = () => (
        <View style={styles.container}>
            <Button title="Trainner" onPress={() => handleSelection('trainer')} />
            <Button title="Student" onPress={() => handleSelection('student')} />
        </View>
    )

    return (
        <Stack.Navigator>
            <Stack.Screen name="TypeOfAccount" component={TypeOfAccount} />
            <Stack.Screen name="Schedule" component={ScheduleScreen} />
            <Stack.Screen name="Workout" component={WorkoutScreen} />
            <Stack.Screen name="Exercise" component={ExerciseScreen} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: "center",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});