import { StyleSheet, Text, View, Switch } from 'react-native';
import { useState } from "react";

export default function Exercice({ item, handleUpdateDone, id }) {
  const [isEnabled, setIsEnabled] = useState(item.done);
  const toggleSwitch = () => { 
    handleUpdateDone(id)
    setIsEnabled(previousState => !previousState); 
  }

  const styles = StyleSheet.create({
    container: {
      borderRadius: 20,
      backgroundColor: isEnabled ? 'lightgreen' : 'lightgray',
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
    <View style={styles.container}>
      <Text style={styles.text}>{item.name}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "darkgray" }}
        thumbColor={isEnabled ? "lightgreen" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}


