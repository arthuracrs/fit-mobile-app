import { StyleSheet, Text, View, Share, ScrollView, Alert, ActivityIndicator, Switch, Button } from 'react-native';
import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

import { GeneralStateContext } from '../../../../context'
import Loading from "../../../shared/loading";
import { CONSTANTS } from '../../../../consts'
import { Auth } from '../../../../services/authentication'
import StudentItem from './studentItem'
import { apiCall } from '../../../../services/apiCalls'

export default function StudentsListScreen({ navigation }) {
  const contextData = useContext(GeneralStateContext);
  const authContext = useContext(Auth.AuthenticationContext)
  const { t } = useTranslation();

  const [editMode, setEditMode] = useState(false)
  const toggleSwitch = async () => setEditMode(x => !x)

  const [isLoading, setIsLoading] = useState(true)
  const [retry, setRetry] = useState(true)
  const [errorloading, setErrorloading] = useState(false)

  const handleRetry = () => {
    setErrorloading(false)
    setIsLoading(true)
    setRetry(!retry)
  }

  const onShare = async () => {
    try {
      const ticketId = (await apiCall.generateStudentTicket(authContext.token)).studentTicketId

      const message = `${CONSTANTS.BACKEND_URL}/ticket/${ticketId}`
      await Share.share({
        message
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    apiCall.getTrainerStudents(authContext.token)
      .then(function (data) {
        console.log('StudentsScreen | sucesso na busca de students')
        contextData.setTrainerStudents(data.students)
        setIsLoading(false)
      })
      .catch(function (error) {
        console.log('StudentsScreen | erro na busca de students')
        setErrorloading(true)
        console.log(error);
      })

  }, [retry, contextData.shouldLoadCurrentSchedule])

  return (
    <>
      {isLoading ? <Loading handleRetry={handleRetry} error={errorloading} /> :
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{t("TrainerStudentsListScreen.students")}</Text>
            <View style={styles.switchContainer}>
              <Text style={{ fontSize: 20, fontWeight: '500' }}>{t("TrainerStudentsListScreen.editMode")}</Text>
              <Switch
                trackColor={{ false: "#767577", true: "darkgray" }}
                thumbColor={editMode ? "lightgreen" : "#f4f3f4"}
                onChange={toggleSwitch}
                value={editMode}
              />
            </View>
          </View>
          {editMode &&
            <Button
              title={t("TrainerStudentsListScreen.getTicketLink")}
              onPress={onShare}
            />}
          {contextData.trainerStudents.length !== 0 &&
            <ScrollView>
              {contextData.trainerStudents.map((student, index) =>
                <StudentItem key={index} item={student} navigateToStudentScreen={() => navigation.navigate('StudentProfile', { studentIndex: index })} />
              )}
            </ScrollView>}
          {contextData.trainerStudents.length === 0 &&
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text>{t("TrainerStudentsListScreen.noStudentsText")}</Text>
              <Text>{t("TrainerStudentsListScreen.shareTicketToStudent")}</Text>
            </View>}
        </View>
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
    fontSize: 40,
    fontWeight: '700'
  },
  progress: {
    fontSize: 18,
    color: 'gray',
    paddingBottom: 20
  }
});
