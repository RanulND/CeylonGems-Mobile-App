import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Colors_def from "../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, useCallback, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AddGem, AddJewellery, getGemType } from "../services/ProductService";
import { Button } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import SnackBar from "../components/SnackBar";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const dimension = Dimensions.get("window");

// create a component
const AddProductScreen = ({ navigation }) => {

  const id = "623249291fc09a92f59e3953"

  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, seterrMsg] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [title, setTitle] = useState("");
  //change the category
  const [selectedGemType, setSelectedGemType] = useState("select");
  const [photos, setPhotos] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [hardness, setHardness] = useState("");
  const [colour, setColour] = useState("");
  const [origin, setOrigin] = useState("");
  const [quantity, setQuantity] = useState("");
  const [gemCertificate, setGemCertificate] = useState("tst");
  const [format, setFormat] = useState("select");
  const [baseValue, setBaseValue] = useState("");
  const [auctionDuration, setAuctionDuration] = useState("");
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("select");
  const [gemType, setGemType] = useState([]);
  const [singleFile, setSingleFile] = useState(null);
  const [purity, setPurity] = useState("");
  const [image, setImage] = useState("");

  const [validTitle, setValidTitle] = useState(true);
  //change the category
  const [validSelectedGemType, setValidSelectedGemType] = useState(true);
  const [validPhotos, setValidPhotos] = useState(true);
  const [validDescription, setValidDescription] = useState(true);
  const [validSize, setValidSize] = useState(true);
  const [validWeight, setValidWeight] = useState(true);
  const [validHardness, setValidHardness] = useState(true);
  const [validColour, setValidColour] = useState(true);
  const [validOrigin, setValidOrigin] = useState(true);
  const [validQuantity, setValidQuantity] = useState(true);
  const [validFormat, setValidFormat] = useState(true);
  const [validGemCertificate, setValidGemCertificate] = useState(true);
  const [validBaseValue, setValidBaseValue] = useState(true);
  const [validAuctionDuration, setValidAuctionDuration] = useState(true);
  const [validPrice, setValidPrice] = useState(true);
  const [validPurity, setValidPurity] = useState(true);

  const validateInputGem = () => {
    const number_regex = /^([0-9 ]+)$/;
    const text_regex = /^([a-zA-Z ]+)$/;

    //validations
    setValidTitle(!(title === "" || text_regex.test(title) === false));
    setValidSelectedGemType(!(selectedGemType === "select"));
    setValidFormat(!(format === "select"));
    setValidPhotos(!(photos === "" || text_regex.test(photos) === false));
    setValidDescription(!(description === "" || text_regex.test(description) === false));
    setValidSize(!(size === "" || number_regex.test(size) === false));
    setValidWeight(!(weight === "" || number_regex.test(weight) === false));
    setValidHardness(!(hardness === "" || number_regex.test(hardness) === false));
    setValidColour(!(colour === "" || text_regex.test(colour) === false));
    setValidOrigin(!(origin === "" || text_regex.test(origin) === false));
    setValidQuantity(!(quantity === "" || number_regex.test(quantity) === false));
    setValidGemCertificate(!(gemCertificate === "" || text_regex.test(gemCertificate) === false));
    setValidBaseValue(!(baseValue === "" || number_regex.test(baseValue) === false));
    setValidAuctionDuration(!(auctionDuration === "" || number_regex.test(auctionDuration) === false));
    setValidPrice(!(price === "" || number_regex.test(price) === false));
    return (
      !(title === "" || text_regex.test(title) === false) &&
      !(selectedGemType === "select_type") &&
      !(format === "select") &&
      // !(photos === "" || text_regex.test(photos) === false) &&
      !(description === "" || text_regex.test(description) === false) &&
      !(size === "" || number_regex.test(size) === false) &&
      !(weight === "" || number_regex.test(weight) === false) &&
      !(hardness === "" || number_regex.test(hardness) === false) &&
      !(colour === "" || text_regex.test(colour) === false) &&
      !(origin === "" || text_regex.test(origin) === false) &&
      !(quantity === "" || number_regex.test(quantity) === false) &&
      // !(gemCertificate === "" || text_regex.test(gemCertificate) === false) &&
      !(baseValue === "" || number_regex.test(baseValue) === false) &&
      !(auctionDuration === "" || number_regex.test(auctionDuration) === false)
      // !(price === "" || number_regex.test(price) === false)
    );
  };

  const validateInputJewel = () => {
    const number_regex = /^([0-9 ]+)$/;
    const text_regex = /^([a-zA-Z ]+)$/;

    //validations
    setValidTitle(!(title === "" || text_regex.test(title) === false));
    setValidDescription(!(description === "" || text_regex.test(description) === false));
    setValidQuantity(!(quantity === "" || number_regex.test(quantity) === false));
    setValidPrice(!(price === "" || number_regex.test(price) === false));
    setValidPurity(!(purity === "" || number_regex.test(purity) === false));
    return (
      !(title === "" || text_regex.test(title) === false) &&
      // !(photos === "" || text_regex.test(photos) === false) &&
      !(description === "" || text_regex.test(description) === false) &&
      !(purity === "" || number_regex.test(purity) === false) &&
      !(quantity === "" || number_regex.test(quantity) === false) &&
      // !(gemCertificate === "" || text_regex.test(gemCertificate) === false) &&
      !(price === "" || number_regex.test(price) === false)
    );
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    getGemTypesAll();

    
  }, []);

  const getGemTypesAll = async () => {
    try {
      const data = (await getGemType()).data.message[0].types;
      setGemType(data);
    } catch (err) {
      console.log(err);
    }
  };

  const pickImage = async () => {
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

  const pickImageCertificate = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setGemCertificate(result.uri);
      console.log(result.uri);
    }
  };

  const handleGemAdd = async () => {
    try {
      setIsLoading(true);
      const valid = validateInputGem();
      if (!valid) {
        seterrMsg("Please check entered data again and enter valid data for incorrect fields.");
        setSnackbarVisible(true);
        return;
      } else {
        const gemImg = await fetch(photos);
        const gemCert = await fetch(gemCertificate);
        const gemImgName = photos.substring(photos.lastIndexOf("/") + 1);
        const gemCertName = gemCertificate.substring(gemCertificate.lastIndexOf("/") + 1);

        const storageRefGemImg = ref(getStorage(), "Gems/Images" + gemImgName);
        const bytesGemImg = await gemImg.blob();

        const storageRefGemCert = ref(getStorage(), "Gems/Certificates" + gemCertName);
        const bytesGemCert = await gemCert.blob();

        await uploadBytes(storageRefGemImg, bytesGemImg).then(() => {
          console.log("uploaded Gem Img");
          getDownloadURL(storageRefGemImg)
            .then((urlGemImg) => {
              uploadBytes(storageRefGemCert, bytesGemCert).then(() => {
                console.log("uploaded Gem Certificate");
                getDownloadURL(storageRefGemCert)
                  .then((urlGemCert) => {
                    submitGem(urlGemImg, urlGemCert);
                  })
                  .catch((e) => console.log("getting downloadURL of image error => ", e));
              });
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

  const submitGem = async (urlGemImg, urlGemCert) => {
    try {
      setIsLoading(true);
      const data = {
        status: true,
        title: title,
        category: selectedGemType,
        photos: urlGemImg,
        description: description,
        size: size,
        weight: weight,
        hardness: hardness,
        colour: colour,
        origin: origin,
        quantity: quantity,
        gem_certificate: urlGemCert,
        format: format,
        base_value: baseValue,
        auc_duration: auctionDuration,
        product: "Gem",
        price: baseValue,
      };
      // console.log(data);
      const res = await AddGem(data);
      // console.log(res);
    } catch {
      console.log("Error occured");
    } finally {
      setIsLoading(false);
      Alert.alert("Gem added successfully!");
      setPhotos("");
      setDescription("");
      setSize("");
      setWeight("");
      setHardness("");
      setColour("");
      setOrigin("");
      setQuantity("");
      setGemCertificate("tst");
      setFormat("select");
      setBaseValue("");
      setAuctionDuration("");
      setPrice("");
      setProduct("");
      setPurity("");
    }
  };

  const handleJewelAdd = async () => {
    try {
      setIsLoading(true);
      const valid = validateInputJewel();
      if (!valid) {
        seterrMsg("Please check entered data again and enter valid data for incorrect fields.");
        setSnackbarVisible(true);
        return;
      } else {
        const jewelImg = await fetch(photos);
        const jewelImgName = photos.substring(photos.lastIndexOf("/") + 1);
        const storageRefjewelImg = ref(getStorage(), "Jewellery/Images" + jewelImgName);
        const bytesjewelImg = await jewelImg.blob();

        await uploadBytes(storageRefjewelImg, bytesjewelImg).then(() => {
          console.log("uploaded Gem Img");
          getDownloadURL(storageRefjewelImg)
            .then((urljewelImg) => {
              submitJewel(urljewelImg);
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

  const submitJewel = async (urljewelImg) => {
    try {
      setIsLoading(true);
      const data = {
        status: true,
        title: title,
        photos: urljewelImg,
        description: description,
        quantity: quantity,
        purity: purity,
        product: "Jewellery",
        price: price,
      };
      const res = await AddJewellery(data);
    } catch {
      console.log("Error occured");
    } finally {
      setIsLoading(false);
      Alert.alert("Jewelery added successfully!");
      setTitle("");
      setPhotos("");
      setDescription("");
      setQuantity("");
      setPurity("");
      setProduct("");
      setPrice("");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputComponent}>
          <Text style={styles.label}>Product Type</Text>
          <View style={styles.inputGroup}>
            <MCIcons name="language-ruby" size={20} style={styles.icon} />
            <Picker selectedValue={selectedProductType} style={styles.picker} onValueChange={(itemValue) => setSelectedProductType(itemValue)}>
              <Picker.item label="Select" key={1} value="select" />
              <Picker.Item label="Gem" key={2} value="gem" />
              <Picker.Item label="Jewelery" key={3} value="jewel" />
            </Picker>
          </View>
        </View>

        <View id="gemShow" style={{ display: selectedProductType === "gem" ? "flex" : "none", width: "100%", alignItems: "center" }}>
          <View id="title" style={styles.onView}>
            <Input label={"Title"} placeholder={"Title"} secureTextEntry={false} IconName={"format-title"} style={{ flex: 1 }} setInput={setTitle} />
          </View>
          {validTitle === false && (
            <View style={styles.errGroup}>
              <Text style={styles.errText}>Please enter a Title for the gem</Text>
            </View>
          )}

          <View style={styles.inputComponent}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.inputGroup}>
              <MCIcons name="format-list-bulleted-type" size={20} style={styles.icon} />
              <Picker selectedValue={selectedGemType} style={styles.picker} onValueChange={(itemValue) => setSelectedGemType(itemValue)}>
                {gemType.map((data) => (
                  <Picker.Item key={data} label={data} value={data} />
                ))}
              </Picker>
            </View>
          </View>
          {validSelectedGemType === false && (
            <View style={styles.errGroup}>
              <Text style={styles.errText}>Please select a gem type</Text>
            </View>
          )}

          <View style={styles.inputComponent}>
            <Text style={styles.label}>Image</Text>
            <View style={styles.inputGroup}>
              <MCIcons name="camera" size={20} style={styles.icon} />
              <Button mode="contained" style={styles.ImgPickBtn} color={Colors_def.default} onPress={() => pickImage()}>
                <Text>Pick an image</Text>
              </Button>
            </View>
          </View>
          {image != "" && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          <View id="description" style={styles.onView}>
            <Input label={"Description"} placeholder={"Description"} secureTextEntry={false} IconName={"format-title"} style={{ flex: 1 }} setInput={setDescription} />
          </View>
          {validDescription === false && (
            <View style={styles.errGroup}>
              <Text style={styles.errText}>Please enter a description</Text>
            </View>
          )}

          <View id="size" style={styles.onView}>
            <Input label={"Size"} placeholder={"Size"} secureTextEntry={false} IconName={"resize"} style={{ flex: 1 }} keyboard={1} setInput={setSize} />
          </View>
          {validSize === false && (
            <View style={styles.errGroup}>
              <Text style={styles.errText}>Please enter a valid size</Text>
            </View>
          )}

          <View id="weight" style={styles.onView}>
            <Input label={"Weight"} placeholder={"Weight"} secureTextEntry={false} IconName={"weight-gram"} style={{ flex: 1 }} keyboard={1} setInput={setWeight} />
          </View>
          {validWeight === false && (
            <View style={styles.errGroup}>
              <Text style={styles.errText}>Please enter a valid weight</Text>
            </View>
          )}

          <View id="hardness" style={styles.onView}>
            <Input label={"Hardness"} placeholder={"Hardness"} secureTextEntry={false} IconName={"numeric"} style={{ flex: 1 }} keyboard={1} setInput={setHardness} />
          </View>
          {validHardness === false && (
            <View style={styles.errGroup}>
              <Text style={styles.errText}>Please enter a valid hardness</Text>
            </View>
          )}

          <View id="colour" style={styles.onView}>
            <Input label={"Colour"} placeholder={"Colour"} secureTextEntry={false} IconName={"format-color-fill"} style={{ flex: 1 }} setInput={setColour} />
          </View>
          {validColour === false && (
            <View style={styles.errGroup}>
              <Text style={styles.errText}>Please enter a Colour</Text>
            </View>
          )}

          <View id="origin" style={styles.onView}>
            <Input label={"Origin"} placeholder={"Origin"} secureTextEntry={false} IconName={"format-title"} style={{ flex: 1 }} setInput={setOrigin} />
          </View>
          {validOrigin === false && (
            <View style={styles.errGroup}>
              <Text style={styles.errText}>Please enter the origin</Text>
            </View>
          )}

          <View id="quantity" style={styles.onView}>
            <Input label={"Quantity"} placeholder={"Quantity"} secureTextEntry={false} IconName={"numeric"} style={{ flex: 1 }} keyboard={1} setInput={setQuantity} />
          </View>
          {validQuantity === false && (
            <View style={styles.errGroup}>
              <Text style={styles.errText}>Please enter a valid quantity</Text>
            </View>
          )}

          <View style={styles.inputComponent}>
            <Text style={styles.label}>Gem Certificate</Text>
            <View style={styles.inputGroup}>
              <MCIcons name="camera" size={20} style={styles.icon} />
              <Button mode="contained" style={styles.ImgPickBtn} color={Colors_def.default} onPress={() => pickImageCertificate()}>
                <Text>Pick an image</Text>
                {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
              </Button>
            </View>
          </View>

          <View style={styles.inputComponent}>
            <Text style={styles.label}>Selling type</Text>
            <View style={styles.inputGroup}>
              <MCIcons name="language-ruby" size={20} style={styles.icon} />
              <Picker selectedValue={format} style={styles.picker} onValueChange={(itemValue) => setFormat(itemValue)}>
                <Picker.item label="Select" value="select" />
                <Picker.Item label="Auction" value="Auction" />
                <Picker.Item label="Direct selling" value="Direct" />
              </Picker>
            </View>
          </View>

          <View id="formatShow" style={{ display: format === "Auction" ? "flex" : "none", width: "100%", alignItems: "center" }}>
            <View id="base" style={styles.onView}>
              <Input label={"Base Value"} placeholder={"Base Value"} secureTextEntry={false} IconName={"cash"} style={{ flex: 1 }} keyboard={1} setInput={setBaseValue} />
            </View>
            {validBaseValue === false && (
              <View style={styles.errGroup}>
                <Text style={styles.errText}>Please enter a valid Base Value</Text>
              </View>
            )}
            <View id="duration" style={styles.onView}>
              <Input label={"Auction Duration"} placeholder={"Auction Duration"} secureTextEntry={false} IconName={"update"} style={{ flex: 1 }} keyboard={1} setInput={setAuctionDuration} />
            </View>
            {validAuctionDuration === false && (
              <View style={styles.errGroup}>
                <Text style={styles.errText}>Please enter a valid Auction Duration</Text>
              </View>
            )}
          </View>

          <View id="formatShow" style={{ display: format === "Direct" ? "flex" : "none", width: "100%", alignItems: "center" }}>
            <View id="price" style={styles.onView}>
              <Input label={"Price"} placeholder={"Price"} secureTextEntry={false} IconName={"cash"} style={{ flex: 1 }} keyboard={1} setInput={setBaseValue} />
            </View>
            {validBaseValue === false && (
              <View style={styles.errGroup}>
                <Text style={styles.errText}>Please enter a valid Price</Text>
              </View>
            )}
          </View>

          {isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <TouchableOpacity style={[styles.buttonGroup, styles.button]} onPress={() => handleGemAdd()}>
              <Text style={styles.btnText}>Proceed</Text>
            </TouchableOpacity>
          )}
        </View>

        <View id="jewelShow" style={(styles.onView, { display: selectedProductType === "jewel" ? "flex" : "none", width: "100%", alignItems: "center" })}>
          <View id="title" style={styles.onView}>
            <Input label={"Title"} placeholder={"Title"} secureTextEntry={false} IconName={"format-title"} style={{ flex: 1 }} setInput={setTitle} />
          </View>
          {validTitle === false && (
            <View style={styles.errGroup}>
              <Text style={styles.errText}>Please enter a Title for the Jewelery</Text>
            </View>
          )}

          <View style={styles.inputComponent}>
            <Text style={styles.label}>Image</Text>
            <View style={styles.inputGroup}>
              <MCIcons name="camera" size={20} style={styles.icon} />
              <Button mode="contained" style={styles.ImgPickBtn} color={Colors_def.default} onPress={() => pickImage()}>
                <Text>Pick an image</Text>
              </Button>
            </View>
          </View>
          {image != "" && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

          <View id="description" style={styles.onView}>
            <Input label={"Description"} placeholder={"Description"} secureTextEntry={false} IconName={"format-title"} style={{ flex: 1 }} setInput={setDescription} />
          </View>
          {validDescription === false && (
            <View style={styles.errGroup}>
              <Text style={styles.errText}>Please enter a description</Text>
            </View>
          )}

          <View id="purity" style={styles.onView}>
            <Input label={"purity"} placeholder={"Purity"} secureTextEntry={false} IconName={"resize"} style={{ flex: 1 }} keyboard={1} setInput={setPurity} />
          </View>
          {validPurity === false && (
            <View style={styles.errGroup}>
              <Text style={styles.errText}>Please enter a valid number</Text>
            </View>
          )}

          <View id="quantity" style={styles.onView}>
            <Input label={"Quantity"} placeholder={"Quantity"} secureTextEntry={false} IconName={"numeric"} style={{ flex: 1 }} keyboard={1} setInput={setQuantity} />
          </View>
          {validQuantity === false && (
            <View style={styles.errGroup}>
              <Text style={styles.errText}>Please enter a valid quantity</Text>
            </View>
          )}

          <View id="price" style={styles.onView}>
            <Input label={"Price"} placeholder={"Price"} secureTextEntry={false} IconName={"cash"} style={{ flex: 1 }} keyboard={1} setInput={setPrice} />
          </View>
          {validPrice === false && (
            <View style={styles.errGroup}>
              <Text style={styles.errText}>Please enter a valid Price</Text>
            </View>
          )}

          {isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <TouchableOpacity style={[styles.buttonGroup, styles.button]} onPress={() => handleJewelAdd()}>
              <Text style={styles.btnText}>Proceed</Text>
            </TouchableOpacity>
          )}
        </View>
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
    paddingVertical: 10,
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
    color: Colors_def.default
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
  ImgPickBtn: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors_def.default,
    marginHorizontal: 3,
    width: '70%'
  },
});

//make this component available to the app
export default AddProductScreen;
