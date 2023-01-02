import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState, useContext } from "react";
import axios from 'axios';

import { GeneralStateContext } from '../../../../context'
import { CONSTANTS } from '../../../../consts'
import { Auth } from '../../../../services/authentication'
import { apiCall } from '../../../../services/apiCalls'

export default function NewScheduleForm({ navigation, route }) {
  const { studentIndex } = route.params
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

      console.log('NewScheduleForm | sucesso na criação de Workout')
      contextData.setShouldLoadCurrentSchedule(x => !x)
      navigation.goBack()
    } catch (error) {
      console.log('NewScheduleForm | erro na criação de Workout')
      console.log(error);
    }


    // axios.post(`${CONSTANTS.BACKEND_URL}/schedule`, data, {
    //   headers: {
    //     'authtoken': token,
    //   }
    // })
    //   .then(function (response) {
    //     console.log('NewScheduleForm | sucesso na criação de Workout')

    //     contextData.setShouldLoadCurrentSchedule(x => !x)
    //     navigation.goBack()
    //     // const user = response.data
    //     // contextData.setUserData(user)
    //     // setIsLoading(false)
    //   })
    //   .catch(function (error) {
    //     // setErrorloading(true)
    //     console.log('NewScheduleForm | erro na criação de Workout')
    //     console.log(error);
    //   })


  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name: </Text>
      <TextInput
        style={styles.input}
        onChangeText={x => setName(x)}
        value={name}
        placeholder="Schedule Name"
      />
      <Button style={styles.button} title="Add Schedule" onPress={submit} />
    </View>
  )
}
