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
        <NumberInput fieldName='weight' formState={assessmentForm} setFormState={setAssessmentForm}/>
        <NumberInput fieldName='height' formState={assessmentForm} setFormState={setAssessmentForm}/>
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
});