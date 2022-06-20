import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import NavContainer from "./src/navigation/Index";
import ProductContextProvider from "./src/context/ProductContext";
import { Provider as PaperProvider } from "react-native-paper";
import firebaseConfig from "./src/services/firebaseService";
import { initializeApp } from "firebase/app";
import React, { useEffect } from "react";
import CartContextProvider from "./src/context/CartContext";
import AuthProvider from "./src/context/AuthContext";

initializeApp(firebaseConfig);

const App = () => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default App;
