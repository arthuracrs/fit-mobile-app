import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StudentHomeScreen from '../../screens/studentHome'
import WorkoutScreen from '../../screens/workout';
import ExerciseScreen from '../../screens/exercise';
import ScheduleScreen from '../../screens/schedule';

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
