import axios from './ApiService'

export const UserLogin = (payLoad) => axios.post('/auth/signin', payLoad);

export const UserRegister = (payLoad) => axios.post('/auth/signup', payLoad);

export const UserForgetPassword = (payLoad) => axios.post('/auth/forgotpassword', payLoad);