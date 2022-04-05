//import liraries
import React, { Component, DrawerButton } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
// create a component
const NavContainer = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="WelcomeScreen" component={WelcomeScreen}/>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen}/>
            <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
            <Drawer.Screen name="LoginScreen" component={LoginScreen} />

        </Drawer.Navigator>
    );
};

//make this component available to the app
export default NavContainer;
