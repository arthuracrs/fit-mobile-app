import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState, useEffect, useContext } from "react";

import ExerciseItem from './exerciseItem'
import { GeneralStateContext } from '../../../../context'

export default function WorkoutScreen({ navigation, route }) {
  const { workoutIndex } = route.params
  const contextData = useContext(GeneralStateContext);

  const workout = contextData.userData.student.currentSchedule.workoutsList[workoutIndex]

  const getDoneExercises = (exercisesList) => {
    let num = 0

    for (let i = 0; i < exercisesList.length; i++)
      if (exercisesList[i].done === true) num++

    return num
  }

  const doneExercises = getDoneExercises(workout.exercisesList)
  const totalExercises = workout.exercisesList.length

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.name}</Text>
      <Text style={styles.progress}>Progress {doneExercises}/{totalExercises}</Text>
      <ScrollView>
        {workout.exercisesList.map((item, index) =>
          <ExerciseItem
            navigateToExerciseScreen={() => navigation.navigate('Exercise', { exerciseIndex: index, workoutIndex })}
            key={index}
            exercise={{
              ...item.exerciseModelId,
              workoutId: workout.workoutId,
              scheduleId: contextData.userData.student.currentSchedule.scheduleId,
              ...item
            }}
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
