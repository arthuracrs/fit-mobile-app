import { useContext, useEffect, useState } from "react";
import axios from 'axios'

import Loading from "../../components/loading";
import StudentRoutes from "../../components/studentRoutes";
import TrainerHomeScreen from '../../screens/trainerHome'
import TypeOfAccountScreen from "../../screens/typeOfAccount";

import { GeneralStateContext } from '../../context'

import { CONSTANTS } from '../../consts'

export default function RequireAuthRoutes() {
  const contextData = useContext(GeneralStateContext);

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

    contextData.firebase.auth.currentUser.getIdToken(true).then(token => {
      axios.get(`${CONSTANTS.BACKEND_URL}/user`, {
        headers: {
          'authtoken': token,
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

    })
  }, [contextData.updateRequireAuthRoutes, retry])

  return (<>
    {
      isLoading ? <Loading handleRetry={handleRetry} error={errorloading} /> :
        contextData.userData.type == ''
          ?
          <TypeOfAccountScreen />
          : contextData.userData.type == 'student'
            ? <StudentRoutes />
            : <TrainerHomeScreen />
    }
  </>
  );
}
