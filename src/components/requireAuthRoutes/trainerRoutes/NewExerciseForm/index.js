import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GeneralStateContext } from '../../../../context'
import { CONSTANTS } from '../../../../consts'

import ExerciseModelsList from './exerciseModelsList'

const Stack = createNativeStackNavigator();

export default function NewExerciseForm({ navigation, route }) {

  const { scheduleId, workoutId } = route.params
  const contextData = useContext(GeneralStateContext);

  const [name, setName] = useState(false)

  const submit = async () => {
    const data = {
      "exerciseModelId": "4b92b590-64f7-4978-ac5b-aadd3376dd95",
      scheduleId, workoutId
    }

    contextData.firebase.auth.currentUser.getIdToken(true).then(token => {
      axios.post(`${CONSTANTS.BACKEND_URL}/exercise`, data, {
        headers: {
          'authtoken': token,
        }
      })
        .then(function (response) {
          console.log('NewExerciseForm | sucesso na criação de Workout')

          contextData.setShouldLoadCurrentSchedule(x => !x)
          navigation.goBack()
          // const user = response.data
          // contextData.setUserData(user)
          // setIsLoading(false)
        })
        .catch(function (error) {
          // setErrorloading(true)
          console.log('NewExerciseForm | erro na criação de Workout')
          console.log(error);
        })

    })
  }

  const FakeComponent = () => (
    <Text>fom</Text>
  )

  return (
    // <FakeComponent />
    <Stack.Navigator>
      <Stack.Screen name="ExerciseModelsList" component={ExerciseModelsList} options={{
        headerShown: false,
      }} initialParams={{ scheduleId, workoutId }} />
    </Stack.Navigator>
  )
}