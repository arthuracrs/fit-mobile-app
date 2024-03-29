import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

const srcPath = '../../../../../'

import { GeneralStateContext } from srcPath + 'context'
import Workout from '../../../shared/workout';
import RefreshStudentData from "../../../shared/refreshTrainerStudents copy";
import Loading from "../../../shared/loading";
import { CONSTANTS } from '../../../../consts'

export default function ScheduleScreen({ navigation }) {
  const contextData = useContext(GeneralStateContext);
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true)
  const [retry, setRetry] = useState(true)
  const [errorloading, setErrorloading] = useState(false)

  const handleRetry = () => {
    setErrorloading(false)
    setIsLoading(true)
    setRetry(!retry)
  }

  // useEffect(() => {
  //   contextData.firebase.auth.currentUser.getIdToken(true).then(token => {
  //     fetch(`${CONSTANTS.BACKEND_URL}/schedule/${contextData.userData.student.currentSchedule}`, {
  //       headers: {
  //         authtoken: token
  //       }
  //     })
  //       .then(response => response.json())
  //       .then((responseJson) => {
  //         console.log('ScheduleScreen | sucesso na busca de usuario no DB')

  //         contextData.setCurrentSchedule(responseJson)
  //         setIsLoading(false)
  //       })
  //       .catch(error => {
  //         setErrorloading(true)
  //         console.log(error)
  //       })
  //   })
  // }, [retry, contextData.shouldLoadCurrentSchedule])

  return (
    <>
      {/* {isLoading ? <Loading handleRetry={handleRetry} error={errorloading} /> : */}
      <RefreshStudentData>
        {contextData.userData.student?.currentSchedule != undefined ?
          <View style={styles.container}>
            <Text style={styles.title}>{contextData.userData.student.currentSchedule.name}</Text>
            <ScrollView>
              {contextData.userData.student.currentSchedule.workoutsList.map((workout, index) =>
                <Workout key={index} navigateToWorkoutScreen={() => navigation.navigate('Workout', { workoutIndex: index })} item={workout} />
              )}
            </ScrollView>
          </View>
          :
          <View style={{
            flex: 1,
            justifyContent: 'center',
          }}>
            <Text style={{ textAlign: 'center' }}>{t("StudentScheduleScreen.noSchedule")}</Text>
          </View>}
      </RefreshStudentData>
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
