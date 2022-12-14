import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState, useEffect } from "react";

import Exercice from '../../components/exercice'

export default function WorkoutScreen({ navigation, route }) {
  const { workout } = route.params

  const getDoneExercises = (exercisesList) => {
    let num = 0

    for (let i = 0; i < exercisesList.length; i++) {
      if (exercisesList[i].done === true) num++
    }

    return num
  }

  const [exercisesList, setExercisesList] = useState(workout.exercisesList);
  const [doneExercises, setDoneExercises] = useState(getDoneExercises(exercisesList));
  const totalExercices = exercisesList.length

  const handleUpdateDone = (id) => {
    const newStatus = !exercisesList[id].done
    exercisesList[id].done = newStatus
    setDoneExercises(getDoneExercises(exercisesList))
    setExercisesList(exercisesList)
  }

  const navigateToHome = (x) => navigation.navigate('Exercise', { exercise: x })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.name}</Text>
      <Text style={styles.progress}>Progress {doneExercises}/{totalExercices}</Text>
      <ScrollView>
        {exercisesList.map((x, id) =>
          <Exercice navigateToHome={() => navigateToHome(x)} key={id} item={x.exerciseModelId} id={id} handleUpdateDone={handleUpdateDone} />
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
