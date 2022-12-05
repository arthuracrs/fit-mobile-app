import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useEffect, useState } from "react";
import HomeScreen from '../../screens/home'
import WorkoutScreen from '../../screens/workout';
import ExerciseScreen from '../../screens/exercise';
import ScheduleScreen from '../../screens/schedule';
import TypeOfAccountScreen from "../../screens/typeOfAccount";
import axios from 'axios'

import { GeneralStateContext } from '../../context'

import { CONSTANTS } from '../../consts'

const Stack = createNativeStackNavigator();

export default function RequireAuthRoutes() {
  const contextData = useContext(GeneralStateContext);
  const [update, setUpdate] = useState(false)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    console.log('getUser | começou busca de usuario no DB')

    contextData.firebase.auth.currentUser.getIdToken(true).then(token => {
      axios.get(`${CONSTANTS.BACKEND_URL}/user`, {
        headers: {
          'authtoken': token,
        }
      })
        .then(function (response) {
          console.log('getUser | sucesso na busca de usuario no DB')
          const result = response.data
          console.log(result)
          setUserData(result)
        })
        .catch(function (error) {
          console.log(error);
        })
    })

  }, [update])

  return (
    <Stack.Navigator>
      {userData.type == undefined
        ?
        <Stack.Screen name="TypeOfAccount" component={TypeOfAccountScreen} />
        : <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Schedule" component={ScheduleScreen} />
          <Stack.Screen name="Workout" component={WorkoutScreen} />
          <Stack.Screen name="Exercise" component={ExerciseScreen} />
        </>}


    </Stack.Navigator>
  );
}
