import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { useState, useEffect, useContext } from "react";
import axios from 'axios'

import { CONSTANTS } from '../../consts'
import { GeneralStateContext } from '../../context'

export default function Exercice({ navigateToExerciseScreen, exercise }) {
  const contextData = useContext(GeneralStateContext);
  const [isEnabled, setIsEnabled] = useState(exercise.done);

  const toggleSwitch = async () => await updateRemoteDoneStatus(!isEnabled)

  const updateRemoteDoneStatus = async (doneStatus) => {
    const token = await contextData.firebase.auth.currentUser.getIdToken(true)

    try {
      await axios.put(`${CONSTANTS.BACKEND_URL}/exercise/${exercise.exerciseId}/workout/${exercise.workoutId}/${doneStatus ? 'done' : 'undone'}`, {}, {
        headers: {
          'authtoken': token,
        }
      })

      console.log(`updateDoneStatus | sucesso no update para ${doneStatus ? 'done' : 'undone'}`)

      setIsEnabled(previousState => !previousState)
      contextData.setShouldLoadCurrentSchedule(x => !x)
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



