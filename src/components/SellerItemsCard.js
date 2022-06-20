import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export const SellerItemsCard = ({title,price,photos}) => {
  return (
    <View style={styles.cardBody}>
      <View style={styles.imageView}>
        <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ceylongems-c41d2.appspot.com/o/Jewellery%2FImages%2FScreenshot%202022-03-17%20at%2002-41-50%20BAS1.png?alt=media&token=e0df7ce4-d402-4914-99b7-593cbf2a184d'}} style={{ width: "100%", height: "100%", borderTopLeftRadius: 25, borderBottomLeftRadius: 20, overflow: 'hidden', alignContent: "space-around" }}>
        </Image>
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>
          {title}
        </Text>
        <Text style={styles.cardPrice}>
         {price}
        </Text>
        <View>
        {/* <TouchableOpacity style={styles.removeButton} >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity> */}
      </View>
      </View>
      <View style={styles.cardButtons}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Product Details
          </Text>
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
    width: '45%',
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
    justifyContent: 'center'
  },
  button:{
    height:HEIGHT*0.6,
    width:WIDTH*0.25,
    backgroundColor: '#5271FF',
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonText: {
    fontSize: 20,
    color:'white'
  }

})