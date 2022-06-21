import axios from "./ApiService";

export const getAllJewelry = () => axios.get('jewellery/all-jewellery')

export const getHomeJewelry = () => axios.get('gem/home-gems3')