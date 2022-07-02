import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, Modal, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { UseParams } from "react-router-dom";
import { deleteGem, deleteJewel } from "../services/ProductService";
import { useAuth } from "../context/AuthContext";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ProductDetailsScren = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { role } = useAuth();

  const product = route.params;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.productContainer}>
          <Image source={{ uri: product.photos }} style={{ height: "100%", width: "100%" }}></Image>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.priceText}>Rs. {product.base_value}</Text>
          <Text style={styles.titleText}>{product.title}</Text>
          <View style={styles.rule} />
          <Text style={styles.descriptionText}>{product.description}</Text>
          {/* <View style={styles.rule} /> */}
          <View style={styles.rule} />
          <View>
            <Text style={styles.detailsText}>
              <FontAwesome5 name="gem" size={10} color="black" />
              <Text> </Text>
              Category: {product.category}
            </Text>
            <Text style={styles.detailsText}>
              <FontAwesome5 name="gem" size={10} color="black" />
              <Text> </Text>
              Colour: {product.colour}
            </Text>
            <Text style={styles.detailsText}>
              <FontAwesome5 name="gem" size={10} color="black" />
              <Text> </Text>
              Weight: {product.weight}
            </Text>
            <Text style={styles.detailsText}>
              <FontAwesome5 name="gem" size={10} color="black" />
              <Text> </Text>
              Origin: {product.origin}
            </Text>
            <Text style={styles.detailsText}>
              <FontAwesome5 name="gem" size={10} color="black" />
              <Text> </Text>
              Hardness: {product.hardness}
            </Text>
            <View style={styles.rule} />
          </View>
        </View>
        {role == true ? (
          <View style={styles.buttonHolder}>
            <TouchableOpacity style={styles.buyButton} onPress={() => navigation.navigate("ProductEdit", product._id)}>
              <MaterialIcons name="edit" size={24} color="black" />
              <Text> Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.delButton} onPress={() => setModalVisible(!modalVisible)}>
              <MaterialIcons name="delete" size={24} color="white" />
              <Text style={{ color: "#ffffff" }}> Delete</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonHolder}>
            <TouchableOpacity style={styles.buyButton}>
              <MaterialIcons name="attach-money" size={24} color="black" />
              <Text> Buy Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyButton}>
              <MaterialIcons name="add-shopping-cart" size={24} color="black" />
              <Text> Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Warning</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={{ fontWeight: "100" }}>Confirm to delete the product</Text>
              </View>
              <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonDelete]}
                onPress={() =>
                  product.product == "Gem"
                    ? deleteGem(product._id)
                        .then((res) => {
                          setModalVisible(!modalVisible);
                          navigation.navigate("Home");
                          Alert.alert(res.data);
                        })
                        .catch((err) => {
                          Alert.alert(err);
                        })
                    : deleteJewel(product._id)
                        .then((res) => {
                          setModalVisible(!modalVisible);
                          navigation.navigate("Home");
                          Alert.alert(res.data);
                        })
                        .catch((err) => {
                          Alert.alert(err);
                        })
                }
              >
                <Text style={styles.textStyle}>Delete</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  productContainer: {
    height: HEIGHT * 0.5,
    width: WIDTH * 0.975,
    borderColor: "#C8B6FF",
    borderWidth: 2,
    borderRadius: 20,
    elevation: 6,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  detailsContainer: {
    width: WIDTH * 0.98,
    paddingLeft: 3,
    marginTop: 10,
  },
  priceText: {
    fontSize: 27,
    fontWeight: "900",
    color: "orange",
  },

  titleText: {
    fontSize: 25,
    fontWeight: "900",
    marginBottom: 5,
  },
  descriptionText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 5,
  },
  detailsText: {
    justifyContent: "space-between",
    marginTop: 5,
    marginLeft: 15,
    fontSize: 15,
    fontWeight: "300",
    marginBottom: 5,
  },
  rule: {
    borderColor: "#8e9aaf",
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  },
  buyButton: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#B8C0FF",
    alignItems: "center",
    height: HEIGHT * 0.05,
    width: WIDTH * 0.45,
    borderRadius: 10,
    elevation: 1,
    margin: 8,
  },
  delButton: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#c70000",
    alignItems: "center",
    height: HEIGHT * 0.05,
    width: WIDTH * 0.45,
    borderRadius: 10,
    elevation: 1,
    margin: 8,
  },
  buttonHolder: {
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    paddingHorizontal: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: WIDTH * 0.95,
    maxHeight: HEIGHT * 0.85,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
  },
  buttonClose: {
    backgroundColor: "#555555",
  },
  buttonDelete: {
    backgroundColor: "#c70000",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    color: "#c70000",
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  inputGroup: {
    marginVertical: 15,
  },
});
export default ProductDetailsScren;
