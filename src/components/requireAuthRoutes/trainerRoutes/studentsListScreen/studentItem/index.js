import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { useState } from "react";

export default function StudentItem({ item, navigateToStudentScreen }) {

  const styles = StyleSheet.create({
    container: {
      borderRadius: 20,
      backgroundColor: 'lightgray',
      marginVertical: 10,
      height: 80,
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    text: {
      fontSize: 18,
      color: 'black',
      fontWeight: '700'
    }
  });
  
  return (
    <TouchableOpacity onPress={navigateToStudentScreen} >
      <View style={styles.container}>
        <Text style={styles.text}>{item.userId.hasOwnProperty('username') ? item.userId.username : item.userId.userId}</Text>
      </View>
    </TouchableOpacity>
  );
}



