import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { GetUser } from "../services/UserService";

// create a component
const ProfileScreen = ({ navigation }) => {
  idReq = {id : '627c94e5d3b2eef4e3f853b0'}

  const [profileInfo, setProfileInfo] = useState("");

  useEffect(() => {
    getGemTypesAll();
  }, []);

  const getGemTypesAll = async () => {
    try {
      // const data = await getGemType()
      // const type = data.data
      // console.log(type)
      const data = (await GetUser(idReq)).data.data;
      // console.log(data)
      setProfileInfo(data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{ uri: profileInfo.photos }} />
      <Text style={styles.name}> {profileInfo.firstName} {profileInfo.lastName} </Text>
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
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('EditProfile', profileInfo)}>
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
