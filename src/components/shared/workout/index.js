import { Alert, StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { useState } from "react";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function Workout({ item, navigateToWorkoutScreen, editMode }) {

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



