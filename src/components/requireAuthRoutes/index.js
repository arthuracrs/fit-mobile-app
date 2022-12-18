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
  const [errorloading, setErrorloading] = useState(false)

  useEffect(() => {
    console.log('getUser | começou busca de usuario no DB')

    contextData.firebase.auth.currentUser.getIdToken(true).then(token => {
      axios.get(`${CONSTANTS.BACKEND_URL}/user`, {
        headers: {
          'authtoken': token,
        }
      })
        .then(function (response) {
          console.log('getUser | sucesso na busca de usuario no DB')
          const result = response.data
          console.log(result)
          contextData.setUserData(result)
          setIsLoading(false)
        })
        .catch(function (error) {
          setErrorloading(true)
          console.log(error);
        })
        
    })
  }, [contextData.updateRequireAuthRoutes])

  return (<>
    {
      isLoading ? <Loading error={errorloading} /> :
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
