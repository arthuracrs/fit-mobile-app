import { Alert, StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { useState, useContext } from "react";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

import { CONSTANTS } from '../../../consts'
import { GeneralStateContext } from '../../../context'

export default function Workout({ item, navigateToWorkoutScreen, editMode }) {

  const contextData = useContext(GeneralStateContext);
  const deleteWorkout = async (doneStatus) => {
    contextData.firebase.auth.currentUser.getIdToken(true).then(token => {
      axios.delete(`${CONSTANTS.BACKEND_URL}/workout/${item.workoutId}`, {
        headers: {
          'authtoken': token,
        }
      }).then(res => {
        console.log(`deleteWorkout | sucesso deleteando Workout`)

        contextData.setShouldLoadCurrentSchedule(x => !x)
      }).catch(error => {
        console.log(`deleteWorkout | error deleteando Workout`)
        console.log(error);
      })
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
        { text: 'Yes', onPress: deleteWorkout },
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

  return (
    <TouchableOpacity onPress={navigateToWorkoutScreen} >
      <View style={styles.container}>
        <Text style={styles.text}>{item.name}</Text>
        {editMode &&
          <TouchableOpacity style={styles.buttonContainer} onPress={deleteHandler}>
            <Ionicons name="trash" size={35} color="#DC3545" />
          </TouchableOpacity>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: 'lightgray',
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