import axios from "./ApiService";

export const getAllJewelry = () => axios.get('jewellery/all-jewellery')

export const getHomeJewelry = () => axios.get('gem/home-gems3')

export const jewelryAdd = (data) => axios.post("jewellery/add", data)

export const editJewelry = (id, data) => axios.put("jewellery/edit/" + id, data)