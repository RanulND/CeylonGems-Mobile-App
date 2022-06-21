import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Colors_def from "../constants/Colors";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, useCallback, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as DocumentPicker from "expo-document-picker";
import SnackBar from "../components/SnackBar";
// import * as firebase from '../services/firebaseService'
import * as ImagePicker from "expo-image-picker";
import "firebase/storage";
import { EditUser } from "../services/UserService";

const dimension = Dimensions.get("window");

// create a component
const EditProfileScreen = ({ navigation, route }) => {
  const profileInfo = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, seterrMsg] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [firstName, setFirstName] = useState(profileInfo.firstName);
  const [lastName, setLastName] = useState(profileInfo.lastName);
  const [nic, setNic] = useState(profileInfo.nic);
  const [tpno, setTpno] = useState(profileInfo.phoneNumber);
  const [photos, setPhotos] = useState(profileInfo.photos);

  const [validFirstName, setValidFirstName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);
  const [validTpno, setValidTpno] = useState(true);
  const [validPhotos, setValidPhotos] = useState(true);

  const validateInputs = () => {
    const number_regex = /^([0-9 ]+)$/;
    const text_regex = /^([a-zA-Z ]+)$/;

    //validations
    setValidFirstName(!(firstName === "" || text_regex.test(firstName) === false));
    setValidLastName(!(lastName === "" || text_regex.test(lastName) === false));
    setValidTpno(!(tpno === "" || number_regex.test(tpno) === false));
    // setValidPhotos(!(photos === "" || text_regex.test(photos) === false));
    return (
      !(firstName === "" || text_regex.test(firstName) === false) && !(lastName === "" || text_regex.test(lastName) === false) && !(tpno === "" || number_regex.test(tpno) === false)
      //   !(photos === "" || text_regex.test(photos) === false)
    );
  };

  const [image, setImage] = useState(null);

  const pickImageProfile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setPhotos(result.uri);
      console.log(result.uri);
    }
  };

  const handleEditUser = async () => {
    try {
      setIsLoading(true);
      const valid = validateInputs();
      if (!valid) {
        seterrMsg("Please check entered data again and enter valid data for incorrect fields.");
        setSnackbarVisible(true);
        return;
      } else {
        const profileImg = await fetch(photos);
        const profileImgName = photos.substring(photos.lastIndexOf("/") + 1);
        const storageRefprofileImg = ref(getStorage(), " Users/ProfilePics" + profileImgName);
        const bytesprofileImg = await profileImg.blob();

        await uploadBytes(storageRefprofileImg, bytesprofileImg).then(() => {
          console.log("uploaded profile Img");
          getDownloadURL(storageRefprofileImg)
            .then((urlprofileImg) => {
              submitProfile(urlprofileImg);
            })
            .catch((e) => console.log("getting downloadURL of image error => ", e));
        });
      }
    } catch (err) {
      seterrMsg(err.response?.data?.msg || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const submitProfile = async (urlProfileImg) => {
    try {
      setIsLoading(true);
      const data = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: tpno,
        email: profileInfo.email,
        photos: urlProfileImg,
      };
      const res = await EditUser(profileInfo._id, data);
      console.log(res);
      navigation.navigate("Profile");
    } catch {
      console.log("Error occured");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View id="profilePic" style={styles.onView}>
          <MCIcons name="camera" size={20} style={styles.icon} color="white" onPress={() => pickImageProfile()} />
          {photos != "" && <Image source={{ uri: photos }} style={styles.avatar} />}
        </View>
        <View id="nic" style={styles.onView}>
          <Input label={"NIC"} placeholder={profileInfo.nic} secureTextEntry={false} IconName={"card-account-details"} style={{ flex: 1 }} canEdit={false} input={nic} setInput={setNic} />
        </View>
        <Text style={styles.label}>(You have to request admin to change your NIC)</Text>

        <View id="fName" style={styles.onView}>
          <Input label={"First Name"} placeholder={profileInfo.firstName} secureTextEntry={false} IconName={"format-title"} style={{ flex: 1 }} input={firstName} setInput={setFirstName} />
        </View>
        {validFirstName === false && (
          <View style={styles.errGroup}>
            <Text style={styles.errText}>Please enter a valid First Name</Text>
          </View>
        )}

        <View id="lName" style={styles.onView}>
          <Input label={"Last Name"} placeholder={profileInfo.lastName} secureTextEntry={false} IconName={"format-title"} style={{ flex: 1 }} input={lastName} setInput={setLastName} />
        </View>
        {validLastName === false && (
          <View style={styles.errGroup}>
            <Text style={styles.errText}>Please enter a valid Last Name</Text>
          </View>
        )}

        <View id="tpno" style={styles.onView}>
          <Input label={"Telephone Number"} placeholder={profileInfo.phoneNumber} secureTextEntry={false} IconName={"phone-classic"} style={{ flex: 1 }} input={tpno} setInput={setTpno} />
        </View>
        {validTpno === false && (
          <View style={styles.errGroup}>
            <Text style={styles.errText}>Please enter a valid Telephone Number</Text>
          </View>
        )}

        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="small" color="white" />
          </View>
        ) : (
          <TouchableOpacity style={[styles.buttonGroup, styles.button]} onPress={() => handleEditUser()}>
            <Text style={styles.btnText}>Update</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <SnackBar snackbarVisible={snackbarVisible} setSnackbarVisible={setSnackbarVisible} displayMsg={errMsg} barColor="red" />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  imageSq: {
    width: 100,
    height: 100,
    marginTop: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
  },
  header: {
    fontSize: 22,
    paddingTop: 0,
    color: Colors_def.default,
    fontWeight: "bold",
  },
  text: {
    paddingVertical: 20,
  },
  button: {
    backgroundColor: Colors_def.default,
    color: "#fff",
    padding: 10,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
  },
  authText: {
    color: Colors_def.default,
    fontWeight: "600",
  },
  buttonGroup: {
    backgroundColor: Colors_def.default,
    padding: 5,
    marginTop: dimension.width * 0.05,
    marginBottom: 10,
    width: dimension.width * 0.8,
    borderRadius: 15,
  },
  inputComponent: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors_def.default,
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
    fontWeight: "500",
    paddingHorizontal: 30,
    paddingVertical: 5,
    color: "#ff7800",
  },

  input: {
    borderRadius: 5,
    width: dimension.width * 0.8,
    paddingHorizontal: 15,
    textAlign: "justify",
    paddingVertical: 10,
    color: "#000",
    flex: 7,
  },

  inputGroup: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    // flex: 1,
    marginTop: 140,
    position: "absolute",
    padding: 7,
    backgroundColor: Colors_def.default,
    borderRadius: 15,
    zIndex: 1,
  },
  picker: {
    height: 50,
    width: 260,
  },
  onView: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  errText: {
    color: "red",
    textAlign: "center",
  },
  errGroup: {
    textAlign: "left",
    paddingBottom: 10,
    paddingHorizontal: 30,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
  },
  loader: {
    backgroundColor: Colors_def.default,
    padding: 10,
    marginTop: dimension.width * 0.05,
    marginBottom: 10,
    width: dimension.width * 0.8,
    borderRadius: 15,
    opacity: 0.7,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors_def.default,
    marginBottom: 10,
    alignSelf: "center",
    // position: "absolute",
    marginTop: 10,
  },
});

//make this component available to the app
export default EditProfileScreen;
