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
import { StripeProvider } from "@stripe/stripe-react-native";
// import AuthProvider from "./src/contexts/AuthContext";
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
              <StripeProvider publishableKey="pk_test_51L9jjXSFjlJf2mnz1zZbvs3gJQ5LiYJIJ4SNYkiqMcgGl9MxEUjyrKH0pFuIoNgPOXMt3FGNNJzP3twdKlaAUe7V00WhM9zVcX">
                <NavContainer />
              </StripeProvider>
            </CartContextProvider>
          </NavigationContainer>
        </PaperProvider>
      </ProductContextProvider>
    </AuthProvider>
  );
};

export default App;
