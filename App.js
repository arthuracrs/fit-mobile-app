import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Home from './src/screens/home'
import Workout from './src/screens/workout';

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Workout/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40
  },
});
