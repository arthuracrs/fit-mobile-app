import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect, useContext } from "react";

import { GeneralStateContext } from '../../context'
import Workout from '../../components/workout';
import Loading from "../../components/loading";
import { CONSTANTS } from '../../consts'

export default function ScheduleScreen({ navigation }) {
  const contextData = useContext(GeneralStateContext);

  const [isLoading, setIsLoading] = useState(true)
  const [retry, setRetry] = useState(true)
  const [errorloading, setErrorloading] = useState(false)

  const handleRetry = () => {
    setErrorloading(false)
    setIsLoading(true)
    setRetry(!retry)
  }

  useEffect(() => {
    console.log('ScheduleScreen | começou busca de usuario no DB')
    contextData.firebase.auth.currentUser.getIdToken(true).then(token => {
      fetch(`${CONSTANTS.BACKEND_URL}/schedule/${contextData.userData.student.currentSchedule}`, {
        headers: {
          authtoken: token
        }
      })
        .then(response => response.json())
        .then((responseJson) => {
          console.log('ScheduleScreen | sucesso na busca de usuario no DB')

          contextData.updateCurrentSchedule(responseJson)
          setIsLoading(false)
        })
        .catch(error => {
          setErrorloading(true)
          console.log(error)
        })
    })
  }, [retry, contextData.shouldLoadCurrentSchedule])

  return (
    <>
      {isLoading ? <Loading handleRetry={handleRetry} error={errorloading} /> :
        <View style={styles.container}>
          <Text style={styles.title}>Schedule</Text>
          <ScrollView>
            {contextData.currentSchedule.workoutsList.map((workout, index) =>
              <Workout key={index} navigateToWorkoutScreen={() => navigation.navigate('Workout', { workoutIndex: index })} item={workout} />
            )}
          </ScrollView>
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20
  },
  title: {
    fontSize: 40,
    fontWeight: '700'
  },
  progress: {
    fontSize: 18,
    color: 'gray',
    paddingBottom: 20
  }
});
