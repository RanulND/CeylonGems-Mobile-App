import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Colors_def from "../constants/Colors";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, useCallback, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Button } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import SnackBar from "../components/SnackBar";
// import * as firebase from '../services/firebaseService'
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";
import firebaseConfig from "../services/firebaseService";
import "firebase/storage";
import { EditUser } from "../services/UserService";

const dimension = Dimensions.get("window");

// create a component
const EditProfileScreen = ({ navigation, route }) => {
  const profileInfo = route.params;

  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, seterrMsg] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [firstName, setFirstName] = useState(profileInfo.firstName);
  const [lastName, setLastName] = useState(profileInfo.lastName);
  const [nic, setNic] = useState(profileInfo.nic);
  const [tpno, setTpno] = useState(profileInfo.phoneNumber);
  const [photos, setPhotos] = useState("");

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const GemImageUpload = async () => {
    if (image) {
      const fileExtension = image.split(".").pop();
      console.log("EXT: " + fileExtension);

      var uuid = uuidv4();

      const fileName = `${uuid}.${fileExtension}`;
      console.log(fileName);

      var storageRef = firebaseConfig.storage().ref(`foods/images/${fileName}`);
      storageRef.putFile(image).on(
        firebaseConfig.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          console.log("snapshot: " + snapshot.state);
          console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

          if (snapshot.state === firebaseConfig.storage.TaskState.SUCCESS) {
            console.log("Success");
          }
        },
        (error) => {
          unsubscribe();
          console.log("image upload error: " + error.toString());
        },
        () => {
          storageRef.getDownloadURL().then((downloadUrl) => {
            console.log("File available at: " + downloadUrl);

            console.log(downloadUrl);
            // food.image = downloadUrl;

            // delete food.imageUri;

            // if (updating) {
            //   console.log("Updating....");
            //   updateFood(food, onFoodUploaded);
            // } else {
            //   console.log("adding...");
            //   addFood(food, onFoodUploaded);
            // }
          });
        }
      );
    } else {
      console.log("Skipping image upload");

      // delete food.imageUri;

      // if (updating) {
      //   console.log("Updating....");
      //   updateFood(food, onFoodUploaded);
      // } else {
      //   console.log("adding...");
      //   addFood(food, onFoodUploaded);
      // }
    }
  };

  const onGemPhotoChange = async () => {
    // document.getElementById("gemPhoto_spinner").style.display = "inline-block";
    let result = await DocumentPicker.getDocumentAsync({});
    const source = { uri: result.uri };
    console.log(source);
    console.log(result);
    const file = source;
    const storageRef = app.storage().ref("Gems/Images");
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(() => {
      console.log("Uploaded file", file.name);
      photos = fileRef.getDownloadURL(fileRef.ref).then((url) => {
        // setaddGem({ ...addGem, photos: url });
        console.log(url);
        // document.getElementById("gemPhoto_spinner").style.display = "none";
      });
    });
    console.log(addPhoto.photos);
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
        const data = {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: tpno,
          email: profileInfo.email,
          photos: profileInfo.photos,
        };
        console.log(data);
        const res = await EditUser(profileInfo._id, data);
        console.log(res);
        
      }
    } catch (err) {
      seterrMsg(err.response?.data?.msg || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View id="nic" style={styles.onView}>
          <Input label={"NIC"} placeholder={profileInfo.nic} secureTextEntry={false} IconName={"format-title"} style={{ flex: 1 }} canEdit={false} input={nic} setInput={setNic} disa />
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
          <Input label={"Telephone Number"} placeholder={profileInfo.phoneNumber} secureTextEntry={false} IconName={"format-title"} style={{ flex: 1 }} input={tpno} setInput={setTpno} />
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
    color: Colors_def.primary,
    fontWeight: "bold",
  },
  text: {
    paddingVertical: 20,
  },
  button: {
    backgroundColor: Colors_def.primary,
    color: "#fff",
    padding: 10,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
  },
  authText: {
    color: Colors_def.primary,
    fontWeight: "600",
  },
  buttonGroup: {
    backgroundColor: Colors_def.primary,
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
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 30,
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
    backgroundColor: Colors_def.primary,
    padding: 10,
    marginTop: dimension.width * 0.05,
    marginBottom: 10,
    width: dimension.width * 0.8,
    borderRadius: 15,
    opacity: 0.7,
  },
});

//make this component available to the app
export default EditProfileScreen;
