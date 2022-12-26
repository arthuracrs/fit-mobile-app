import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NewExerciseFormStateProvider, NewExerciseFormStateContext } from './context'

import ExerciseModelsList from './exerciseModelsList'
import Home from './home'

const Stack = createNativeStackNavigator();

export default function NewExerciseForm({ navigation, route }) {

  const { scheduleId, workoutId } = route.params

  return (
    <NewExerciseFormStateProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
          initialParams={{ scheduleId, workoutId }}
        />
        <Stack.Screen
          name="ExerciseModelsList"
          component={ExerciseModelsList}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NewExerciseFormStateProvider>
  )
}