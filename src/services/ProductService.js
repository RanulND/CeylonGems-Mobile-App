import axios from './ApiService'

export const getGemType = () => axios.get('/gem/get/gem-type');
export const AddGem = (payLoad) => axios.post('/gem/add', payLoad);
export const AddJewellery = (payLoad) => axios.post('/jewellery/add', payLoad);