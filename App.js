import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NavContainer from "./src/navigation/Index";
import ProductContextProvider from './src/context/ProductContext';
import "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { initializeApp } from "firebase/app";
import React, { useEffect } from "react";
import CartContextProvider from "./src/context/CartContext";

const App = () => {

  return (
    <ProductContextProvider>
      <PaperProvider>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <CartContextProvider>
            <NavContainer />
          </CartContextProvider>
        </NavigationContainer>
      </PaperProvider>
    </ProductContextProvider>
  );
};

export default App;
