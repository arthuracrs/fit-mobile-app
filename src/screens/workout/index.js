import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState, useEffect } from "react";

import Exercice from '../../components/exercice'

export default function WorkoutScreen({ navigation, route }) {
  const { workout } = route.params

  const getDoneExercises = (exercisesList) => {
    let num = 0

    for (let i = 0; i < exercisesList.length; i++)
      if (exercisesList[i].done === true) num++

    return num
  }

  const doneExercises = getDoneExercises(workout.exercisesList)
  const totalExercices = workout.exercisesList.length

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.name}</Text>
      <Text style={styles.progress}>Progress {doneExercises}/{totalExercices}</Text>
      <ScrollView>
        {workout.exercisesList.map((item, index) =>
          <Exercice
            navigateToExerciseScreen={() => navigation.navigate('Exercise', { exercise: item })}
            key={index}
            exercise={item.exerciseModelId}
          />
        )}
      </ScrollView>
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
