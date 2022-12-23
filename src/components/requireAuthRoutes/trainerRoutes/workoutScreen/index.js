import { StyleSheet, Text, View, ScrollView, Switch, TextInput, Button } from 'react-native';
import { useState, useEffect, useContext } from "react";

import AddNewExerciseButton from './addNewExerciseButton'
import Exercice from './exercise'
import NewExerciseForm from './NewExerciseForm'
import { GeneralStateContext } from '../../../../context'

export default function WorkoutScreen({ navigation, route }) {
  const { workoutIndex, studentIndex } = route.params
  const contextData = useContext(GeneralStateContext);

  const workout = contextData.trainerStudents[studentIndex].currentSchedule.workoutsList[workoutIndex]

  const [showNewExerciseForm, setShowNewExerciseForm] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const toggleSwitch = async () => setEditMode(x => !x)

  const getDoneExercises = (exercisesList) => {
    let num = 0

    for (let i = 0; i < exercisesList.length; i++)
      if (exercisesList[i].done === true) num++

    return num
  }
  const goBackHandler = () => setShowNewExerciseForm(x => !x)
  const doneExercises = getDoneExercises(workout.exercisesList)
  const totalExercices = workout.exercisesList.length

  return (
    <>
      {
        showNewExerciseForm ?
          <NewExerciseForm goBackHandler={goBackHandler} />
          :
          < View style={styles.container}>
            <Text style={styles.title}>{workout.name}</Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
              <Text style={styles.progress}>Progress {doneExercises}/{totalExercices}</Text>
              <View style={styles.switchContainer}>
                <Text style={{ fontSize: 20, fontWeight: '500' }}>Edit mode</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "darkgray" }}
                  thumbColor={editMode ? "lightgreen" : "#f4f3f4"}
                  onChange={toggleSwitch}
                  value={editMode}
                />
              </View>
            </View>
            <ScrollView>
              {editMode && <AddNewExerciseButton handler={() => setShowNewExerciseForm(x => !x)} />}
              {workout.exercisesList.map((item, index) =>
                <Exercice
                  navigateToExerciseScreen={() => navigation.navigate('Exercise', { exerciseIndex: index, workoutIndex, studentIndex })}
                  key={index}
                  exercise={{ workoutId: workout.workoutId, ...item }}
                  editMode={editMode}
                />
              )}
            </ScrollView>
          </View>}
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
