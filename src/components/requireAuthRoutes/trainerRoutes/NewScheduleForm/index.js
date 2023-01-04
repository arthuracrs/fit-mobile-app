import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";

import { GeneralStateContext } from '../../../../context'
import { CONSTANTS } from '../../../../consts'
import { Auth } from '../../../../services/authentication'
import { apiCall } from '../../../../services/apiCalls'

export default function NewScheduleForm({ navigation, route }) {
  const { studentIndex } = route.params
  const { t } = useTranslation();
  const contextData = useContext(GeneralStateContext);
  const authContext = useContext(Auth.AuthenticationContext);

  const studentProfileData = contextData.trainerStudents[studentIndex]
  
  const [name, setName] = useState(false)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 30
    },
    input: {
      borderWidth: 2,
      padding: 15,
      borderRadius: 10,
      marginBottom: 20
    },
    title: {
      fontSize: 25,
      fontWeight: '700',
      paddingBottom: 10,
      marginLeft: 10
    },
  });

  const submit = async () => {
    const newScheduleData = { name }
    try {
      const scheduleId = (await apiCall.createSchedule(authContext.token, newScheduleData)).scheduleId
      const linkScheduleToStudentData = {
        studentId: studentProfileData.userId,
        scheduleId
      }
      await apiCall.linkScheduleToStudent(authContext.token, linkScheduleToStudentData)

      console.log('NewScheduleForm | sucesso na criação de Schedule')
      contextData.setShouldLoadCurrentSchedule(x => !x)
      navigation.goBack()
    } catch (error) {
      console.log('NewScheduleForm | erro na criação de Schedule')
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("TrainerNewScheduleFormScreen.name")}: </Text>
      <TextInput
        style={styles.input}
        onChangeText={x => setName(x)}
        value={name}
        placeholder={t("TrainerNewScheduleFormScreen.namePlaceholder")}
      />
      <Button style={styles.button} title={t("TrainerNewScheduleFormScreen.addSchedule")} onPress={submit} />
    </View>
  )
}
