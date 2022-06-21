import React, { useState } from 'react'
import {useNavigation, useRoute } from '@react-navigation/native'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { passwordValidator } from '../helpers/passwordValidator'
import { PasswordUpdate } from "../services/AuthService";
import SnackBar from "../components/SnackBar";


export default function ForgotPasswordScreen({ navigation}) {

    // const route = useRoute();
    // const id = route.params.id;

  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, seterrMsg] = useState("");
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })
  const [snackbarVisible, setSnackbarVisible] = useState(false);


  const onUpdatePressed = async () => {
    const passwordError = passwordValidator(password.value)
    const confirmPasswordError = "Passwords do not match"

    if (passwordError) {
      setPassword({ ...password, error: passwordError })
      return
    }
    if(password.value!==confirmPassword.value){
        
      setConfirmPassword("");
      setConfirmPassword({ ...confirmPassword, error: confirmPasswordError })
      return

    }else{
      setIsLoading(true);
      try {
     //  console.log(id);
       console.log(password);
         const data = {
            id:"62b16d4b39491e8201bbd638",
          password : password.value
         };
        console.log(data);
        console.log("Hi");
        const res = await PasswordUpdate(data);
        console.log(res);
        console.log("Bye");
        navigation.navigate("PasswordUpdatedScreen")
      } catch (err) {
        console.log(err)
       seterrMsg(err.response?.data?.msg || "Something went wrong");
       setSnackbarVisible(true);
       console.log("Something went wrong")
      } finally {
        setIsLoading(false);
      }
    }
    
    
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Reset Password</Header>
      {/* <View style={styles.container}>  
       <View style={styles.innerContainershort}>   */}
      <SnackBar snackbarVisible={snackbarVisible} setSnackbarVisible={setSnackbarVisible} displayMsg={errMsg} barColor="red" />
     
      <TextInput style={{marginVertical: 12,  width:'100%'}}
        label="Password"
        returnKeyType="next"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      
    
       <TextInput style={{marginVertical: 12,  width:'100%'}}
        label="Confirm Password"
        returnKeyType="done"
        value={confirmPassword.value}
        onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
        secureTextEntry
      />
      {/* </View> */}
     
      <Button
        mode="contained"
        onPress={onUpdatePressed}
        // onPress={() => handleGemAdd()}
      style={{ marginTop: 24 , marginVertical: 10}}
      >
       Reset Password
      </Button>
      
    </Background>
    </ScrollView>
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
  container: {  
    flex: 1,  
    width: "100%",  
    justifyContent: "flex-start"  
},  
innerContainer:{  
   // flex: 1,  
    width: "100%",  
    flexDirection: "row",  
    justifyContent: "space-between",  
    alignItems: "center"  
} ,
innerContainershort:{
  width: "50%",  
    flexDirection: "row",  
    justifyContent: "space-between",  
    alignItems: "flex-end" 
},
scrollContainer: {
  alignItems: "center",
  justifyContent: "center",
  paddingBottom: 30,
},
})
