import { StyleSheet, Text, View, Switch, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect, useContext } from "react";
import axios from 'axios'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import { CONSTANTS } from '../../../../../consts'
import { GeneralStateContext } from '../../../../../context'

import { Auth } from '../../../../../services/authentication'
import { apiCall } from '../../../../../services/apiCalls'

export default function Exercise({ navigateToExerciseScreen, exercise, editMode }) {
  const authContext = useContext(Auth.AuthenticationContext);
  const contextData = useContext(GeneralStateContext);
  const [isEnabled, setIsEnabled] = useState(exercise.done);

  const deleteExercise = async (doneStatus) => {
    const data = {
      workoutId: exercise.workoutId,
      exerciseId: exercise.exerciseId,
      scheduleId: exercise.scheduleId
    }
    
    apiCall.deleteExercise(authContext.token, data)
      .then(res => {
        console.log(`deleteExercise | sucesso deleteando exercise`)

        contextData.setShouldLoadCurrentSchedule(x => !x)
      }).catch(error => {
        console.log(`deleteExercise | error deleteando exercise`)
        console.log(error);
      })

  }

  const deleteHandler = () => {
    //function to make two option alert
    Alert.alert(
      //title
      'Confirmation',
      //body
      'Do you really want to delete this Workout?',
      [
        { text: 'Yes', onPress: deleteExercise },
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  };

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
        {editMode &&
          <TouchableOpacity style={styles.buttonContainer} onPress={deleteHandler}>
            <Ionicons name="trash" size={35} color="#DC3545" />
          </TouchableOpacity>}
      </View>
    </TouchableOpacity>
  );
}



