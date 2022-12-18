import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from './src/firebaseConfig'
import AuthRoutes from "./src/components/authRoutes";
import Loading from "./src/components/loading";
import RequireAuthRoutes from "./src/components/requireAuthRoutes";

import { GeneralStateProvider, GeneralStateContext } from './src/context'

export default function App() {
  const contextData = useContext(GeneralStateContext);

  const [isLoading, setIsLoading] = useState(true)
  const [loggedUser, setLoggedUser] = useState(null)

  useEffect(() => {
    const sub = onAuthStateChanged(auth, async (authUser) => {
      if (authUser !== null) {
        console.log('onAuthStateChanged | autenticou')
        setLoggedUser(authUser)
      } else {
        console.log('onAuthStateChanged | falha em autenticar')
        setLoggedUser(null)
      }
      setIsLoading(false)
    });

    return sub
  }, [])

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <GeneralStateProvider>
        {isLoading ? <Loading /> :
          loggedUser ?
            <RequireAuthRoutes />
            : <AuthRoutes />
        }
      </GeneralStateProvider>
    </NavigationContainer>
  );
}
