import axios from './ApiService'

export const GetUser = (payLoad) => axios.post('/user/getuser', payLoad);
export const EditUser = (id, payLoad) => axios.put(`/auth/signup/register/${id}`, payLoad);