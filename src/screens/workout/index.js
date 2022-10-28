import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState, useEffect } from "react";

import Exercice from '../../components/exercice'

export default function Workout() {
  const exerciceFactory = (size) => {
    let exercices = []
    for (let i = 0; i < size; i++) {
      const newExercice = {
        name: 'Exercice ' + (i + 1),
        done: true
      }

      exercices.push(newExercice)
    }

    return exercices
  }

  const getDoneExercices = (exercicesList) => {
    let num = 0

    for (let i = 0; i < exercicesList.length; i++) {
      if(exercicesList[i].done === true) num++
    }

    return num
  }
  
  const title = 'Workout';
  const [exercicesList, setExercicesList] = useState(exerciceFactory(3));
  const [doneExercices, setDoneExercices] = useState(getDoneExercices(exercicesList));
  const totalExercices = exercicesList.length

  const handleUpdateDone = (id) => {
    const newStatus = !exercicesList[id].done
    exercicesList[id].done = newStatus
    setDoneExercices(getDoneExercices(exercicesList))
    setExercicesList(exercicesList)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.progress}>Progress {doneExercices}/{totalExercices}</Text>
      <ScrollView>
        {exercicesList.map((x, id) =>
          <Exercice key={id} item={x} id={id} handleUpdateDone={handleUpdateDone} />
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
