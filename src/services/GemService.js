import axios from "./ApiService"

export const getAllGems = () => axios.get('gem/direct') 

export const getHomeDirectGems = () => axios.get('gem/home-gems2')

export const gemAdd = (data) => axios.post("gem/add", data)

export const getGemTypes = () => axios.post("gem/type", "test")

export const editGem = (id, data) => axios.put("gem/edit/" + id, data)

export const getGemDetails = (id) => axios.post("gem/details/" + id, "")

export const sellerProducts = (id) => axios.get(`gem/seller-products/${id}`)