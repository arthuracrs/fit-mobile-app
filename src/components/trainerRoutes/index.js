import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TrainerHomeScreen from '../../screens/trainerHome'
import StudentsScreen from '../../screens/students';
import StudentProfileScreen from '../../screens/studentProfile';

import workoutTrainerViewScreen from '../../screens/workoutTrainerView';
import ExerciseScreen from '../../screens/exercise';

const Stack = createNativeStackNavigator();

export default function TrainerRoutes() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TrainerHomeScreen} />
      <Stack.Screen name="Students" component={StudentsScreen} />
      <Stack.Screen name="StudentProfile" component={StudentProfileScreen} />
      <Stack.Screen name="Workout" component={workoutTrainerViewScreen} />
      <Stack.Screen name="Exercise" component={ExerciseScreen} />
    </Stack.Navigator>
  );
}
