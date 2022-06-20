import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator,nicValidator,phoneValidator } from '../helpers/inputValidator'
import { UserRegister } from "../services/AuthService";
import SnackBar from "../components/SnackBar";


export default function RegisterScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, seterrMsg] = useState("");
  const [firstName, setFirstName] = useState({ value: '', error: '' })
  const [lastName, setLastName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [nic, setNic] = useState({ value: '', error: '' })
  const [phone, setPhone] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })
  const [snackbarVisible, setSnackbarVisible] = useState(false);


  const onSignUpPressed = async () => {
    const firstNameError = nameValidator(firstName.value)
    const lastNameError = nameValidator(lastName.value)
    const emailError = emailValidator(email.value)
    const nicError = nicValidator(nic.value)
    const phoneError = phoneValidator(phone.value)
    const passwordError = passwordValidator(password.value)


    if (emailError || passwordError || firstNameError || lastNameError || nicError|| phoneError) {
      setFirstName({ ...firstName, error: firstNameError })
      setLastName({ ...lastName, error: lastNameError })
      setEmail({ ...email, error: emailError })
      setNic({ ...nic, error: nicError })
      setPhone({ ...phone, error: phoneError })
      setPassword({ ...password, error: passwordError })
      if(password!==confirmPassword){
        
        setConfirmPassword("");
        const confirmPasswordError = "Passwords do not match"
        setConfirmPassword({ ...confirmPassword, error: confirmPasswordError })
        return
  
      }
      return
    }else{
      setIsLoading(true);
      try {
       console.log(email);
       console.log(password);
         const data = {
          firstName,
          lastName,
          email,
          nic,
          phone,
          password
         };
        console.log(data);
        console.log("Hi");
        const res = await UserRegister(data);
        console.log(res);
        console.log("Bye");
        navigation.navigate("Home")
      } catch (err) {
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
      <Header>Create Account</Header>
      {/* <View style={styles.container}>  
       <View style={styles.innerContainershort}>   */}
      <SnackBar snackbarVisible={snackbarVisible} setSnackbarVisible={setSnackbarVisible} displayMsg={errMsg} barColor="red" />
      <TextInput style={{marginVertical: 12, width:'100%'}}
        label="First Name"
        returnKeyType="next"
        value={firstName.value}
        onChangeText={(text) => setFirstName({ value: text, error: '' })}
        error={!!firstName.error}
        errorText={firstName.error}
       />
       
      <TextInput style={{marginVertical: 12, width:'100%'}}
        label="Last Name"
        returnKeyType="next"
        value={lastName.value}
        onChangeText={(text) => setLastName({ value: text, error: '' })}
        error={!!lastName.error}
        errorText={lastName.error}
      />
       {/* </View>
      
       <View style={styles.innerContainer}>  */}
      <TextInput style={{marginVertical: 12}}
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      {/* </View>
     
       <View style={styles.innerContainershort}>  */}
      <TextInput style={{marginVertical: 12, width:'100%'}}
        label="NIC"
        returnKeyType="next"
        value={nic.value}
        onChangeText={(text) => setNic({ value: text, error: '' })}
        error={!!nic.error}
        errorText={nic.error}
      />
       
       <TextInput style={{marginVertical: 12, width:'100%'}}
        label="Phone Number"
        returnKeyType="next"
        value={phone.value}
        onChangeText={(text) => setPhone({ value: text, error: '' })}
        error={!!phone.error}
        errorText={phone.error}
      />
      {/* </View>
      <View style={styles.innerContainershort}>  */}
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
        onPress={onSignUpPressed}
        // onPress={() => handleGemAdd()}
      style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} >
          <Text style={styles.link}>Sign In</Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
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
    color: theme.colors.primary,
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
