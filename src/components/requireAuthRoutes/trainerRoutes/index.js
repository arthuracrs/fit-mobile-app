import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TrainerHomeScreen from './trainerHome'
import StudentsListScreen from './studentsListScreen';
import StudentProfileScreen from './studentProfile';
import WorkoutScreen from './workoutScreen';
import ExerciseScreen from './exerciseScreen';
import NewWorkoutForm from './NewWorkoutForm';
import NewExerciseForm from './NewExerciseForm';

const Stack = createNativeStackNavigator();

export default function TrainerRoutes() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TrainerHomeScreen} />
      <Stack.Screen name="StudentsList" component={StudentsListScreen} />
      <Stack.Screen name="StudentProfile" component={StudentProfileScreen} />
      <Stack.Screen name="Workout" component={WorkoutScreen} />
      <Stack.Screen name="Exercise" component={ExerciseScreen} />
      <Stack.Screen name="NewWorkoutForm" component={NewWorkoutForm} />
      <Stack.Screen name="NewExerciseForm" component={NewExerciseForm} />
    </Stack.Navigator>
  );
}
