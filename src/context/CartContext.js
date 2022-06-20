import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";
import {Alert} from 'react-native';
import cartReducer, { sumItems } from "./CartReducer";
import {useAuth} from '../contexts/AuthContext'
export const CartContext = createContext();
import {getCartItems} from'../services/CartService'

const CartContextProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const itemArray = [];
    const [state, dispatch] = useReducer(cartReducer, { cartItems: itemArray, ...sumItems(itemArray) });
    const addProduct = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
    const increase = (product) => dispatch({ type: 'INCREASE', payload: product });
    const decrease = (product) => dispatch({ type: 'DECREASE', payload: product })
    const removeProduct = (product) => dispatch({ type: 'REMOVE_ITEM', payload: product });
    const clearCart = () => dispatch({ type: 'CLEAR' });

    useEffect(() => {
        assignToArray();
        console.log(state)
    }, []);
    
    const assignToArray = () => {
        getCartItems('61ed320383b29391c338d7c7').then((res) => {
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
