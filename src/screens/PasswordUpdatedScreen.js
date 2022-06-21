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


export default function PasswordUpdatedScreen({ navigation }) {
   
  
    return (
      <Background>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Password Updated</Header>
      
        
        <View style={styles.row}>
        <Text>Your Password has been Updated</Text>
      </View>
        
        
      
        <Button mode="contained" onPress={() => navigation.navigate("LoginScreen")} style={{marginVertical: 10 , color: "#5271FF"}}>
         TAKE ME TO LOGIN
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
  