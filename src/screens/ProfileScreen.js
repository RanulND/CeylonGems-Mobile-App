import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Switch } from "react-native";
import { GetUser } from "../services/UserService";
import { Button } from "react-native-paper";
import Colors_def from "../constants/Colors";
import { useAuth } from "../context/AuthContext";

// create a component
const ProfileScreen = ({ navigation }) => {
  const { currentUser } = useAuth();
  const { setRole, role } = useAuth();
  idReq = { id: currentUser._id };

  const [profileInfo, setProfileInfo] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setRole(!role);
  };

  useEffect(() => {
    getGemTypesAll();
    role == true ? setIsEnabled(true):setIsEnabled(false)
  }, []);

  const getGemTypesAll = async () => {
    try {
      const data = (await GetUser(idReq)).data.data;
      setProfileInfo(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {console.log(role)}
      <View style={styles.header}>
        <View
          style={{
            backgroundColor: "white",
            color: Colors_def.default,
            width: "35%",
            marginTop: 5,
            marginRight: 5,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            alignSelf: "flex-end",
          }}
        >
          <Text>Seller mode</Text>
          <Switch
            style={{ marginRight: 4 }}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? Colors_def.default : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <Image style={styles.avatar} source={{ uri: profileInfo.photos }} />
      <Text style={styles.name}>
        {" "}
        {profileInfo.firstName} {profileInfo.lastName}{" "}
      </Text>
      <View elevation={5} style={styles.userDetails}>
        <Text style={styles.userDetailsHeading}>User Details</Text>

        <View style={styles.row}>
          <View style={styles.userDetailsAll}>
            <Text style={styles.userDetailsValue}>{profileInfo.nic}</Text>
            <Text style={styles.userDetailsid}> NIC Number</Text>
          </View>
          <View style={styles.userDetailsAll}>
            <Text numberOfLines={1} style={styles.userDetailsValue}>
              {profileInfo.email}
            </Text>
            <Text style={styles.userDetailsid}> Email</Text>
          </View>
          <View style={styles.userDetailsAll}>
            <Text style={styles.userDetailsValue}>5</Text>
            <Text style={styles.userDetailsid}> Ongoing Bids</Text>
          </View>
          <View style={styles.userDetailsAll}>
            <Text style={styles.userDetailsValue}>7</Text>
            <Text style={styles.userDetailsid}> Bought Products</Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.bodyContent}>
          {/* <Text style={styles.info}>UX Designer / Mobile developer</Text>
          <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text> */}
          {role === true ? (
            <TouchableOpacity style={styles.buttonContainerAddProd} onPress={() => navigation.navigate("ProductAdd")}>
              <Text style={{ color: "white", fontSize: 20 }}>Add Product</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("EditProfile", profileInfo)}>
            <Text style={{ color: "white", fontSize: 20 }}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#5271FF",
    height: 300,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 75,
  },
  body: {
    marginTop: 90,
    // backgroundColor:"grey",
    height: "100%",
  },
  bodyContent: {
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
    alignSelf: "center",
    position: "absolute",
    marginTop: 185,
  },
  userDetails: {
    backgroundColor: "white",
    height: 180,
    width: "88%",
    borderRadius: 15,
    alignSelf: "center",
    position: "absolute",
    marginTop: 230,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 5,
    shadowOpacity: 0.25,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
  },
  userDetailsHeading: {
    fontSize: 17,
    color: "#000000",
    fontWeight: "600",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#5271FF",
    position: "absolute",
    marginTop: 300,
  },
  buttonContainerAddProd: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#5271FF",
    position: "absolute",
    marginTop: 250,
  },
  userDetailsAll: {
    fontSize: 20,
    paddingHorizontal: 4,
    paddingVertical: 6,
    marginHorizontal: "0.5%",
    marginBottom: 3,
    minWidth: "48%",
    maxWidth: "48%",
    textAlign: "left",
  },
  userDetailsid: {
    paddingTop: 0,
    color: "grey",
    fontSize: 15,
  },
  userDetailsValue: {
    fontSize: 20,
    textAlign: "left",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

//make this component available to the app
export default ProfileScreen;
