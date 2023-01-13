import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

const srcPath = '../../../../../'

import ExerciseItem from './exerciseItem'
import { GeneralStateContext } from srcPath + 'context'
import RefreshStudentData from srcPath + "/components/shared/refreshStudentData";

export default function WorkoutScreen({ navigation, route }) {
  const { t } = useTranslation();
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
    <RefreshStudentData>
      <View style={styles.container}>
        <Text style={styles.title}>{workout.name}</Text>
        <Text style={styles.progress}>{t("StudentWorkoutScreen.progress")} {doneExercises}/{totalExercises}</Text>
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
    </RefreshStudentData>
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
