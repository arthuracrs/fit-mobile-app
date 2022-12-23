import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { useState } from "react";

export default function AddNewExerrciseButton({ handler }) {

  const styles = StyleSheet.create({
    container: {
      borderRadius: 20,
      backgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'lightgray',
      marginVertical: 10,
      height: 80,
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 22,
      color: 'black',
      fontWeight: '700',
    }
  });

  return (
    <TouchableOpacity onPress={handler} >
      <View style={styles.container}>
        <Text style={styles.text}>+ Add new exercise</Text>
      </View>
    </TouchableOpacity>
  );
}



