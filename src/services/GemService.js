import axios from "./ApiService"

export const getAllGems = () => axios.get('gem/direct') 

export const getHomeDirectGems = () => axios.get('gem/home-gems2')

export const sellerProducts = (id) => axios.get(`gem/seller-products/${id}`)