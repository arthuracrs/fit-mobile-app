import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect, useContext } from "react";

import { GeneralStateContext } from '../../context'
import Workout from '../../components/workout';
import { CONSTANTS } from '../../consts'

export default function ScheduleScreen({ navigation }) {

  const contextData = useContext(GeneralStateContext);

  const [isLoading, setIsLoading] = useState(true);
  const [workoutList, setWorkoutList] = useState([]);

  const navigateToWorkoutScreen = (workout) => navigation.navigate('Workout', { workout })

  const getContent = async () => {
    const token = await contextData.firebase.auth.currentUser.getIdToken(true)
    fetch(`${CONSTANTS.BACKEND_URL}/schedule/10`, {
      headers: {
        authtoken: token
      }
    })
      .then(response => response.json())
      .then((responseJson) => {
        setWorkoutList(responseJson)
        setIsLoading(false)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getContent()
  }, [])

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator size={'large'} /> :
        <>
          <Text style={styles.title}>Schedule</Text>
          <ScrollView>
            {workoutList.map((workout, index) =>
              <Workout key={index} navigateToWorkoutScreen={() => navigateToWorkoutScreen(workout)} item={workout} />
            )}
          </ScrollView>
        </>
      }
    </View>
  );
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
