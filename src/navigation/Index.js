//import liraries
import React, { Component, DrawerButton } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductAddScreen from '../screens/AddProductScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
            <Drawer.Screen name="EditProfile" component={EditProfileScreen} options={{drawerItemStyle: {display: 'none'}, title: 'Edit Profile'}}/>
            <Drawer.Screen name="RegisterScreen" component={RegisterScreen} options={{ drawerItemStyle: { display: 'none' }, title: 'Register'}}/>
            <Drawer.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{ drawerItemStyle: { display: 'none' }, title: 'Forgot Password'}}/>
        </Drawer.Navigator>
    );
};

//make this component available to the app
export default NavContainer;
