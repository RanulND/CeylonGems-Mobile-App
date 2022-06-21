import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import {useNavigation, useRoute } from '@react-navigation/native'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { UserForgetPassword } from "../services/AuthService";
import SnackBar from "../components/SnackBar";

export default function ResetPasswordScreen({}) {
  const navigation=useNavigation();
  const [email, setEmail] = useState({ value: '', error: '' })
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, seterrMsg] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);


  const sendResetPasswordEmail = async () => {
    const emailError = emailValidator(email.value)

    if (emailError) {
      setEmail({ ...email, error: emailError })
      return 
    }
    else{
      setIsLoading(true);
        try {
          console.log(email);
            const data = {
              email:email.value
              
            };
            console.log(data);
            console.log("Hi");
            const res = await UserForgetPassword(data);
            console.log(res);
            console.log("Bye");
            console.log(email.value);
        
            navigation.navigate('VerifyOTPScreen',{email:email.value})
          }
         catch (err) {
          seterrMsg(err.response?.data?.msg || "Something went wrong");
          setSnackbarVisible(true);
          console.log("Something went wrong")
        } finally {
          setIsLoading(false);
        }
  }
  };


  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Forgot Your Password?</Header>
      <SnackBar snackbarVisible={snackbarVisible} setSnackbarVisible={setSnackbarVisible} displayMsg={errMsg} barColor="red" />
      <TextInput style={{marginVertical: 12}}
        label="Email address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />
      <Button 
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={styles.linkText}
      >
        Request Reset Password
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  linkText: {
    fontSize: 8,
    marginTop: 16,
    marginVertical: 10
  },
})