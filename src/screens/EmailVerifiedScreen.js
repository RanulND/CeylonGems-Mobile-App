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


export default function EmailVerified({ navigation }) {
   
  
    return (
      <Background>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Email Verified</Header>
      
        
        <View style={styles.row}>
        <Text>Your Email has been Verified. Thank you for your support!</Text>
      </View>
        
        
      
        <Button mode="contained" onPress={() => navigation.navigate("Home")} style={{marginVertical: 10 , color: "#5271FF"}}>
         TAKE ME HOME
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
  