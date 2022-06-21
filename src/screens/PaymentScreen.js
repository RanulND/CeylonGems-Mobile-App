import React, { useState, Component, useLayoutEffect } from "react";
import { initStripe, useStripe } from '@stripe/stripe-react-native';
import Button from "../components/Button";
import TextInput from '../components/TextInput'
import { View, Text, Alert } from "react-native";
import { payment } from "../services/PaymentService";
import SnackBar from "../components/SnackBar";




export default function PaymentScreen({ navigation }){
const [name, setName] = useState("");
const [amount, setAmount] = useState("1");
const stripe = useStripe();
const [isLoading, setIsLoading] = useState(false);
const [errMsg, seterrMsg] = useState("");
const [snackbarVisible, setSnackbarVisible] = useState(false);
const {
    initPaymentSheet,
    presentPaymentSheet,
    confirmPaymentSheetPayment,
} = useStripe();

const pay = async () => {
    setIsLoading(true);
    try {
      const finalAmount = parseInt(amount);
    
    //   const response = await fetch("http://localhost:5000/api/pay/payment", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ amount: finalAmount, name }),
    //   });
     
      
       
          const data = {
            amount: finalAmount, name
            
          };
          console.log(data);
          console.log("Hi");
          const res = await payment(data);
          console.log(res);
          console.log("Bye");
          console.log(res.data);
          console.log(res.data.clientSecret);
        //  const Data = await res.json();
          if (!res.ok) {
            Alert.alert(res.data.message);
          }
          console.log("1 : err");
          const initSheet = await initPaymentSheet({
            paymentIntentClientSecret: res.data.clientSecret,
            merchantDisplayName: name
          });
          console.log("1 : err");
          if (initSheet.error) {
            console.error(initSheet.error);
            return Alert.alert(initSheet.error.message);
          }
         
          const presentSheet = await presentPaymentSheet({
            clientSecret: res.data.clientSecret,
          });
          if (presentSheet.error) {
            console.error(presentSheet.error);
            return Alert.alert(presentSheet.error.message);
          }
          Alert.alert("Payment successfull! Thank you for the Payment.");
      
          navigation.navigate('Home')
        
       

     
  
      
    }catch (err) {
        console.error(err);
      Alert.alert("Payment failed!");
        seterrMsg(err.response?.data?.msg || "Something went wrong");
        setSnackbarVisible(true);
        console.log("Something went wrong")
      } finally {
        setIsLoading(false);
      }
  };




    return (
        <View>
        <SnackBar snackbarVisible={snackbarVisible} setSnackbarVisible={setSnackbarVisible} displayMsg={errMsg} barColor="red" />
        <TextInput style={{marginVertical: 12,  width: '50%', marginLeft:100}}
            placeholder="Name"
            label="Name"
            returnKeyType="next"
            value={name}
            onChangeText={(e) => setName(e)}
           
       
        />
        <TextInput style={{marginVertical: 12, width: '50%', marginLeft:100}}
            placeholder="Amount"
            label="Amount"
            returnKeyType="done"
            value={amount}
            onChangeText={(e) => setAmount(e)}
        />
        <Button style={{marginVertical: 12, width: '50%', marginLeft:100}} mode="contained" title="Pay with Stripe" onPress={pay} > Pay with Stripe
      </Button>
        </View>
    );
}