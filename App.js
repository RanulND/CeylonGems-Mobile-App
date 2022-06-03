import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavContainer from './src/navigation/Index';
import 'react-native-gesture-handler';
import ProductContextProvider from './src/context/ProductContext';

const App = () => {
  return (
      <ProductContextProvider>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <NavContainer />
        </NavigationContainer>
      </ProductContextProvider>
  );
}

export default App;
