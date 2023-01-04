import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Switch, TextInput, Button } from 'react-native';
import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

import { GeneralStateContext } from '../../../../context'
import Workout from '../../../shared/workout';
import AddNewScheduleButton from './addNewScheduleButton'
import AddNewWorkoutButton from './addNewWorkoutButton'

export default function StudentProfileScreen({ navigation, route }) {
  const [editMode, setEditMode] = useState(false)
  const { t } = useTranslation();
  const { studentIndex } = route.params

  const contextData = useContext(GeneralStateContext);
  const studentProfileData = contextData.trainerStudents[studentIndex]
  
  const toggleSwitch = async () => setEditMode(x => !x)

  return (<>
    {
      studentProfileData.currentSchedule !== undefined ?
        <>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>{t("TrainerStudentProfileScreen.schedule")}</Text>
              <View style={styles.switchContainer}>
                <Text style={{ fontSize: 20, fontWeight: '500' }}>{t("TrainerStudentProfileScreen.editMode")}</Text>
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
            {/* {editMode && <AddNewScheduleButton handler={
              () => navigation.navigate('NewScheduleForm', {
                studentIndex
              })
            } />} */}
            {studentProfileData.currentSchedule.workoutsList.length !== 0 &&
              <ScrollView>
                {studentProfileData.currentSchedule.workoutsList.map((workout, index) =>
                  <Workout
                    key={index}
                    navigateToWorkoutScreen={() => navigation.navigate('Workout', { workoutIndex: index, studentIndex })}
                    item={workout}
                    scheduleId={studentProfileData.currentSchedule}
                    editMode={editMode}
                  />
                )}
              </ScrollView>}
            {studentProfileData.currentSchedule.workoutsList.length === 0 &&
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>{t("TrainerStudentProfileScreen.studentNoWorkout")}</Text>
                <Text>{t("TrainerStudentProfileScreen.clickEditAddWorkout")}</Text>
              </View>}
          </View>
        </>
        :
        <>
          <Text>{t("TrainerStudentProfileScreen.studentNoSchedule")}</Text>
          <Button title="Add Schedule" onPress={() => navigation.navigate('NewScheduleForm', { studentIndex })} />
        </>
    }
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
    fontSize: 35,
    fontWeight: '700',
  },
  progress: {
    fontSize: 18,
    color: 'gray',
    paddingBottom: 20
  }
});
