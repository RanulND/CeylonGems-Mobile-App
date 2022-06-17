import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from 'react-native-paper';


export const CartIcon = () => {
  const { itemCount, cartItems } = useContext(CartContext);
 

  return (
    <>
      <Badge container={{ position: 'absolute', top: -4, right: 2 }}>{itemCount}</Badge>
      <Ionicons name="cart-outline" size={24} color="black" />
    </>
  )
}
