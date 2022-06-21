//import liraries
import React, { Component, DrawerButton } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VerifyEmailScreen from '../screens/VerifyEmail';
import EmailVerifiedScreen from '../screens/EmailVerifiedScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import VerifyOTPScreen from '../screens/VerifyOTPScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import PasswordUpdatedScreen from '../screens/PasswordUpdatedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GemScreen from '../screens/GemStoreScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScren';
import ProductAddScreen from '../screens/AddProductScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import EditProductScreen from '../screens/EditProductScreen';
import PaymentScreen from '../screens/PaymentScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CartCard } from '../components/CartCard';
import { CartIcon } from '../components/CartIcon';
import { CartScreen } from '../screens/CartScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
// create a component
const NavContainer = () => {
    return (
        <Drawer.Navigator screenOptions={{ headerTitleAlign: "center", unmountOnBlur: true, drawerActiveBackgroundColor: '#BFD0FC', drawerActiveTintColor: '#051183', swipeEnabled: false, headerShadowVisible: true }} backBehavior="history">
            <Drawer.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ drawerItemStyle: { display: 'none' }}}/>
            <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }}/>
            <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }}/>
            <Drawer.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'Settings'}}/>
            <Drawer.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login'}}/>
            <Drawer.Screen name="ProductAdd" component={ProductAddScreen} options={{drawerItemStyle: {display: 'none'}, title: 'Add Product'}}/>
            <Drawer.Screen name="ProductEdit" component={EditProductScreen} options={{title: 'Edit Product'}}/>
            <Drawer.Screen name="EditProfile" component={EditProfileScreen} options={{drawerItemStyle: {display: 'none'}, title: 'Edit Profile'}}/>
            <Drawer.Screen name="GemStore" component={GemScreen} />
            <Drawer.Screen name="ProductDetailsScreen" component={ProductDetailsScreen}/>
            <Drawer.Screen name="CartCard" component={CartCard}  />
            <Drawer.Screen name="RegisterScreen" component={RegisterScreen} options={{ drawerItemStyle: { display: 'none' }, title: 'Register'}}/>
            <Drawer.Screen name="VerifyEmailScreen" component={VerifyEmailScreen} options={{ drawerItemStyle: { display: 'none' }, title: 'VerifyEmail'}}/>
            <Drawer.Screen name="EmailVerifiedScreen" component={EmailVerifiedScreen} options={{ drawerItemStyle: { display: 'none' }, title: 'Email Verified'}}/>
            <Drawer.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{ drawerItemStyle: { display: 'none' }, title: 'Forgot Password'}}/>
            <Drawer.Screen name="VerifyOTPScreen" component={VerifyOTPScreen} options={{ drawerItemStyle: { display: 'none' }, title: 'Verify OTP'}}/>
            <Drawer.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ drawerItemStyle: { display: 'none' }, title: 'Reset Password'}}/>
            <Drawer.Screen name="PasswordUpdatedScreen" component={PasswordUpdatedScreen} options={{ drawerItemStyle: { display: 'none' }, title: ' Password Updated'}}/>
            <Drawer.Screen name="PaymentScreen" component={PaymentScreen} options={{ title: 'Payment'}}/>
            <Drawer.Screen name="CartScreen" component={CartScreen} options={{drawerIcon:()=> (
                <CartIcon/>
            )}}/>
        </Drawer.Navigator>
    );
};

//make this component available to the app
export default NavContainer;
