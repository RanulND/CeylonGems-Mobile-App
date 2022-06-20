import axios from "./ApiService"

export const getCartItems = (data) => axios.post('cart/getCart',
    { user: data })

export const addToCart = (data) => axios.post('cart/addtocart', { data }
)

export const increaseCart = (data) => axios.post('cart/increasecart', { data })

export const decreasecart = (data) => axios.post('cart/decreasecart', { data })

export const removeItem = (data) => axios.post('cart/clearItemFromCart', { data })