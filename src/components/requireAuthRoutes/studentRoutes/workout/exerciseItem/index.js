import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { useState, useEffect, useContext } from "react";
import axios from 'axios'

import { CONSTANTS } from '../../../../../consts'
import { apiCall } from '../../../../../services/apiCalls'
import { Auth } from '../../../../../services/authentication'
import { GeneralStateContext } from '../../../../../context'

export default function ExerciseItem({ navigateToExerciseScreen, exercise }) {
  const contextData = useContext(GeneralStateContext);
  const authContext = useContext(Auth.AuthenticationContext);
  const [isEnabled, setIsEnabled] = useState(exercise.done);

  const toggleSwitch = async () => await updateRemoteDoneStatus(!isEnabled)

  const updateRemoteDoneStatus = async (doneStatus) => {
    const data = {
      exerciseId: exercise.exerciseId,
      workoutId: exercise.workoutId,
      scheduleId: exercise.scheduleId,
      doneStatus
    }
    try {
      apiCall.changeExerciseDoneStatus(authContext.token, data)
        .then(res => {

          console.log(`updateDoneStatus | sucesso no update para ${doneStatus ? 'done' : 'undone'}`)

          setIsEnabled(previousState => !previousState)
          contextData.setShouldLoadCurrentSchedule(x => !x)
        }).catch(error => {
          console.log(error)
          console.log(`updateDoneStatus | error no update para ${doneStatus ? 'done' : 'undone'}`)
        })

    } catch (error) {
      console.log(error);
    }
  }

  const styles = StyleSheet.create({
    container: {
      borderRadius: 20,
      backgroundColor: isEnabled ? 'lightgreen' : 'lightgray',
      marginVertical: 10,
      height: 80,
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    text: {
      fontSize: 18,
      color: 'black',
      fontWeight: '700'
    }
  });

  return (
    <TouchableOpacity onPress={navigateToExerciseScreen} >
      <View style={styles.container}>
        <Text style={styles.text}>{exercise.exerciseModelId.name}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "darkgray" }}
          thumbColor={isEnabled ? "lightgreen" : "#f4f3f4"}
          onChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </TouchableOpacity>
  );
}



