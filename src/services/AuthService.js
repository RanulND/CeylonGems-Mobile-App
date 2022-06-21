import axios from './ApiService'

export const UserLogin = (payLoad) => axios.post('/auth/signin', payLoad);

export const UserRegister = (payLoad) => axios.post('/auth/signup', payLoad);

export const UserForgetPassword = (payLoad) => axios.post('/auth/forgotpassword', payLoad);

export const VerifyEmail = (payLoad) => axios.post('/auth/verifyuseremailOTP', payLoad);

export const ResendVerifyEmail = (payLoad) => axios.post('/auth/verifyuseremail', payLoad);

export const VerifyOTP = (payLoad) => axios.post('/auth/resetpasswordOTP', payLoad);

export const ResendOTP = (payLoad) => axios.post('/auth/forgotpassword', payLoad);

export const PasswordUpdate = (payLoad) => axios.post('/auth/updatepassword', payLoad);