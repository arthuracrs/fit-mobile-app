import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState, useContext } from "react";
import axios from 'axios';

import { GeneralStateContext } from '../../../../context'
import { CONSTANTS } from '../../../../consts'

export default function NewWorkoutForm({ navigation, route }) {
  const { scheduleId } = route.params
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
      name,
      scheduleId
    }

    contextData.firebase.auth.currentUser.getIdToken(true).then(token => {
      axios.post(`${CONSTANTS.BACKEND_URL}/workout`, data, {
        headers: {
          'authtoken': token,
        }
      })
        .then(function (response) {
          console.log('NewWorkoutForm | sucesso na criação de Workout')

          contextData.setShouldLoadCurrentSchedule(x => !x)
          navigation.goBack()
          // const user = response.data
          // contextData.setUserData(user)
          // setIsLoading(false)
        })
        .catch(function (error) {
          // setErrorloading(true)
          console.log('NewWorkoutForm | erro na criação de Workout')
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
        placeholder="Workout Name"
      />
      <Button style={styles.button} title="Add Workout" onPress={submit} />
    </View>
  )
}
