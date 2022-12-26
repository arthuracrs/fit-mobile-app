import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Switch, TextInput, Button } from 'react-native';
import { useState, useEffect, useContext } from "react";

import { GeneralStateContext } from '../../../../context'
import Workout from '../../../shared/workout';
import AddNewWorkoutButton from './addNewWorkoutButton'

export default function StudentProfileScreen({ navigation, route }) {
  const [editMode, setEditMode] = useState(false)
  const [showNewWorkoutForm, setShowNewWorkoutForm] = useState(false)

  const { studentIndex } = route.params

  const contextData = useContext(GeneralStateContext);
  const studentProfileData = contextData.trainerStudents[studentIndex]

  const toggleSwitch = async () => setEditMode(x => !x)

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Schedule</Text>
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
        {editMode && <AddNewWorkoutButton handler={
          () => navigation.navigate('NewWorkoutForm', {
            scheduleId: studentProfileData.currentSchedule.scheduleId
          })
        } />}
        <ScrollView>
          {studentProfileData.currentSchedule.workoutsList.map((workout, index) =>
            <Workout
              key={index}
              navigateToWorkoutScreen={() => navigation.navigate('Workout', { workoutIndex: index, studentIndex })}
              item={workout}
              editMode={editMode}
            />
          )}
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  switchContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingRight: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
  },
  progress: {
    fontSize: 18,
    color: 'gray',
    paddingBottom: 20
  }
});
