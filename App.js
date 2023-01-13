import { StatusBar } from 'expo-status-bar';
import { Platform, UIManager } from 'react-native'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const navTheme = DefaultTheme;
navTheme.colors.background = 'white';

import { Auth } from "./src/services/authentication"
import { AppRoutes } from './src/components/appRoutes'
import { GeneralStateProvider } from './src/context'

import './src/translation/i18n'

export default function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="auto" />
        <Auth.AuthenticationProvider>
          <GeneralStateProvider>
            <AppRoutes />
          </GeneralStateProvider>
        </Auth.AuthenticationProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
