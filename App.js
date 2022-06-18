import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import NavContainer from "./src/navigation/Index";
import "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { initializeApp } from "firebase/app";
import React, { useEffect } from "react";
// import AuthProvider from "./src/contexts/AuthContext";

const App = () => {
  return (
    // <AuthProvider>
      <PaperProvider>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <NavContainer />
        </NavigationContainer>
      </PaperProvider>
    // </AuthProvider>
  );
};

export default App;
