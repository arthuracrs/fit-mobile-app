import { Alert, StyleSheet, Text, View, Switch, RefreshControl, ScrollView } from 'react-native';
import { useState, useContext } from "react";

import { GeneralStateContext } from '../../../context'
import { Auth } from '../../../services/authentication'
import { apiCall } from '../../../services/apiCalls'

export default function RefreshTrainerStudents({ children }) {

  const contextData = useContext(GeneralStateContext);
  const authContext = useContext(Auth.AuthenticationContext);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true)
    apiCall.getTrainerStudents(authContext.token)
      .then(function (data) {
        console.log('StudentsScreen | sucesso na busca de students')
        contextData.setTrainerStudents(data.students)
        setRefreshing(false)
      })
      .catch(function (error) {
        setRefreshing(false)
        console.log('StudentsScreen | erro na busca de students')
        setErrorloading(true)
        console.log(error);
      })
  }

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
    >
      {children}
    </ScrollView>
  );
}