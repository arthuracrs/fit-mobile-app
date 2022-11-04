import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/home'
import WorkoutScreen from './src/screens/workout';
import ExerciceScreen from './src/screens/exercise';
import ScheduleScreen from './src/screens/schedule';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Workout" component={WorkoutScreen} />
          <Stack.Screen name="Exercise" component={ExerciceScreen} />
          <Stack.Screen name="Schedule" component={ScheduleScreen} />
        </Stack.Navigator>
      </View >
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});



