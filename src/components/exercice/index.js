import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { useState, useEffect } from "react";
import axios from 'axios'

export default function Exercice({ navigateToExerciseScreen, exercise }) {
  const [isEnabled, setIsEnabled] = useState(exercise.done);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

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
        <Text style={styles.text}>{exercise.name}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "darkgray" }}
          thumbColor={isEnabled ? "lightgreen" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </TouchableOpacity>
  );
}



