import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Switch, TextInput, Button } from 'react-native';
import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

import { GeneralStateContext } from '../../../../context'

import NumberInput from './numberInput'

export default function AssessmentScreen({ navigation, route }) {
  const [editMode, setEditMode] = useState(false)
  const { t } = useTranslation();
  const { studentIndex } = route.params
  const [assessmentForm, setAssessmentForm] = useState({})

  const contextData = useContext(GeneralStateContext);
  const studentProfileData = contextData.trainerStudents[studentIndex]

  const toggleSwitch = async () => setEditMode(x => !x)

  const inputFields = {
    inputNumber: {}
  }

  return (
    <>
      <ScrollView>
        <View style={styles.switchContainer}>
          <Text style={{ fontSize: 20, fontWeight: '500' }}>{t("TrainerStudentProfileScreen.editMode")}</Text>
          <Switch
            trackColor={{ false: "#767577", true: "darkgray" }}
            thumbColor={editMode ? "lightgreen" : "#f4f3f4"}
            onChange={toggleSwitch}
            value={editMode}
          />
        </View>
        <NumberInput fieldName='weight' editMode={editMode} formState={assessmentForm} setFormState={setAssessmentForm} />
        <NumberInput fieldName='height' editMode={editMode} formState={assessmentForm} setFormState={setAssessmentForm} />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    flexDirection: 'column'
  },
  switchContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingRight: 10,
    alignItems: 'center'
  },
});