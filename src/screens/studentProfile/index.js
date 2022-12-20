import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect, useContext } from "react";

import { GeneralStateContext } from '../../context'
import Workout from '../../components/workout';
import Loading from "../../components/loading";
import { CONSTANTS } from '../../consts'

export default function StudentProfileScreen({ navigation, route }) {
  const { studentIndex } = route.params

  const contextData = useContext(GeneralStateContext);
  const studentProfileData = contextData.trainerStudents[studentIndex]

  return (
    <>

      <View style={styles.container}>
        <Text>{studentProfileData.userId}</Text>
        <Text style={styles.title}>Schedule</Text>

        <ScrollView>
        {studentProfileData.currentSchedule.workoutsList.map((workout, index) =>
            <Workout key={index} navigateToWorkoutScreen={() => navigation.navigate('Workout', { workoutIndex: index, studentIndex })} item={workout} />
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
