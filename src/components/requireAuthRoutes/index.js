import { useContext, useEffect, useState } from "react";
import axios from 'axios'

import MissingFieldsForm from './MissingFieldsForm'
import TrainerRoutes from './trainerRoutes'
import TypeOfAccountScreen from "./typeOfAccountScreen";

import Loading from "../shared/loading";
import StudentRoutes from "./studentRoutes";
import { GeneralStateContext } from '../../context'

import { CONSTANTS } from '../../consts'
import { Auth } from '../../services/authentication'
import { apiCall } from '../../services/apiCalls'

export default function RequireAuthRoutes() {
  const contextData = useContext(GeneralStateContext);
  const authContext = useContext(Auth.AuthenticationContext);

  const [missingFields, setMissingFields] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [retry, setRetry] = useState(true)
  const [errorloading, setErrorloading] = useState(false)

  const handleRetry = () => {
    setErrorloading(false)
    setIsLoading(true)
    setRetry(!retry)
  }

  const getMissingProfileFields = (userData) => {
    const neededFields = ["username"]
    let missingFields = []
    for (const field of neededFields) {
      if (!userData.hasOwnProperty(field)) {
        missingFields.push(field)
      }
    }
    return missingFields
  }

  useEffect(() => {
    setIsLoading(true)
    console.log('RequireAuthRoutes | começou busca de usuario no DB')

    apiCall.getUser(authContext.token)
      .then(user => {
        console.log('RequireAuthRoutes | sucesso na busca de usuario no DB')
        setMissingFields(getMissingProfileFields(user))
        contextData.setUserData(user)
        setIsLoading(false)
      })
      .catch(function (error) {
        setErrorloading(true)
        console.log(error);
      })
  }, [retry, contextData.shouldLoadUser])

  return (<>
    {
      isLoading ? <Loading handleRetry={handleRetry} error={errorloading} />
        : missingFields.length !== 0
          ? <MissingFieldsForm missingFields={missingFields} />
          : contextData.userData.type == ''
            ? <TypeOfAccountScreen />
            : contextData.userData.type == 'student'
              ? <StudentRoutes />
              : <TrainerRoutes />
    }
  </>
  );
}
