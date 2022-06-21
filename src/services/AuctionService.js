import axios from "./ApiService"

export const addAuction = (data) => axios.post('auction/add', data)

export const getAuctions = () => axios.get('gem/auction')

export const getHomeAuctionGems = () => axios.get('gem/home-gems1')