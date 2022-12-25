import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState, useContext } from "react";
import axios from 'axios';

import { GeneralStateContext } from '../../../../../context'
import { CONSTANTS } from '../../../../../consts'

export default function NewExerciseForm({ goBackHandler, scheduleId }) {
  const contextData = useContext(GeneralStateContext);
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
    const data = {
      "exerciseModelId": "4b92b590-64f7-4978-ac5b-aadd3376dd95",
      "scheduleId": "f2e74885-8306-4d2e-a798-52f049ca38e4",
      "workoutId": "e69363ce-4979-4ea1-9bd6-247e2470ee5d"
    }

    contextData.firebase.auth.currentUser.getIdToken(true).then(token => {
      axios.post(`${CONSTANTS.BACKEND_URL}/exercise`, data, {
        headers: {
          'authtoken': token,
        }
      })
        .then(function (response) {
          console.log('NewExerciseForm | sucesso na criação de Workout')

          contextData.setShouldLoadCurrentSchedule(x => !x)
          goBackHandler()
          // const user = response.data
          // contextData.setUserData(user)
          // setIsLoading(false)
        })
        .catch(function (error) {
          // setErrorloading(true)
          console.log('NewExerciseForm | erro na criação de Workout')
          console.log(error);
        })

    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={x => setName(x)}
        value={name}
        placeholder="Exercise Name"
      />
      <Button style={styles.button} title="Add Exercise" onPress={submit} />
    </View>
  )
}
