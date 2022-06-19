import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const CartCard = (props) => {
  const { title, photo, price, quantity, id, description, increase, decrease, removeProduct } = props;
  useEffect(()=>{
    console.log(title);
  },[]);
  
  const product = { title, photo, price, quantity, id, description }

  return (
    <View style={styles.cardBody}>
      <View style={styles.imageView}>
        <Image style={styles.cardImage} source={{ uri: props.photo }}>

        </Image>
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>
          {props.title}
        </Text>
        <Text style={styles.cardPrice}>
          {price}
        </Text>
      </View>
      <View style={styles.cardButtons}>
        <TouchableOpacity onPress={() => increase(product)}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </TouchableOpacity>
        <Text>
          {quantity}
        </Text>
        <TouchableOpacity onPress={() => decrease(product)}>
        <AntDesign name="minuscircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  cardBody: {
    height: HEIGHT * 0.15,
    width: WIDTH * 0.9,
    flexDirection: 'row',
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#fff',
    borderBottomWidth: 0,
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 4 },
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 5,
    // justifyContent: 'flex-start',
    // alignItems:'flex-start',
    overflow: 'hidden'
  },
  imageView: {
    height: '100%',
    width: '25%'

  },
  cardImage: {
    height: '100%',
    width: '100%'
  },
  cardDetails: {
    alignItems: 'flex-start',
    height: '100%',
    width: '60%',
    // paddingTop: 15,
    paddingLeft: 25,
    justifyContent: 'center'
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 18
  },
  cardPrice: {
    fontWeight: '400',
    fontSize: 25,
  },
  cardButtons: {
    flexDirection: 'column',
    height: '100%',
    width: '15%',
    justifyContent: 'space-evenly'
  }
})