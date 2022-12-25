import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { useState, useContext, useEffect } from "react";
import axios from 'axios';

import { GeneralStateContext } from '../../../../context'
import { CONSTANTS } from '../../../../consts'

export default function NewExerciseForm({ navigation, route }) {

  const { scheduleId, workoutId } = route.params
  const contextData = useContext(GeneralStateContext);

  const [name, setName] = useState(false)
  const [exerciseModels, setExerciseModels] = useState([])

  const submit = async () => {
    const data = {
      "exerciseModelId": "4b92b590-64f7-4978-ac5b-aadd3376dd95",
      scheduleId, workoutId
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
          navigation.goBack()
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

  const getExerciseModels = async () => {
    contextData.firebase.auth.currentUser.getIdToken(true).then(token => {
      axios.get(`${CONSTANTS.BACKEND_URL}/exerciseModel`, {
        headers: {
          'authtoken': token,
        }
      })
        .then(function (response) {
          console.log('getExerciseModels | sucesso')
          console.log(response.data)
          setExerciseModels(response.data.exerciseModels)

          // const user = response.data
          // contextData.setUserData(user)
          // setIsLoading(false)
        })
        .catch(function (error) {
          // setErrorloading(true)
          console.log('getExerciseModels | erro')
          console.log(error);
        })

    })
  }

  useEffect(() => {
    getExerciseModels()
  }, [])

  const exerciseModelItem = ({ item }) => (
    <View style={styles.exerciseModelItem}>
      <Text >{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={exerciseModels}
        renderItem={exerciseModelItem}
        numColumns={2}
        keyExtractor={item => item.exerciseModelId}
      />
    </View>
    // <View style={styles.container}>
    //   <Text style={styles.title}>Name:</Text>
    //   <TextInput
    //     style={styles.input}
    //     onChangeText={x => setName(x)}
    //     value={name}
    //     placeholder="Exercise Name"
    //   />
    //   <Button style={styles.button} title="Add Exercise" onPress={submit} />
    // </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'space-between',
    backgroundColor: 'gold',
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
  exerciseModelItem: {
    backgroundColor: 'lightgray',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '50%'
  }
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 30
//   },
//   input: {
//     borderWidth: 2,
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 20
//   },
//   title: {
//     fontSize: 25,
//     fontWeight: '700',
//     paddingBottom: 10,
//     marginLeft: 10
//   },
// });