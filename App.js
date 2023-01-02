import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { Auth } from "./src/services/authentication"

import { AppRoutes } from './src/components/appRoutes'
import { GeneralStateProvider } from './src/context'

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Auth.AuthenticationProvider>
        <GeneralStateProvider>
          <AppRoutes />
        </GeneralStateProvider>
      </Auth.AuthenticationProvider>
    </NavigationContainer>
  );
}
