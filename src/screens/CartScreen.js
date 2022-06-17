import React, { useContext } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { CartCard } from '../components/CartCard';
import { CartContext } from '../context/CartContext';

export const CartScreen = () => {
  const { cartItems, increase, decrease, removeProduct } = useContext(CartContext);
  console.log('cartScreen iTems')
  console.log(cartItems);
  const funcs = { increase, decrease, removeProduct }
  return (
    <View>
      {
        cartItems.map(item => {
          <CartCard {...item} key={item.id} {...funcs} />
        })
      }
      <Text>
        hELLO
      </Text>
    </View>
  )
}
