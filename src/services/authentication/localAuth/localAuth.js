import axios from "axios"

const loginServiceUrl = 'http://localhost:4001'

const defaultTrainerData = {
    email: 'trainer@fit.test',
    password: 'Aaaaaa'
}

export const SignUpAsTrainer = async (trainerData = defaultTrainerData) => {
    try {
        return (await axios.post(`${loginServiceUrl}/register`, trainerData)).data.token
    } catch (error) {

    }
}

export const SignInAsTrainer = async (trainerData = defaultTrainerData) => {

    return (await axios.post(`${loginServiceUrl}/login`, trainerData)).data.token
}

const studentData = {
    email: 'student@fit.test',
    password: 'Aaaaaa'
}

export const SignUpAsStudent = async () => {
    try {
        return (await axios.post(`${loginServiceUrl}/register`, studentData)).data.token
    } catch (error) {

    }
}

export const SignInAsStudent = async () => {
    return (await axios.post(`${loginServiceUrl}/login`, studentData)).data.token
}

const backofficeData = {
    email: 'student@fit.test',
    password: 'Aaaaaa'
}

export const SignUpAsBackoffice = async () => {
    try {
        return (await axios.post(`${loginServiceUrl}/register`, studentData)).data.token
    } catch (error) {

    }
}

export const SignInAsBackoffice = async () => {
    return (await axios.post(`${loginServiceUrl}/login`, backofficeData)).data.token
}
