import { StyleSheet, Text, View, Share, ScrollView, Alert, ActivityIndicator, Switch, Button } from 'react-native';
import { useState, useEffect, useContext } from "react";
import axios from 'axios'

import { GeneralStateContext } from '../../../../context'
import Loading from "../../../shared/loading";
import { CONSTANTS } from '../../../../consts'
import { Auth } from '../../../../services/authentication'
import StudentItem from './studentItem'
import { apiCall } from '../../../../services/apiCalls'

export default function StudentsListScreen({ navigation }) {
  const contextData = useContext(GeneralStateContext);
  const authContext = useContext(Auth.AuthenticationContext)

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
      console.log(ticketId)
      const message = `${CONSTANTS.BACKEND_URL}/ticket/${ticketId}`
      const result = await Share.share({
        message
      });

      // if (result.action === Share.sharedAction) {

      //   if (result.activityType) {
      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {
      alert(error.message);
    }
  };

  const getTicketLink = () => {
    Alert.alert(
      //title
      'Confirmation',
      //body
      'Do you really want to genereate a invite link?',
      [
        { text: 'Yes', onPress: onShare },
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  }

  useEffect(() => {
    axios.get(`${CONSTANTS.BACKEND_URL}/trainer/students`, {
      headers: {
        'authtoken': authContext.token,
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

  }, [retry, contextData.shouldLoadCurrentSchedule])

  return (
    <>
      {isLoading ? <Loading handleRetry={handleRetry} error={errorloading} /> :
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Schedule</Text>
            <View style={styles.switchContainer}>
              <Text style={{ fontSize: 20, fontWeight: '500' }}>Edit mode</Text>
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
              title="Get Ticket Link"
              onPress={getTicketLink}
            />}
          {contextData.trainerStudents.length !== 0 &&
            <ScrollView>
              {contextData.trainerStudents.map((student, index) =>
                <StudentItem key={index} item={student} navigateToStudentScreen={() => navigation.navigate('StudentProfile', { studentIndex: index })} />
              )}
            </ScrollView>}
          {contextData.trainerStudents.length === 0 &&
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text>You do not have any students</Text>
              <Text>Share a ticket link to your students</Text>
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
