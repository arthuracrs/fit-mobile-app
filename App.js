import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from './src/firebaseConfig'
import { AuthenticationProvider, AuthenticationContext } from "./src/services/authentication/localAuthContext"
import AuthRoutes from "./src/components/authRoutes";
import Loading from "./src/components/shared/loading";
import RequireAuthRoutes from "./src/components/requireAuthRoutes";

import { GeneralStateProvider } from './src/context'

export default function App() {
  const AppRoutes = () => {
    const authContext = useContext(AuthenticationContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      if (authContext.authenticateduser !== null) {
        console.log('onAuthStateChanged | autenticou')
        
        setIsLoading(false)
      } else {
        console.log('onAuthStateChanged | falha em autenticar')
        setLoggedUser(null)
        setIsLoading(false)
      }
    }, [authContext.authenticateduser])

    return (
      <>
        {isLoading ? <Loading /> :
          authContext.token ?
            <RequireAuthRoutes />
            : <AuthRoutes />
        }
      </>
    )
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AuthenticationProvider>
        <GeneralStateProvider>
          <AppRoutes />
        </GeneralStateProvider>
      </AuthenticationProvider>
    </NavigationContainer>
  );
}
