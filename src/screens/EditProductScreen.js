import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Colors_def from "../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, useCallback, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { editGem, editJewelry, getGemType, getGemDetails } from "../services/ProductService";
import { Button } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import SnackBar from "../components/SnackBar";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const dimension = Dimensions.get("window");

// create a component
const EditProductScreen = ({ navigation, route }) => {
  const id = route.params;

  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, seterrMsg] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [pageLoad, setPageLoad] = useState(false);

  const [title, setTitle] = useState("");
  const [selectedGemType, setSelectedGemType] = useState("");
  const [photos, setPhotos] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState(0);
  const [weight, setWeight] = useState(0);
  const [hardness, setHardness] = useState(0);
  const [colour, setColour] = useState("");
  const [origin, setOrigin] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [gemCertificate, setGemCertificate] = useState("");
  const [format, setFormat] = useState("");
  const [baseValue, setBaseValue] = useState(0);
  const [auctionDuration, setAuctionDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedProductType, setSelectedProductType] = useState("");
  const [gemType, setGemType] = useState([]);
  const [purity, setPurity] = useState(0);
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
    const float_regex = /^(?!0\d)\d*(\.\d+)?$/;
    
    //validations
    setValidTitle(!(title === "" || text_regex.test(title) === false));
    setValidSelectedGemType(!(selectedGemType === "select"));
    setValidFormat(!(format === "select"));
    setValidPhotos(!(photos === "" || text_regex.test(photos) === false));
    setValidDescription(!(description === "" ));
    setValidSize(!(size === "" || float_regex.test(size) === false));
    setValidWeight(!(weight === "" || float_regex.test(weight) === false));
    setValidHardness(!(hardness === "" || float_regex.test(hardness) === false));
    setValidColour(!(colour === "" || text_regex.test(colour) === false));
    setValidOrigin(!(origin === "" || text_regex.test(origin) === false));
    setValidQuantity(!(quantity === "" || number_regex.test(quantity) === false));
    setValidGemCertificate(!(gemCertificate === "" || text_regex.test(gemCertificate) === false));
    setValidBaseValue(!(baseValue === "" || float_regex.test(baseValue) === false));
    setValidAuctionDuration(!(auctionDuration === "" || number_regex.test(auctionDuration) === false));
    setValidPrice(!(price === "" || float_regex.test(price) === false));
    return (
      !(title === "" || text_regex.test(title) === false) &&
      !(selectedGemType === "select_type") &&
      !(format === "select") &&
      // !(photos === "" || text_regex.test(photos) === false) &&
      !(description === "" ) &&
      !(size === "" || float_regex.test(size) === false) &&
      !(weight === "" || float_regex.test(weight) === false) &&
      !(hardness === "" || float_regex.test(hardness) === false) &&
      !(colour === "" || text_regex.test(colour) === false) &&
      !(origin === "" || text_regex.test(origin) === false) &&
      !(quantity === "" || number_regex.test(quantity) === false) &&
      // !(gemCertificate === "" || text_regex.test(gemCertificate) === false) &&
      !(baseValue === "" || float_regex.test(baseValue) === false) &&
      !(auctionDuration === "" || number_regex.test(auctionDuration) === false)&&
      !(price === "" || float_regex.test(price) === false)
    );
  };

  const validateInputJewel = () => {
    const number_regex = /^([0-9 ]+)$/;
    const text_regex = /^([a-zA-Z ]+)$/;
    const float_regex = /^(?!0\d)\d*(\.\d+)?$/;

    //validations
    setValidTitle(!(title === "" || text_regex.test(title) === false));
    setValidDescription(!(description === "" ));
    setValidQuantity(!(quantity === "" || number_regex.test(quantity) === false));
    setValidPrice(!(price === "" || float_regex.test(price) === false));
    setValidPurity(!(purity === "" || float_regex.test(purity) === false));
    return (
      !(title === "" || text_regex.test(title) === false) &&
      // !(photos === "" || text_regex.test(photos) === false) &&
      !(description === "") &&
      !(purity === "" || float_regex.test(purity) === false) &&
      !(quantity === "" || number_regex.test(quantity) === false) &&
      // !(gemCertificate === "" || text_regex.test(gemCertificate) === false) &&
      !(price === "" || float_regex.test(price) === false)
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

    setPageLoad(true);
    getGemDetails(id).then((res) => {
      console.log(res.data.message);
      const resp = res.data.message;

      if (resp.product == "Gem") {
        getGemTypesAll();

        setTitle(resp.title);
        setPhotos(resp.photos);
        setDescription(resp.description);
        setQuantity(resp.quantity.toString());
        setSelectedGemType(resp.category);
        setSize(resp.size.toString());
        setWeight(resp.weight.toString());
        setHardness(resp.hardness.toString());
        setColour(resp.colour);
        setOrigin(resp.origin);

        setSelectedProductType("gem");
        if (res.data.message.format == "Auction") {
          setFormat("Auction");
          setBaseValue(resp.base_value.toString());
          setAuctionDuration(resp.auc_duration.toString());
        } else {
          setFormat("Direct");
          setPrice(resp.base_value.toString());
        }
        resp.gem_certificate ? setGemCertificate(resp.gem_certificate) : setGemCertificate("");
      } else {
        setTitle(resp.title);
        setPhotos(resp.photos);
        setDescription(resp.description);
        setQuantity(resp.quantity.toString());
        setPurity(resp.purity.toString());
        setPrice(resp.price.toString());

        setSelectedProductType("jewel");
      }
      setPageLoad(false);
    });
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
      isLoading(true);
      const gemImg = await fetch(result.uri);
      const gemImgName = result.uri.substring(result.uri.lastIndexOf("/") + 1);
      if (selectedProductType == "gem") {
        const storageRefGemImg = ref(getStorage(), "Gems/Images" + gemImgName);
        const bytesGemImg = await gemImg.blob();
        await uploadBytes(storageRefGemImg, bytesGemImg).then(() => {
          console.log("uploaded Gem Img");
          getDownloadURL(storageRefGemImg)
            .then((urlGemImg) => {
              setPhotos(urlGemImg);
            })
            .catch((e) => console.log("getting downloadURL of image error => ", e));
        });
      } else if (selectedProductType == "jewel") {
        const storageRefGemImg = ref(getStorage(), "Jewellery/Images" + gemImgName);
        const bytesGemImg = await gemImg.blob();
        await uploadBytes(storageRefGemImg, bytesGemImg).then(() => {
          console.log("uploaded Gem Img");
          getDownloadURL(storageRefGemImg)
            .then((urlGemImg) => {
              setPhotos(urlGemImg);
            })
            .catch((e) => console.log("getting downloadURL of image error => ", e));
        });
      }
      isLoading(false);
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
      const gemCert = await fetch(result.uri);
      const gemCertName = result.uri.substring(result.uri.lastIndexOf("/") + 1);

      const storageRefGemCert = ref(getStorage(), "Gems/Certificates" + gemCertName);
      const bytesGemCert = await gemCert.blob();

      uploadBytes(storageRefGemCert, bytesGemCert).then(() => {
        console.log("uploaded Gem Certificate");
        getDownloadURL(storageRefGemCert)
          .then((urlGemCert) => {
            setGemCertificate(urlGemCert);
          })
          .catch((e) => console.log("getting downloadURL of image error => ", e));
      });
    }
  };

  const submitGem = async () => {
    const valid = validateInputGem();
    if (!valid) {
      seterrMsg("Please check entered data again and enter valid data for incorrect fields.");
      setSnackbarVisible(true);
      return;
    } else {
      try {
        setIsLoading(true);
        const data = {
          status: true,
          title: title,
          category: selectedGemType,
          photos: photos,
          description: description,
          size: size,
          weight: weight,
          hardness: hardness,
          colour: colour,
          origin: origin,
          quantity: quantity,
          gem_certificate: gemCertificate,
          format: format,
          base_value: baseValue,
          auc_duration: auctionDuration,
          product: "Gem",
          price: baseValue,
        };
        // console.log(data);
        const res = await editGem(id, data);
        // console.log(res);
      } catch {
        console.log("Error occured");
      } finally {
        setIsLoading(false);
        Alert.alert("Gem updated successfully!");
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
        navigation.navigate("Home");
      }
    }
  };

  const submitJewel = async () => {
    const valid = validateInputJewel();
    if (!valid) {
      seterrMsg("Please check entered data again and enter valid data for incorrect fields.");
      setSnackbarVisible(true);
      return;
    } else {
      try {
        setIsLoading(true);
        const data = {
          status: true,
          title: title,
          photos: photos,
          description: description,
          quantity: quantity,
          purity: purity,
          product: "Jewellery",
          price: price,
        };
        const res = await editJewelry(id, data);
      } catch {
        console.log("Error occured");
      } finally {
        setIsLoading(false);
        Alert.alert("Jewelery updated successfully!");
        setTitle("");
        setPhotos("");
        setDescription("");
        setQuantity("");
        setPurity("");
        setProduct("");
        setPrice("");
        navigation.navigate("Home");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {pageLoad == true ? (
        <View style={styles.pageLoader}>
          <ActivityIndicator size="large" color={Colors_def.default} style={{ marginVertical: dimension.width * 0.5 }} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View id="gemShow" style={{ display: selectedProductType === "gem" ? "flex" : "none", width: "100%", alignItems: "center" }}>
            <View id="title" style={styles.onView}>
              <Input label={"Title"} placeholder={"Title"} secureTextEntry={false} IconName={"format-title"} style={{ flex: 1 }} input={title} setInput={setTitle} />
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
            {photos != "" && <Image source={{ uri: photos }} style={{ width: 200, height: 200 }} />}
            <View id="description" style={styles.onView}>
              <Input label={"Description"} placeholder={"Description"} secureTextEntry={false} IconName={"format-title"} style={{ flex: 1 }} input={description} setInput={setDescription} />
            </View>
            {validDescription === false && (
              <View style={styles.errGroup}>
                <Text style={styles.errText}>Please enter a description</Text>
              </View>
            )}

            <View id="size" style={styles.onView}>
              <Input label={"Size"} placeholder={"Size"} secureTextEntry={false} IconName={"resize"} style={{ flex: 1 }} keyboard={1} input={size} setInput={setSize} />
            </View>
            {validSize === false && (
              <View style={styles.errGroup}>
                <Text style={styles.errText}>Please enter a valid size</Text>
              </View>
            )}

            <View id="weight" style={styles.onView}>
              <Input label={"Weight"} placeholder={"Weight"} secureTextEntry={false} IconName={"weight-gram"} style={{ flex: 1 }} keyboard={1} input={weight} setInput={setWeight} />
            </View>
            {validWeight === false && (
              <View style={styles.errGroup}>
                <Text style={styles.errText}>Please enter a valid weight</Text>
              </View>
            )}

            <View id="hardness" style={styles.onView}>
              <Input label={"Hardness"} placeholder={"Hardness"} secureTextEntry={false} IconName={"numeric"} style={{ flex: 1 }} keyboard={1} input={hardness} setInput={setHardness} />
            </View>
            {validHardness === false && (
              <View style={styles.errGroup}>
                <Text style={styles.errText}>Please enter a valid hardness</Text>
              </View>
            )}

            <View id="colour" style={styles.onView}>
              <Input label={"Colour"} placeholder={"Colour"} secureTextEntry={false} IconName={"format-color-fill"} style={{ flex: 1 }} input={colour} setInput={setColour} />
            </View>
            {validColour === false && (
              <View style={styles.errGroup}>
                <Text style={styles.errText}>Please enter a Colour</Text>
              </View>
            )}

            <View id="origin" style={styles.onView}>
              <Input label={"Origin"} placeholder={"Origin"} secureTextEntry={false} IconName={"format-title"} style={{ flex: 1 }} input={origin} setInput={setOrigin} />
            </View>
            {validOrigin === false && (
              <View style={styles.errGroup}>
                <Text style={styles.errText}>Please enter the origin</Text>
              </View>
            )}

            <View id="quantity" style={styles.onView}>
              <Input label={"Quantity"} placeholder={"Quantity"} secureTextEntry={false} IconName={"numeric"} style={{ flex: 1 }} keyboard={1} input={quantity} setInput={setQuantity} />
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

            <View id="formatShow" style={{ display: format === "Auction" ? "flex" : "none", width: "100%", alignItems: "center" }}>
              <View id="base" style={styles.onView}>
                <Input label={"Base Value"} placeholder={"Base Value"} secureTextEntry={false} IconName={"cash"} style={{ flex: 1 }} keyboard={1} input={baseValue} setInput={setBaseValue} />
              </View>
              {validBaseValue === false && (
                <View style={styles.errGroup}>
                  <Text style={styles.errText}>Please enter a valid Base Value</Text>
                </View>
              )}
              <View id="duration" style={styles.onView}>
                <Input
                  label={"Auction Duration"}
                  placeholder={"Auction Duration"}
                  secureTextEntry={false}
                  IconName={"update"}
                  style={{ flex: 1 }}
                  keyboard={1}
                  input={auctionDuration}
                  setInput={setAuctionDuration}
                />
              </View>
              {validAuctionDuration === false && (
                <View style={styles.errGroup}>
                  <Text style={styles.errText}>Please enter a valid Auction Duration</Text>
                </View>
              )}
            </View>

            <View id="formatShow" style={{ display: format === "Direct" ? "flex" : "none", width: "100%", alignItems: "center" }}>
              <View id="price" style={styles.onView}>
                <Input label={"Price"} placeholder={"Price"} secureTextEntry={false} IconName={"cash"} style={{ flex: 1 }} keyboard={1} input={baseValue} setInput={setBaseValue} />
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
              <TouchableOpacity style={[styles.buttonGroup, styles.button]} onPress={() => submitGem()}>
                <Text style={styles.btnText}>Proceed</Text>
              </TouchableOpacity>
            )}
          </View>

          <View id="jewelShow" style={(styles.onView, { display: selectedProductType === "jewel" ? "flex" : "none", width: "100%", alignItems: "center" })}>
            <View id="title" style={styles.onView}>
              <Input label={"Title"} placeholder={"Title"} secureTextEntry={false} IconName={"format-title"} style={{ flex: 1 }} input={title} setInput={setTitle} />
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
            {photos != "" && <Image source={{ uri: photos }} style={{ width: 200, height: 200 }} />}

            <View id="description" style={styles.onView}>
              <Input label={"Description"} placeholder={"Description"} secureTextEntry={false} IconName={"format-title"} style={{ flex: 1 }} input={description} setInput={setDescription} />
            </View>
            {validDescription === false && (
              <View style={styles.errGroup}>
                <Text style={styles.errText}>Please enter a description</Text>
              </View>
            )}

            <View id="purity" style={styles.onView}>
              <Input label={"purity"} placeholder={"Purity"} secureTextEntry={false} IconName={"resize"} style={{ flex: 1 }} keyboard={1} input={purity} setInput={setPurity} />
            </View>
            {validPurity === false && (
              <View style={styles.errGroup}>
                <Text style={styles.errText}>Please enter a valid number</Text>
              </View>
            )}

            <View id="quantity" style={styles.onView}>
              <Input label={"Quantity"} placeholder={"Quantity"} secureTextEntry={false} IconName={"numeric"} style={{ flex: 1 }} keyboard={1} input={quantity} setInput={setQuantity} />
            </View>
            {validQuantity === false && (
              <View style={styles.errGroup}>
                <Text style={styles.errText}>Please enter a valid quantity</Text>
              </View>
            )}

            <View id="price" style={styles.onView}>
              <Input label={"Price"} placeholder={"Price"} secureTextEntry={false} IconName={"cash"} style={{ flex: 1 }} keyboard={1} input={price} setInput={setPrice} />
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
              <TouchableOpacity style={[styles.buttonGroup, styles.button]} onPress={() => submitJewel()}>
                <Text style={styles.btnText}>Proceed</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}
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
    color: Colors_def.default,
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
    width: "70%",
  },
  pageLoader: {
    flex: 1,
  },
});

//make this component available to the app
export default EditProductScreen;
