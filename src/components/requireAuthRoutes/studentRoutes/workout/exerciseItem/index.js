import { StyleSheet, Text, View, Switch, TouchableOpacity, Image } from 'react-native';
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

  const toggleSwitch = () => updateRemoteDoneStatus(!isEnabled)

  const updateRemoteDoneStatus = (doneStatus) => {
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
          contextData.setShouldLoadCurrentSchedule(x => !x)
          setIsEnabled(previousState => !previousState)
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
      height: 100,
      flexDirection: 'row',
      justifyContent: 'space-between',
      overflow: 'hidden'
    },
    text: {
      paddingTop: 10,
      fontSize: 18,
      color: 'black',
      fontWeight: '500',
      flex: 3
    },
    image: {
      marginRight: 10,
      flex: 2,
      resizeMode: "cover",
      height: "100%",
    },
    doneSwitchContainer: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <TouchableOpacity onPress={navigateToExerciseScreen} >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: exercise.exerciseModelId.media[0].url
          }} />
        <Text style={styles.text}>{exercise.exerciseModelId.name}</Text>
        <View style={styles.doneSwitchContainer}>
          <Switch
            trackColor={{ false: "#767577", true: "darkgray" }}
            thumbColor={isEnabled ? "lightgreen" : "#f4f3f4"}
            onChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}



