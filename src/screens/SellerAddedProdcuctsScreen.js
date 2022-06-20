import React, { Component, useLayoutEffect, useState, initialState, useContext, useEffect } from "react";
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SellerItemsCard } from "../components/SellerItemsCard";
import { sellerGemProducts } from '../services/GemService';
import { useParams } from 'react-router-dom'

const SellerAddedProdcuctsScreen = () => {
    const { id } = useParams();
    const [sellerGems, setSellerGems] = useState([]);
    useEffect(() => {
        console.log(id);
        function getSellerProducts() {
            sellerGemProducts(id).then((res) => {
                setSellerGems(res.data);
                console.log(res.data);
            }
            ).catch((err) => {
                alert(err.message);
                setError(err);
            }).finally(() => {
                setLoading(false);
            });;
        }
        getSellerProducts();
    }, []);
    return (
        <View><Text>sellerAddedProdcuctsScreen</Text>
            {
                sellerGems.map((item) => (
                    <SellerItemsCard key={item.id} title={item.title} price={item.price} />))
            }
        </View>
    )
}
export default SellerAddedProdcuctsScreen;