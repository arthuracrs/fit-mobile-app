import { StyleSheet, Text, View, Switch, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect, useContext } from "react";
import axios from 'axios'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import { CONSTANTS } from '../../../../../consts'
import { GeneralStateContext } from '../../../../../context'

export default function Exercise({ navigateToExerciseScreen, exercise, editMode }) {
  const contextData = useContext(GeneralStateContext);
  const [isEnabled, setIsEnabled] = useState(exercise.done);

  // const updateRemoteDoneStatus = async (doneStatus) => {
  //   const token = await contextData.firebase.auth.currentUser.getIdToken(true)

  //   try {
  //     await axios.put(`${CONSTANTS.BACKEND_URL}/exercise/${exercise.exerciseId}/workout/${exercise.workoutId}/${doneStatus ? 'done' : 'undone'}`, {}, {
  //       headers: {
  //         'authtoken': token,
  //       }
  //     })

  //     console.log(`updateDoneStatus | sucesso no update para ${doneStatus ? 'done' : 'undone'}`)

  //     setIsEnabled(previousState => !previousState)
  //     contextData.setShouldLoadCurrentSchedule(x => !x)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const deleteHandler = () => {
    //function to make two option alert
    Alert.alert(
      //title
      'Confirmation',
      //body
      'Do you really want to delete this Workout?',
      [
        { text: 'Yes', onPress: () => console.log('Yes Pressed') },
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



