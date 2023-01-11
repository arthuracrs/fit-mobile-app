import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

const navTheme = DefaultTheme;
navTheme.colors.background = 'white';

import { Auth } from "./src/services/authentication"
import { AppRoutes } from './src/components/appRoutes'
import { GeneralStateProvider } from './src/context'

import './src/translation/i18n'

export default function App() {

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="auto" />
      <Auth.AuthenticationProvider>
        <GeneralStateProvider>
          <AppRoutes />
        </GeneralStateProvider>
      </Auth.AuthenticationProvider>
    </NavigationContainer>
  );
}
