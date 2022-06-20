import React, { Component, useLayoutEffect, useState, initialState, useContext } from "react";
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from "react-native-gesture-handler";
import { StoreProductCard } from "../components/StoreProductCard";
import { ProductContext} from "../context/ProductContext";
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const AuctionStoreScreen = ({navigation}) => {
  const {auctionGems} = useContext(ProductContext);
  return (
        <ScrollView>
            <View style={styles.wrap}>
            <Image source={require('../../assets/AuctionStore.png')} resizeMode = 'contain' style={styles.wrapImg}
            />
            </View>
           <View style={styles.cardHolder}>
             {
               auctionGems.map(gem => (
                <TouchableOpacity key= {gem._id} onPress={() => navigation.navigate('ProductDetailsScreen', gem)}>
                 <StoreProductCard key={gem._id} id={gem._id} photo={gem.photos} title={gem.title} price={gem.price} />
                 </TouchableOpacity>
               ))
             }  
         </View>  
        </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'flex-start',
        flexDirection:'column',
        alignItems: "center",
        backgroundColor: "white",
        padding: 0
      },
      homeImage: {
          height: HEIGHT*0.9,
          width: WIDTH*0.95,
      },
      wrapImg: {
        width: WIDTH * 0.93,
        height: HEIGHT * 0.25,
        marginRight: 15,
        marginLeft: 15,
        alignSelf: 'center',
        borderRadius: 25,
      },
      wrap: {
        width: WIDTH,
        height: HEIGHT * 0.25,
        margin: 0,

      },
      cardHolder: {
        flexDirection: 'row',
        marginRight: 15,
        marginLeft: 15,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }
    })

export default AuctionStoreScreen;