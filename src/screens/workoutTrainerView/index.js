import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState, useEffect, useContext } from "react";

import Exercice from '../../components/exercice'
import { GeneralStateContext } from '../../context'

export default function WorkoutTrainerViewScreen({ navigation, route }) {
  const { workoutIndex, studentIndex } = route.params
  const contextData = useContext(GeneralStateContext);

  const workout = contextData.trainerStudents[studentIndex].currentSchedule.workoutsList[workoutIndex]

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
            navigateToExerciseScreen={() => navigation.navigate('Exercise', { exerciseIndex: index, workoutIndex })}
            key={index}
            exercise={{ workoutId: workout.workoutId, ...item }}
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
