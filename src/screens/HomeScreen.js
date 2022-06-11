import React, { Component, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, Image } from "react-native";
import AddButton from "../components/AddButton";
// import { useAuth } from "../contexts/.keep";

// create a component
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Home</Text>
      <AddButton onEvent={() => navigation.navigate("ProductAdd")} />
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
    width: "70%",
  },
  appButtonText: {
    fontSize: 18,
    color: "#5271FF",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  Image: {
    width: "84%",
    height: "60%",
  },
});

//make this component available to the app
export default HomeScreen;
