import React from "react";
import { StyleSheet, View, Text, Dimensions, TextInput } from "react-native";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../context/AuthContext";

const dimension = Dimensions.get("window");

const Input = () => {
  const { logout } = useAuth();
  return <span onPress={() => logout()}/>;
};

export default Input;
