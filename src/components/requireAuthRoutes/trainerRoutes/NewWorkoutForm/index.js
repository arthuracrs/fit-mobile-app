import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";

import { GeneralStateContext } from '../../../../context'
import { CONSTANTS } from '../../../../consts'
import { Auth } from '../../../../services/authentication'
import { apiCall } from '../../../../services/apiCalls'

export default function NewWorkoutForm({ navigation, route }) {
  const { scheduleId } = route.params
  const contextData = useContext(GeneralStateContext);
  const authContext = useContext(Auth.AuthenticationContext);
  const [name, setName] = useState(false)
  const { t } = useTranslation();

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
    
    apiCall.createWorkout(authContext.token, data)
      .then(function (response) {
        console.log('NewWorkoutForm | sucesso na criação de Workout')

        contextData.setShouldLoadCurrentSchedule(x => !x)
        navigation.goBack()
      })
      .catch(function (error) {
        // setErrorloading(true)
        console.log('NewWorkoutForm | erro na criação de Workout')
        console.log(error);
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("TrainerNewWorkoutFormScreen.name")}:</Text>
      <TextInput
        style={styles.input}
        onChangeText={x => setName(x)}
        value={name}
        placeholder={t("TrainerNewWorkoutFormScreen.namePlaceholder")}
      />
      <Button style={styles.button} title={t("TrainerNewWorkoutFormScreen.addWorkout")} onPress={submit} />
    </View>
  )
}
