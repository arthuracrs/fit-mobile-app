import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState, useEffect } from "react";

import Workout from '../../components/workout';

export default function ScheduleScreen({ navigation }) {

  const workoutFactory = (size) => {
    const exerciceFactory = (size) => {
      let exercices = []
      for (let i = 0; i < size; i++) {
        const newExercice = {
          name: 'Exercise ' + (i + 1),
          done: true,
          series: 5,
          repetitions: 102,
          interval: 30,
          mediaUrl: "https://i.pinimg.com/originals/d8/4c/e3/d84ce3448cc82ea9abe9ea7421bfc029.gif",
          media2: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/7471e64bf36dd74cb4c52b2dec40690b-1605191302/5%20workout%20gif/create-workout-exercise-gif-animation-in-photoshop.gif"
        }

        exercices.push(newExercice)
      }

      return exercices
    }

    let workouts = []

    for (let i = 0; i < size; i++) {
      const workout = {
        name: 'Workout ' + (i + 1),
        exercicesList: exerciceFactory(3),
      }

      workouts.push(workout)
    }

    return workouts
  }

  const title = 'Schedule';
  const [workoutList, setWorkoutList] = useState(workoutFactory(3));

  const handleUpdateDone = (id) => {
    const newStatus = !exercicesList[id].done
    exercicesList[id].done = newStatus
    setDoneExercices(getDoneExercices(exercicesList))
    setExercicesList(exercicesList)
  }

  const navigateToWorkoutScreen = (x) => navigation.navigate('Workout', { workout: x })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.progress}>Progress 1/3</Text>
      <ScrollView>
        {workoutList.map((workout, index) =>
          <Workout key={index} navigateToWorkoutScreen={() => navigateToWorkoutScreen(workout)} item={workout} />
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
