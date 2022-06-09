import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NavContainer from "./src/navigation/Index";
import "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { initializeApp } from "firebase/app";
import React, { useEffect } from "react";

const App = () => {

  return (
    <PaperProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <NavContainer />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
