import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AddNewWorkoutButton({ handler }) {
  const { t } = useTranslation();
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
      fontSize: 20,
      color: 'black',
      fontWeight: '700',
    }
  });

  return (
    <TouchableOpacity onPress={handler} >
      <View style={styles.container}>
        <Text style={styles.text}>+ {t("AddNewWorkoutButton.title")}</Text>
      </View>
    </TouchableOpacity>
  );
}



