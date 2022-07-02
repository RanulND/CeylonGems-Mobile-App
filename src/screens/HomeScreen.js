import React, { Component, useLayoutEffect, useState, initialState, useContext, useEffect } from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { onChange } from "react-native-reanimated";
import image from "../../assets/gems.png";
import { SafeAreaView, SafeAreaProvider, SafeAreaInsetsContext, useSafeAreaInsets, initialWindowMetrics } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProductCard } from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";
import { Button } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
import { getAllGems, getHomeDirectGems} from '../services/GemService';
import { getHomeAuctionGems } from '../services/AuctionService';
import { getHomeJewelry } from '../services/JewelleryService';


const images = [
  "https://cdn.pixabay.com/photo/2016/02/08/07/42/diamond-1186139_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/02/27/13/31/diamond-3185447_1280.jpg",
  "https://cdn.pixabay.com/photo/2019/05/26/20/15/diamonds-4231176_1280.jpg",
];

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

import AddButton from "../components/AddButton";

// create a component
const HomeScreen = ({ navigation }) => {
  const { logout, role } = useAuth();

  const [auctionGems, setAuctionGems] = useState([]);
  const [directGems, setDirectGems] = useState([]);
  const [jewelry, setJewelry] = useState([]);

  const [imgActive, setimgActive] = useState(initialState);

  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide != imgActive) {
        setimgActive(slide);
      }
    }
  };

  function getAuctionGems() {
    getHomeAuctionGems()
      .then((res) => {
        setAuctionGems(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  function getDirectGems() {
    getAllGems()
      .then((res) => {
        setDirectGems(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  function getJewelry() {
    getHomeJewelry()
      .then((res) => {
        setJewelry(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    getAuctionGems();
    getDirectGems();
    getJewelry();
  },[])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          icon="logout"
          color="#051183"
          onPress={() => {
            logout();
          }}
        >
          LOGOUT
        </Button>
      ),
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.wrap}>
          <ScrollView onScroll={({ nativeEvent }) => onchange(nativeEvent)} showsHorizontalScrollIndicator={false} pagingEnabled horizontal style={styles.wrap}>
            {images.map((e, index) => (
              <Image key={e} resizeMode="stretch" style={styles.wrapImg} source={{ uri: e }} />
            ))}
          </ScrollView>
          <View style={styles.wrapDot}>
            {images.map((e, index) => (
              <Text key={e} style={imgActive == index ? styles.dotActive : styles.dot}>
                ●
              </Text>
            ))}
          </View>
          {/* <Image elevation={8} source={image} style={styles.caroulselAreaImage} />
      <View elevation={8} style={styles.categoryArea}>
        <Text style={styles.categoryText}> Categories </Text> */}
        </View>
        <Text style={styles.heading}>Stores</Text>
        <View style={styles.category}>
          <View style={styles.categoryCol}>
            <View style={styles.categoryCircle}>
              <FontAwesome5 name="gem" size={60} color="black" />
            </View>
            <Text>Buy Gems</Text>
          </View>
          <View style={styles.categoryCol}>
            <View style={styles.categoryCircle}>
              <MaterialCommunityIcons name="ring" size={60} color="black" />
            </View>
            <Text>Buy Jewelries</Text>
          </View>
          <View style={styles.categoryCol}>
            <View style={styles.categoryCircle}>
              <MaterialCommunityIcons name="lock-clock" size={60} color="black" />
            </View>
            <Text>Auction Gems</Text>
          </View>
        </View>
        {role != true ? <Text style={styles.heading}>Ongoing Auctions</Text> : <Text style={styles.heading}>Your Ongoing Auctions</Text>}
        <View style={styles.category}>
          <ScrollView horizontal>
            {auctionGems.map((gem) => (
              <TouchableOpacity key={gem._id} onPress={() => navigation.navigate("ProductDetailsScreen", gem)}>
                <ProductCard key={gem._id} photo={gem.photos} title={gem.title} price={gem.price} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {role != true ? <Text style={styles.heading}>Buy Jewellery</Text> : <Text style={styles.heading}>Your Jewellery</Text>}
        <View style={styles.category}>
          <ScrollView horizontal>
            {jewelry.map((gem) => (
              <TouchableOpacity key={gem._id} onPress={() => navigation.navigate("ProductDetailsScreen", gem)}>
                <ProductCard key={gem._id} photo={gem.photos} title={gem.title} price={gem.price} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {role != true ? <Text style={styles.heading}>Buy Gems</Text> : <Text style={styles.heading}>Your Gems</Text>}
        <View style={styles.category}>
          <ScrollView horizontal>
            {directGems.map((gem) => (
              <TouchableOpacity key={gem._id} onPress={() => navigation.navigate("ProductDetailsScreen", gem)}>
                <ProductCard key={gem._id} photo={gem.photos} title={gem.title} price={gem.price} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  categoryCol: {
    flexDirection: "column",
    width: "30%",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderColor: "black",
  },

  wrapImg: {
    width: WIDTH * 0.93,
    height: HEIGHT * 0.25,
    marginRight: 15,
    marginLeft: 15,
    alignSelf: "center",
    borderRadius: 20,
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
  caroulselArea: {
    borderRadius: 20,
    backgroundColor: "yellow",
    height: "25%",
    width: "95%",
    margin: 20,
  },
  caroulselAreaText: {
    fontSize: 20,
  },

  caroulselAreaImage: {
    height: "50%",
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    // position: "absolute",
  },
  categoryText: {
    fontSize: 35,
    fontWeight: 600,
    color: "#000000",
    fontWeight: "600",
    marginBottom: 10,
  },
  categoryArea: {
    fontSize: 20,
    paddingHorizontal: 4,
    paddingVertical: 6,
    marginHorizontal: "0.5%",
    marginBottom: 3,
    minWidth: "48%",
    maxWidth: "48%",
    textAlign: "left",
  },
  carouselContainer: {
    marginTop: 50,
  },
  // itemContainer: {
  //   width: ITEM_WIDTH,
  //   height: ITEM_HEIGHT,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: 'dodgerblue'
  // },
  itemLabel: {
    color: "white",
    fontSize: 24,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  wrapDot: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignSelf: "center",
  },
  dotActive: {
    margin: 3,
    color: "#5271FF",
  },
  dot: {
    margin: 3,
    color: "#B0BEFF",
  },
  heading: {
    fontSize: 30,
    alignSelf: "flex-start",
    margin: 5,
    marginLeft: 15,
    fontWeight: "600",
  },
  category: {
    flexDirection: "row",
    width: WIDTH * 0.94,
    height: HEIGHT * 0.22,
    backgroundColor: "#5271FF",
    // borderRadius: 15,
    margin: 12,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#5271FF",
    borderBottomWidth: 0,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 5,
    shadowRadius: 20,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryCircle: {
    borderRadius: 700,
    backgroundColor: "#B0BEFF",
    height: "57%",
    width: "90%",
    alignSelf: "center",
    marginTop: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  storeText: {},
});

//make this component available to the app
export default HomeScreen;
