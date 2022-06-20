import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const CartCard = (props) => {
  const { title, photos, price, quantity, id, description, increase, decrease, removeProduct } = props;


  const product = { title, photos, price, quantity, id, description }

  return (
    <View style={styles.cardBody}>
      <View style={styles.imageView}>
        <Image source={{ uri: photos }} style={{ width: "100%", height: "100%", borderTopLeftRadius: 25, borderBottomLeftRadius: 20, overflow: 'hidden', alignContent: "space-around" }}>
        </Image>
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>
          {title}
        </Text>
        <Text style={styles.cardPrice}>
          RS.{price}
        </Text>
        <View>
        <TouchableOpacity style={styles.removeButton} onPress={() => removeProduct(product)}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
      </View>
      
      <View style={styles.cardButtons}>
        <TouchableOpacity onPress={() => increase(product)}>
          <Ionicons name="add-circle-sharp" size={30} color="#5271FF" />
        </TouchableOpacity>
        <Text>
          {quantity}
        </Text>
        <TouchableOpacity onPress={() => decrease(product)}>
          <Ionicons name="md-remove-circle" size={30} color="#5271FF" />
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
    overflow: 'hidden',
    margin: 5
  },
  imageView: {
    height: '100%',
    width: '30%',

  },
  cardImage: {
    height: '100%',
    width: '100%',
    alignContent: "space-around"
    // aspectRatio:1
  },
  cardDetails: {
    alignItems: 'flex-start',
    height: '100%',
    width: '60%',
    // paddingTop: 15,
    paddingLeft: 25,
    justifyContent: 'space-around'
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
  },
  removeButton:{
    width: WIDTH*0.4,
    height: HEIGHT*0.03,
    backgroundColor:'red',
    borderTopRightRadius:6,
    borderTopLeftRadius:6,
    justifyContent:'center',
    alignItems:'center'
  },
  removeText:{
    fontSize:15,
    color:"#fff"
  }
})