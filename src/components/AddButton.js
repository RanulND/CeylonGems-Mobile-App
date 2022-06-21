import React from "react";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { TextInput } from "react-native-paper";
import Colors_def from "../constants/Colors";

const dimension = Dimensions.get("window");

const AddButton = ({ onEvent }) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onEvent}>
      <MCIcons name="plus-thick" size={40} style={styles.iconAdd} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: Colors_def.default,
    borderRadius: 50,
    width: 58,
    height: 58,
    alignItems: "center",
    marginRight: dimension.width * 0.07,
    alignSelf: "flex-end",
    marginBottom: dimension.height * 0.03,
    position: "absolute",
    bottom: 10,
    right: 10,
    elevation: 2
  },
  iconAdd: {
    flex: 1,
    paddingVertical: 7,
    paddingHorizontal: 7,
    color: "white",
  },
});

export default AddButton;
