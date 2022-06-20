import React, { useContext, useEffect } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { CartCard } from '../components/CartCard';
import { CartContext } from '../context/CartContext';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const CartScreen = () => {
  const { cartItems, increase, decrease, removeProduct,total, itemCount } = useContext(CartContext);
 

  const funcs = { increase, decrease, removeProduct }
  return (
    <>
      <ScrollView >
        <View style={styles.container}>
          {
            cartItems.map((item) => (
              <CartCard {...item} key={item.id} {...funcs} />
            ))

          }
        </View>
      </ScrollView>
      <View style={styles.checkoutContainer}>
        <View style={styles.cartAmountContainer}>
        <Text style={styles.cartAmount}>
          Cart Amont :</Text>
          <Text style={styles.cartTotal}> Rs. {total}</Text> 
          </View>

        <TouchableOpacity>
          <View style={styles.checkoutButton}><Text style={styles.checkoutText}>Checkout From Cart</Text></View>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "white",
    alignContent: 'center'
  },
  checkoutButton: {
    width: WIDTH * 0.8,
    height: HEIGHT * 0.06,
    backgroundColor: '#5271FF',
    borderRadius: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',

  },
  checkoutContainer: {
    width: WIDTH,
    height: HEIGHT * 0.1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',

  },
  checkoutText: {
    fontSize: 20,
    fontWeight: '800',
    color: 'white'
  },
  cartAmount:{
    fontSize: 18,
    fontWeight:'700'
  },
  cartAmountContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  cartTotal:{
    fontSize:18,
    fontWeight:'700',
    color:'#5271FF'
  }
})