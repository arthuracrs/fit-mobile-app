import { useContext, useEffect, useState } from "react";
import axios from 'axios'

import TrainerRoutes from './trainerRoutes'
import TypeOfAccountScreen from "./typeOfAccountScreen";

import Loading from "../shared/loading";
import StudentRoutes from "./studentRoutes";
import { GeneralStateContext } from '../../context'

import { CONSTANTS } from '../../consts'
import { Auth } from '../../services/authentication'

export default function RequireAuthRoutes() {
  const contextData = useContext(GeneralStateContext);
  const authContext = useContext(Auth.AuthenticationContext);

  const [isLoading, setIsLoading] = useState(true)
  const [retry, setRetry] = useState(true)
  const [errorloading, setErrorloading] = useState(false)

  const handleRetry = () => {
    setErrorloading(false)
    setIsLoading(true)
    setRetry(!retry)
  }

  useEffect(() => {
    console.log('RequireAuthRoutes | começou busca de usuario no DB')
    
    axios.get(`${CONSTANTS.BACKEND_URL}/user`, {
      headers: {
        'authtoken': authContext.token,
      }
    })
      .then(function (response) {
        console.log('RequireAuthRoutes | sucesso na busca de usuario no DB')

        const user = response.data
        contextData.setUserData(user)
        setIsLoading(false)
      })
      .catch(function (error) {
        setErrorloading(true)
        console.log(error);
      })
  }, [retry])

  return (<>
    {
      isLoading ? <Loading handleRetry={handleRetry} error={errorloading} /> :
        contextData.userData.type == ''
          ?
          <TypeOfAccountScreen />
          : contextData.userData.type == 'student'
            ? <StudentRoutes />
            : <TrainerRoutes />
    }
  </>
  );
}
