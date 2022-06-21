import axios from './ApiService'

export const payment = (payLoad) => axios.post('/pay/payment', payLoad);