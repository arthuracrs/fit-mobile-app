import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NewExerciseFormStateProvider } from './context'

import ExerciseModelsCategoriesList from './exerciseModelsCategoriesList'
import ExerciseModelsCategory from './exerciseModelsCategory'
import Home from './home'

const Stack = createNativeStackNavigator();

export default function NewExerciseForm({ navigation, route }) {

  const { scheduleId, workoutId } = route.params

  return (
    <NewExerciseFormStateProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
          initialParams={{ scheduleId, workoutId }}
        />
        <Stack.Screen
          name="ExerciseModelsCategoriesList"
          component={ExerciseModelsCategoriesList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExerciseModelsCategory"
          component={ExerciseModelsCategory}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NewExerciseFormStateProvider>
  )
}