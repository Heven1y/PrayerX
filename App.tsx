import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import styles from './src/styles'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Login, Signin} from './src/Authorization/authorization'

const Stack = createStackNavigator();

const App = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Log-in'>
        <Stack.Screen name="Log-in" >
         {props => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Sign-in" component={Signin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
