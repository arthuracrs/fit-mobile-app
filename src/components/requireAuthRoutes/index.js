import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useEffect, useState } from "react";
import axios from 'axios'

import Loading from "../../components/loading";
import HomeScreen from '../../screens/home'
import WorkoutScreen from '../../screens/workout';
import ExerciseScreen from '../../screens/exercise';
import ScheduleScreen from '../../screens/schedule';
import TypeOfAccountScreen from "../../screens/typeOfAccount";

import { GeneralStateContext } from '../../context'

import { CONSTANTS } from '../../consts'

const Stack = createNativeStackNavigator();

export default function RequireAuthRoutes() {
  const contextData = useContext(GeneralStateContext);
  const [isLoading, setIsLoading] = useState(true)

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
          contextData.setUserData(result)
          setIsLoading(false)
        })
        .catch(function (error) {
          console.log(error);
        })
    })

  }, [contextData.updateRequireAuthRoutes])

  return (<>{
    isLoading ? <Loading /> :
      <Stack.Navigator>
        {contextData.userData.type == undefined
          ?
          <Stack.Screen name="TypeOfAccount" component={TypeOfAccountScreen} />
          : <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Schedule" component={ScheduleScreen} />
            <Stack.Screen name="Workout" component={WorkoutScreen} />
            <Stack.Screen name="Exercise" component={ExerciseScreen} />
          </>}


      </Stack.Navigator>
  }
  </>
  );
}
