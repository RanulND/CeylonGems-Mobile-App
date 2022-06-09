import React from "react";
import { StyleSheet, View, Text, Dimensions, TextInput } from "react-native";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { TextInput } from "react-native-paper";
import Colors_def from "../constants/Colors";

const dimension = Dimensions.get("window");

const Input = ({ label, placeholder, secureTextEntry, IconName, input, setInput }) => {
  return (
    <View style={styles.inputComponent}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputGroup}>
        <MCIcons name={IconName} size={20} style={styles.icon} />
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          secureTextEntry={secureTextEntry}
          autoCorrect={false}
          onChangeText={ inp => setInput(inp)}
          value={input}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputComponent: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors_def.primary,
    width: "80%",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  label: {
    fontWeight: '500',
    paddingHorizontal: 30,
    paddingVertical: 10
  },

  input: {
    borderRadius: 5,
    width: dimension.width * 0.8,
    paddingHorizontal: 15,
    textAlign: 'justify',
    paddingVertical: 10,
    color: '#000',
    flex: 7,
  },

  inputGroup: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  icon: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 30,
  }
});

export default Input;
