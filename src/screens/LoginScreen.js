import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
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
import { UserLogin } from "../services/AuthService";
import SnackBar from "../components/SnackBar";

export default function LoginScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, seterrMsg] = useState("");
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [snackbarVisible, setSnackbarVisible] = useState(false);
 
  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    else{
      setIsLoading(true);
     try {
      console.log(email);
      console.log(password);
        const data = {
         email:email.value,
         password:password.value
        };
       console.log(data);
       console.log("Hi");
       const res = await UserLogin(data);
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
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome Back</Header>
      <SnackBar snackbarVisible={snackbarVisible} setSnackbarVisible={setSnackbarVisible} displayMsg={errMsg} barColor="red" />
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
      <TextInput style={{marginVertical: 12}}
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    
      <Button mode="contained" onPress={onLoginPressed} style={{marginVertical: 10}}>
        Sign In
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
