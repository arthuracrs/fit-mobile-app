import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StudentHomeScreen from './studentHome'
import WorkoutScreen from './workout';
import ExerciseScreen from './exercise';
import ScheduleScreen from './schedule';

const Stack = createNativeStackNavigator();

export default function StudentRoutes() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={StudentHomeScreen} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} />
      <Stack.Screen name="Workout" component={WorkoutScreen} />
      <Stack.Screen name="Exercise" component={ExerciseScreen} />
    </Stack.Navigator>
  );
}
