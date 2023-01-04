import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from "react-i18next";

import SignUpScreen from './signUp';
import SignInScreen from './signIn';

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" options={{ title: t("SignInScreen.title") }} component={SignInScreen} />
      <Stack.Screen name="SignUp" options={{ title: t("SignUpScreen.title") }} component={SignUpScreen} />
    </Stack.Navigator>
  );
}
