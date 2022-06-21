import axios from './ApiService'

export const getGemType = () => axios.get('/gem/get/gem-type');
export const AddGem = (payLoad) => axios.post('/gem/add', payLoad);
export const AddJewellery = (payLoad) => axios.post('/jewellery/add', payLoad);
export const getGemDetails = (id) => axios.get(`/gem/details/${id}`);
export const editGem = (id, payLoad) => axios.put(`gem/edit/${id}`, payLoad);
export const editJewelry = (id, payLoad) => axios.put(`jewellery/edit/${id}`, payLoad);
export const deleteGem = (id) => axios.delete(`gem/delete/${id}`);
export const deleteJewel = (id) => axios.delete(`jewellery/delete/${id}`);