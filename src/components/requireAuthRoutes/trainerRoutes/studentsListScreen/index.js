import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect, useContext } from "react";
import axios from 'axios'

import { GeneralStateContext } from '../../../../context'
import Loading from "../../../shared/loading";
import { CONSTANTS } from '../../../../consts'
import StudentItem from './studentItem'

export default function StudentsListScreen({ navigation }) {
  const contextData = useContext(GeneralStateContext);

  const [isLoading, setIsLoading] = useState(true)
  const [retry, setRetry] = useState(true)
  const [errorloading, setErrorloading] = useState(false)

  const handleRetry = () => {
    setErrorloading(false)
    setIsLoading(true)
    setRetry(!retry)
  }

  useEffect(() => {
    contextData.firebase.auth.currentUser.getIdToken(true).then(token => {
      axios.get(`${CONSTANTS.BACKEND_URL}/trainer/students`, {
        headers: {
          'authtoken': token,
        }
      })
        .then(function (response) {
          console.log('StudentsScreen | sucesso na busca de students')

          const result = response.data
          contextData.setTrainerStudents(result.students)
          setIsLoading(false)
        })
        .catch(function (error) {
          console.log('StudentsScreen | erro na busca de students')
          setErrorloading(true)
          console.log(error);
        })

    })
  }, [retry, contextData.shouldLoadCurrentSchedule])

  return (
    <>
      {isLoading ? <Loading handleRetry={handleRetry} error={errorloading} /> :
        <View style={styles.container}>
          <Text style={styles.title}>Students</Text>
          <ScrollView>
            {contextData.trainerStudents.map((student, index) =>
              <StudentItem key={index} item={student} navigateToStudentScreen={() => navigation.navigate('StudentProfile', { studentIndex: index })} />
            )}
          </ScrollView>
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
