import React, { Component, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  Image
} from "react-native";

// create a component
const WelcomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.head}>CeylonRuby</Text>
      <Image style={styles.Image} source={require('./../../assets/logo_W.png')}/>
      <TouchableOpacity style={styles.appButtonContainer} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.appButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5271FF",
  },
  head: {
    fontFamily: "",
    fontSize: 45,
    color: "white",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width:'70%',
  },
  appButtonText: {
    fontSize: 18,
    color: "#5271FF",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  Image: {
    width: '84%',
    height: '60%'
  }  
});

//make this component available to the app
export default WelcomeScreen;
