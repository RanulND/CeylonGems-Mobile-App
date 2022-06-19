import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { UseParams } from 'react-router-dom';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ProductDetailsScren = ({ route, navigation }) => {
  const product = route.params;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.productContainer}>
          <Image source={{ uri: product.photos }} style={{ height: '100%', width: '100%' }}></Image>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.priceText}>
            Rs. {product.price}
          </Text>
          <Text style={styles.titleText}>
            {product.title}

          </Text>
          <View style={styles.rule} />
          <Text style={styles.descriptionText}>
            {product.description}
          </Text>
          {/* <View style={styles.rule} /> */}
          <View style={styles.rule} />
          <View>
            <Text style={styles.detailsText}>
              <FontAwesome5 name="gem" size={10} color="black" /><Text> </Text>
              Category: {product.category}
            </Text>
            <Text style={styles.detailsText}>
              <FontAwesome5 name="gem" size={10} color="black" /><Text> </Text>
              Colour: {product.colour}
            </Text>
            <Text style={styles.detailsText}>
              <FontAwesome5 name="gem" size={10} color="black" /><Text> </Text>
              Weight: {product.weight}
            </Text>
            <Text style={styles.detailsText}>
              <FontAwesome5 name="gem" size={10} color="black" /><Text> </Text>
              Origin: {product.origin}
            </Text>
            <Text style={styles.detailsText}>
              <FontAwesome5 name="gem" size={10} color="black" /><Text> </Text>
              Hardness: {product.hardness}
            </Text>
            <View style={styles.rule} />
          </View>
        </View>
        <View style={styles.buttonHolder}>
          <TouchableOpacity style={styles.buyButton}>
            <MaterialIcons name="attach-money" size={24} color="black" />
            <Text>  Buy Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyButton}>
            <MaterialIcons name="add-shopping-cart" size={24} color="black" />
            <Text>   Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",

  },
  productContainer: {
    height: HEIGHT * 0.5,
    width: WIDTH * 0.975,
    borderColor: '#C8B6FF',
    borderWidth: 2,
    borderRadius: 20,
    elevation: 6,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailsContainer: {
    width: WIDTH * 0.98,
    paddingLeft: 3,
    marginTop: 10,
  },
  priceText: {
    fontSize: 27,
    fontWeight: '900',
    color: 'orange'
  },

  titleText: {
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 5
  },
  descriptionText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 5
  },
  detailsText: {
    justifyContent: 'space-between',
    marginTop: 5,
    marginLeft: 15,
    fontSize: 15,
    fontWeight: '300',
    marginBottom: 5
  },
  rule: {
    borderColor: '#8e9aaf',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  },
  buyButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#B8C0FF',
    alignItems: 'center',
    height: HEIGHT * 0.05,
    width: WIDTH * 0.45,
    borderRadius: 10,
    elevation: 1,
    margin: 8
  },
  buttonHolder: {
    flexDirection: 'row'
  }
})
export default ProductDetailsScren;