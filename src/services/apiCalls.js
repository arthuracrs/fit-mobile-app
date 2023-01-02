import axios from 'axios'

import { CONSTANTS } from '../consts'

const setUserAsTrainer = async (token) => {
    const responseBody = (await axios.post(CONSTANTS.BACKEND_URL + '/trainer', {},
        {
            headers: {
                authToken: token
            }
        })
    ).data
    if (responseBody.error) throw new Error(responseBody.error)
    return responseBody
}

const linkStudentToTrainer = async (token, data) => {
    const responseBody = (await axios.get(CONSTANTS.BACKEND_URL + `/student/trainer/${data.trainerId}`)
        .set('authtoken', token)).body
    if (responseBody.error) throw new Error(responseBody.error)
    return responseBody
}

const getUser = async (token) => {
    const responseBody = (await axios.get(CONSTANTS.BACKEND_URL + '/user', {
        headers: {
            authToken: token
        }
    })).data
    if (responseBody.error) throw new Error(responseBody.error)
    return responseBody
}

const createExerciseModel = async (token, data) => {
    const responseBody = (await axios.post(CONSTANTS.BACKEND_URL + '/exerciseModel')
        .set('authtoken', token)
        .send(data)).body
    if (responseBody.error) throw new Error(responseBody.error)
    return responseBody
}

const createSchedule = async (token, data) => {
    const responseBody = (await axios.post(CONSTANTS.BACKEND_URL + '/schedule', data, {
        headers: {
            authToken: token
        }
    })).data

    if (responseBody.error) throw new Error(responseBody.error)
    return responseBody
}

const createWorkout = async (token, data) => {
    const responseBody = (await axios.post(CONSTANTS.BACKEND_URL + '/workout', data, {
        headers: {
            authToken: token
        }
    })).data
    if (responseBody.error) throw new Error(responseBody.error)
    return responseBody
}

const createExecise = async (token, data) => {
    const responseBody = (await axios.post(CONSTANTS.BACKEND_URL + '/exercise', data, {
        headers: {
            authToken: token
        }
    })).data
    if (responseBody.error) throw new Error(responseBody.error)
    return responseBody
}

const linkScheduleToStudent = async (token, data) => {
    const responseBody = (await axios.post(CONSTANTS.BACKEND_URL + `/student/${data.studentId}/schedule/${data.scheduleId}`, {}, {
        headers: {
            authToken: token
        }
    })).data

    if (responseBody.error) throw new Error(responseBody.error)
    return responseBody
}

const deleteWorkout = async (token, { workoutId, scheduleId }) => {
    const responseBody = (await axios.delete(`${CONSTANTS.BACKEND_URL}/workout/${workoutId}/schedule/${scheduleId}`, {
        headers: {
            'authtoken': token,
        }
    })).data

    if (responseBody.error) throw new Error(responseBody.error)
    return responseBody
}

const deleteExercise = async (token, { workoutId, exerciseId, scheduleId }) => {
    const responseBody = (await axios.delete(
        `${CONSTANTS.BACKEND_URL}/exercise/${exerciseId}/workout/${workoutId}/schedule/${scheduleId}`,
        {
            headers: {
                'authtoken': token,
            }
        })).data

    if (responseBody.error) throw new Error(responseBody.error)
    return responseBody
}

const createExerciseModelCategory = async (token, data) => {
    const responseBody = (await axios.post(CONSTANTS.BACKEND_URL + '/exerciseModelCategory')
        .set('authtoken', token)
        .send(data)).body
    if (responseBody.error) throw new Error(responseBody.error)
    return responseBody
}

const generateStudentTicket = async (token) => {
    const responseBody = (await axios.post(`${CONSTANTS.BACKEND_URL}/ticket`, {}, {
        headers: {
            authtoken: token
        }
    })).data
    if (responseBody.error) throw new Error(responseBody.error)
    return responseBody
}
const getExerciseModelsCategories = async (token) => {
    const responseBody = (await axios.get(`${CONSTANTS.BACKEND_URL}/exerciseModel`, {
        headers: {
            authtoken: token
        }
    })).data
    if (responseBody.error) throw new Error(responseBody.error)
    return responseBody
}

const changeExerciseDoneStatus = async (token, { workoutId, exerciseId, scheduleId, doneStatus }) => {
    const responseBody = (await axios.put(
        `${CONSTANTS.BACKEND_URL}/exercise/${exerciseId}/workout/${workoutId}/schedule/${scheduleId}/${doneStatus ? 'done' : 'undone'}`,
        {},
        {
            headers: {
                'authtoken': token,
            }
        })).data

    if (responseBody.error) throw new Error(responseBody.error)
    return responseBody
}

export const apiCall = {
    changeExerciseDoneStatus,
    getExerciseModelsCategories,
    generateStudentTicket,
    createExerciseModelCategory,
    deleteWorkout,
    setUserAsTrainer,
    linkStudentToTrainer,
    getUser,
    createExerciseModel,
    createSchedule,
    deleteExercise,
    createWorkout,
    createExecise,
    linkScheduleToStudent,
    changeExerciseDoneStatus,
}