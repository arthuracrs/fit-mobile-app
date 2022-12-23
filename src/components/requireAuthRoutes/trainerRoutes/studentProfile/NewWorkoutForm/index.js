import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from "react";

export default function NewWorkoutForm({ goBackHandler }) {
  const [name, setName] = useState(false)

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={x => setName(x)}
        value={name}
        placeholder="Workout Name"
      />
      <Button style={styles.button} title="Add Workout" onPress={goBackHandler} />
    </View>
  )
}
