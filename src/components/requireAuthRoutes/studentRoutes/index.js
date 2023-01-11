import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from "react-i18next";


import StudentHomeScreen from './studentHome'
import WorkoutScreen from './workout';
import ExerciseScreen from './exerciseScreen';
import ScheduleScreen from './schedule';

const Stack = createNativeStackNavigator();

export default function StudentRoutes() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" options={{ headerShown: false, title: t("StudentHomeScreen.title") }} component={StudentHomeScreen} />
      <Stack.Screen name="Schedule" options={{ title: t("StudentScheduleScreen.title") }} component={ScheduleScreen} />
      <Stack.Screen name="Workout" options={{ title: t("StudentWorkoutScreen.title") }} component={WorkoutScreen} />
      <Stack.Screen name="Exercise" options={{ title: t("StudentExerciseScreen.title") }} component={ExerciseScreen} />
    </Stack.Navigator>
  );
}
