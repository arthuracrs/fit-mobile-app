import { Alert, StyleSheet, Text, View, Switch, RefreshControl, ScrollView } from 'react-native';
import { useState, useContext } from "react";

import { GeneralStateContext } from '../../../context'
import { Auth } from '../../../services/authentication'
import { apiCall } from '../../../services/apiCalls'

export default function RefreshStudentData({ children }) {

  const contextData = useContext(GeneralStateContext);
  const authContext = useContext(Auth.AuthenticationContext);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true)
    apiCall.getUser(authContext.token)
      .then(user => {
        setRefreshing(false)
        console.log('RefreshStudentData | sucesso na busca')
        contextData.setUserData(user)
      })
      .catch(error => {
        setRefreshing(false)
        console.log('RefreshStudentData | erro na busca')
        console.log(error)
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