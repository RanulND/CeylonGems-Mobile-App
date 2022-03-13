import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

// create a component
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.head}>CeylonRuby</Text>
      <Button
        style={styles.button}
        title="Get Started"
        onPress={() => navigation.navigate("SettingsScreen")}
      />
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
});

//make this component available to the app
export default HomeScreen;
