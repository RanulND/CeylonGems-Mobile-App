import React from 'react'
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import gem from '../../assets/gem.png'; 

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const ProductCard = (props) => {
    return (
     
        <View style={styles.cardBody}>
            <View style={styles.imageView}>
            <Image source={{uri: props.photo}} style={{ width: "100%", height: "100%", borderTopLeftRadius: 20, borderTopRightRadius: 20,overflow:'hidden', alignContent:"space-around"}}></Image>
            </View>
            <View style={styles.titleView}>
            <Text style={styles.productTitle}>
                {props.title}
            </Text>
            </View>
            <View style={styles.priceView}>
            <Text>
                Rs.{props.price}
            </Text>
            </View>
        </View>
        
    )
}
const styles = StyleSheet.create({
    cardBody: {
        height: HEIGHT * 0.19,
        width: WIDTH*0.3,
        flexDirection: "column",
        backgroundColor:"white",
        borderWidth: 1,
        borderRadius: 20,
            borderColor: '#5271FF',
            borderBottomWidth: 0,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 5,
            shadowRadius: 20,
            elevation: 5,
            justifyContent: 'flex-start',
            alignItems:'flex-start',
            margin:4,
            overflow:'hidden'
    },
    imageView:{
        height: "72%",
        width: "100%",
    },
    productTitle: {
        fontWeight: '600',
        fontSize: 15,
    },
    productPrice:{
        fontSize: 17
    },
    titleView: {
        height: "12.5%",
        width: "100%",
        borderEndColor: 'red',
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceView:{
        height: "12.5%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    }
})