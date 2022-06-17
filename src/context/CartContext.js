import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";
import {Alert} from 'react-native';
import cartReducer, { sumItems } from "./CartReducer";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {

    const itemArray = [];
    const [state, dispatch] = useReducer(cartReducer, { cartItems: itemArray, ...sumItems(itemArray) });
    const addProduct = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
    const increase = (product) => dispatch({ type: 'INCREASE', payload: product });
    const decrease = (product) => dispatch({ type: 'DECREASE', payload: product })
    const removeProduct = (product) => dispatch({ type: 'REMOVE_ITEM', payload: product });
    const clearCart = () => dispatch({ type: 'CLEAR' });

    useEffect(() => {
        assignToArray();
    }, []);
    
    const assignToArray = () => {
        axios.post('http://192.168.8.192:5000/api/cart/getCart',
            { user: "61ed320383b29391c338d7c7" }
        ).then((res) => {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
            console.log(res.data.data.cartItems)
            res.data.data.cartItems.map((item) => {
                itemArray.push({
                    id: item.product,
                    price: item.price,
                    quantity: item.quantity,
                    photos: item.photo,
                    title: item.title
                })
            }
            
            )
            dispatch({
                type: 'INITIALIZE', payload: {
                    cartItems: itemArray
                }
            })
        }).catch((error)=>{
            Alert.alert(error.message);
         })

    }

    const contextValues = {
        ...state,
        addProduct,
        increase,
        decrease,
        removeProduct,
        clearCart
    }

    return (
        <CartContext.Provider value={contextValues}>
            {
                children
            }
        </CartContext.Provider>)
}

export default CartContextProvider;
