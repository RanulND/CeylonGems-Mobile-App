import React, { useContext } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const StoreProductCard = ({ photo, title, price, id }) => {

    const { addProduct, cartItems, incrase } = useContext(CartContext);
    const product = { title, photo, price, id }
    return (
        <View style={styles.cardBody}>
            <View style={styles.imageView}>
                <Image source={{ uri: photo }} style={{ width: "100%", height: "100%", borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden', alignContent: "space-around" }}></Image>
            </View>
            <View style={styles.titleView}>
                <Text style={styles.productTitle}>
                    {title}
                </Text>
            </View>
            <View style={styles.priceView}>
                <Text>
                    Rs.{price}
                </Text>
                <TouchableOpacity onPress={() => addProduct(product)}>
                    <MaterialIcons name="add-circle" size={28} color="#5271FF" />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    cardBody: {
        height: HEIGHT * 0.3,
        width: WIDTH * 0.4,
        flexDirection: "column",
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 5,
        shadowRadius: 20,
        elevation: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: 9,
        overflow: 'hidden'
    },
    imageView: {
        height: "72%",
        width: "100%"
    },
    productTitle: {
        fontWeight: '700',
        fontSize: 15,
    },
    productPrice: {
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
    priceView: {
        flexDirection: 'row',
        height: "12.5%",
        width: "100%",
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        marginLeft: 10
    }
})