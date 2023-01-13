import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from "react-i18next";

import TrainerHomeScreen from './trainerHome'
import StudentsListScreen from './studentsListScreen';
import StudentProfileScreen from './studentProfile';
import WorkoutScreen from './workoutScreen';
import ExerciseScreen from './exerciseScreen';
import NewWorkoutForm from './NewWorkoutForm';
import NewExerciseForm from './NewExerciseForm';
import NewScheduleForm from './NewScheduleForm';
import AssessmentScreen from './assessmentScreen'
import DndScreen from './dnd'

const Stack = createNativeStackNavigator();

export default function TrainerRoutes() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TrainerHomeScreen} />
      <Stack.Screen name="StudentsList" options={{ title: t("TrainerStudentsListScreen.title") }} component={StudentsListScreen} />
      <Stack.Screen name="StudentProfile" options={{ title: t("TrainerStudentProfileScreen.title") }} component={StudentProfileScreen} />
      <Stack.Screen name="Workout" options={{ title: t("TrainerWorkoutScreen.title") }} component={WorkoutScreen} />
      <Stack.Screen name="Exercise" options={{ title: t("TrainerExerciseScreen.title") }} component={ExerciseScreen} />
      <Stack.Screen name="NewScheduleForm" options={{ title: t("TrainerNewScheduleFormScreen.title") }} component={NewScheduleForm} />
      <Stack.Screen name="NewWorkoutForm" options={{ title: t("TrainerNewWorkoutFormScreen.title") }} component={NewWorkoutForm} />
      <Stack.Screen name="NewExerciseForm" options={{ title: t("TrainerNewExerciseFormScreen.title") }} component={NewExerciseForm} />
      <Stack.Screen name="AssessmentScreen" options={{ title: t("TrainerAssessmentScreen.title") }} component={AssessmentScreen} />
      <Stack.Screen name="DndScreen" options={{ title: 'DnD' }} component={DndScreen} />
    </Stack.Navigator>
  );
}
