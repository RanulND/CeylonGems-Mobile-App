import React, { useState } from 'react'
import {useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { VerifyOTP , ResendOTP} from "../services/AuthService";
import SnackBar from "../components/SnackBar";

export default function VerifyOTPScreen({ navigation}) {
  
    
    const route = useRoute();
    const email = route.params.email;

    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, seterrMsg] = useState("");
    const [otp, setOtp] = useState("")
    const [snackbarVisible, setSnackbarVisible] = useState(false);
   
    const onOTPPressed = async () => {
     
        setIsLoading(true);
       try {
          const data = {
           otp
          };
         console.log(data);
         console.log("Hi");
         const res = await VerifyOTP(data);
         console.log(res);
         console.log("Bye");
        // console.log(res._id);
        
         navigation.navigate("ForgotPasswordScreen")
       } catch (err) {
        seterrMsg(err.response?.data?.msg || "Something went wrong");
        setSnackbarVisible(true);
        console.log("Something went wrong")
       } finally {
         setIsLoading(false);
       }
     
     
    }

    const resendOTP = async () => {
        console.log(email);
        setIsLoading(true);
       try {
          const data = {
           email
          };
         console.log(data);
         console.log("Hi");
         const res = await ResendOTP(data);
         console.log(res);
         console.log("Bye");
        //  navigation.navigate("Home")
       } catch (err) {
        seterrMsg(err.response?.data?.msg || "Something went wrong");
        setSnackbarVisible(true);
        console.log("Something went wrong")
       } finally {
         setIsLoading(false);
       }
     
     
    }
  
    return (
      <Background>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Input OTP</Header>
        <SnackBar snackbarVisible={snackbarVisible} setSnackbarVisible={setSnackbarVisible} displayMsg={errMsg} barColor="red" />
        
        <View style={styles.row}>
        <Text>Input your OTP code send via Email</Text>
      </View>
        <TextInput style={{marginVertical: 12}}
          label="OTP"
          returnKeyType="done"
          value={otp}
          onChangeText={(text) => setOtp(text)}
          secureTextEntry
        />
         <View style={styles.row}>
        <Text>Resend OTP code :</Text>
        <TouchableOpacity onPress={resendOTP} >
          <Text style={styles.link}>OTP</Text>
        </TouchableOpacity>
      </View>
      
        <Button mode="contained" onPress={onOTPPressed} style={{marginVertical: 10 , color: "#5271FF"}}>
          Submit
        </Button>

      </Background>
    )
  }
  
  const styles = StyleSheet.create({
    
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    
    link: {
      fontWeight: 'bold',
      color: "#5271FF",
    },
  })
  