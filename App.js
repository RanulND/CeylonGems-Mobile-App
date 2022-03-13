import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavContainer from './src/navigation/Index';
import 'react-native-gesture-handler';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <NavContainer />
      </NavigationContainer>
    </>
  );
}

export default App;
