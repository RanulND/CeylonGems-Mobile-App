import React, { Component, useLayoutEffect, useState, initialState, useContext } from "react";
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from "react-native-gesture-handler";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const GemStoreScreen = () => {
  return (
        <ScrollView>
            <View style={styles.wrap}>
            <Image source={require('../../assets/image.png')} resizeMode = 'contain' style={styles.wrapImg}
            />
            </View>
           <View>
               <Text>
                   hello
               </Text>
               
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
        borderRadius: 6,
      },
      wrap: {
        width: WIDTH,
        height: HEIGHT * 0.25,
        margin: 0,

      },
    })

export default GemStoreScreen;