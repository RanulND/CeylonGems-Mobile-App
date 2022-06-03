import React from 'react'
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDetailsScren = () => {
  return (
   <SafeAreaView>
       <Text>
           Hello
       </Text>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
})
export default ProductDetailsScren;