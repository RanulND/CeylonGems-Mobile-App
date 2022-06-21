import axios from "axios";
import {Alert} from 'react-native';

export const sumItems = cartItems => {
    return {
        itemCount: cartItems.reduce((total, prod) => total + prod.quantity , 0),
        total: cartItems.reduce((total, prod) => total + (prod.price * prod.quantity), 0)
    }
}

const cartReducer = (state, action) => {
    switch (action.type) {

        case 'INITIALIZE' : 
        console.log(state);
            return {
                ...state,
                ...action.payload,
                ...sumItems(state.cartItems)
            }

        case 'ADD_ITEM':
            // CHECK ITEM IN CART
            if (!state.cartItems.find(item => item.id == action.payload.id)) {
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1,
                })

                // console.log(action.payload)
                axios.post('http://192.168.1.41:5000/api/cart/addtocart', {
                    user: '61ed320383b29391c338d7c7', cartItems: {
                        product: action.payload.id,
                        quantity: 1,
                        price: action.payload.price,
                        photo: action.payload.photos,
                        title: action.payload.title
                    }
                }).then((res)=>{
                    Alert.alert('success');
                }).catch((error)=> {
                    Alert.alert(error.message);
                })
            }
            return {
                ...state,
                cartItems: [...state.cartItems],
                ...sumItems(state.cartItems)   
            }

        case 'INCREASE':
            const cartItems =  state.cartItems.map(item => {
                return {
                    ...item,
                    quantity: item.quantity + (item.id == action.payload.id ? 1 : 0)
                }
            })
            axios.post('http://192.168.1.41:5000/api/cart/increasecart', { user: '61ed320383b29391c338d7c7', product: action.payload.id }).then((res)=>{
                Alert.alert('success');
            }).catch((error)=> {
                Alert.alert(error.message);
            });
            return {
                ...state,
                cartItems: cartItems,
                ...sumItems(cartItems)
            }
            
        case 'DECREASE':
            const cartItemsNew =  state.cartItems.map(item => {
                if (item.quantity > 1) {
                    axios.post('http://192.168.1.41:5000/api/cart/decreasecart', { user: '61ed320383b29391c338d7c7', product: action.payload.id }).then((res)=>{
                        Alert.alert('success');
                    }).catch((error)=> {
                        Alert.alert(error.message);
                    });
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    }
                }

                return item;
            })
            
            return {
                ...state,
                cartItems: cartItemsNew,
                ...sumItems(cartItemsNew)
            }

        case 'REMOVE_ITEM':
            const newCartItems = state.cartItems.filter(item => item.id !== action.payload.id);
            axios.post('http://192.168.1.41:5000/api/cart/clearItemFromCart', { user: '61ed320383b29391c338d7c7', product: action.payload.id }).then((res)=>{
                Alert.alert('success');
            }).catch((error)=> {
                Alert.alert(error.message);
            });
            return {
                ...state,
                cartItems: [...newCartItems],
                ...sumItems(newCartItems),
            }
        case 'CLEAR':
            return {
                cartItems: [],
                itemCount: 0,
                total: 0,
            }
        default: return state;
    }
}

export default cartReducer;