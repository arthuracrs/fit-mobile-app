import { StyleSheet, Text, View, ScrollView, Switch, TextInput, Button } from 'react-native';
import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

import AddNewExerciseButton from './addNewExerciseButton'
import Exercice from './exercise'
import { GeneralStateContext } from '../../../../context'

export default function WorkoutScreen({ navigation, route }) {
  const { t } = useTranslation();
  const { workoutIndex, studentIndex } = route.params
  const contextData = useContext(GeneralStateContext);

  const { scheduleId } = contextData.trainerStudents[studentIndex].currentSchedule
  const workout = contextData.trainerStudents[studentIndex].currentSchedule.workoutsList[workoutIndex]

  const [editMode, setEditMode] = useState(false)
  const toggleSwitch = async () => setEditMode(x => !x)

  const getDoneExercises = (exercisesList) => {
    let num = 0

    for (let i = 0; i < exercisesList.length; i++)
      if (exercisesList[i].done === true) num++

    return num
  }

  const doneExercises = getDoneExercises(workout.exercisesList)
  const totalExercices = workout.exercisesList.length

  return (
    <>
      < View style={styles.container}>
        <Text style={styles.title}>{workout.name}</Text>
        <View style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}>
          <Text style={styles.progress}>{t("TrainerWorkoutScreen.progress")} {doneExercises}/{totalExercices}</Text>
          <View style={styles.switchContainer}>
            <Text style={{ fontSize: 20, fontWeight: '500' }}>{t("TrainerWorkoutScreen.editMode")}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "darkgray" }}
              thumbColor={editMode ? "lightgreen" : "#f4f3f4"}
              onChange={toggleSwitch}
              value={editMode}
            />
          </View>
        </View>
        <Text style={{
          fontSize: 20,
          textAlign: 'left',
          borderTopWidth: 1,
          borderColor: 'gray',
          paddingTop: 10,
          marginTop: 10
        }}>Exercícios</Text>
        {editMode && <AddNewExerciseButton handler={
          () => navigation.navigate('NewExerciseForm', { scheduleId, workoutId: workout.workoutId })} />}
        {workout.exercisesList.length !== 0 &&
          <ScrollView>
            {workout.exercisesList.map((item, index) =>
              <Exercice
                navigateToExerciseScreen={() => navigation.navigate('Exercise', { exerciseIndex: index, workoutIndex, studentIndex })}
                key={index}
                exercise={{ workoutId: workout.workoutId, ...item, scheduleId }}
                editMode={editMode}
              />
            )}
          </ScrollView>}
        {workout.exercisesList.length === 0 &&
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>{t("TrainerWorkoutScreen.noExercises")}</Text>
            <Text>{t("TrainerWorkoutScreen.clickEditToAddExercises")}</Text>
          </View>}
      </View>
    </>
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
    fontWeight: '700',
    paddingBottom: 30
  },
  progress: {
    fontSize: 30,
    color: 'gray',
  },
  switchContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
