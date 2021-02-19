import React, {useState} from 'react';
import styles from './src/styles'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Login, Signin} from './src/Authorization/authorization'
import {ListDesks} from './src/App/desks'

const Stack = createStackNavigator();

const App = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Sign In'>
        <Stack.Screen name="Sign In" component={Login}/>
        <Stack.Screen name="Sign Up" component={Signin} />
        <Stack.Screen name="Desks" component={ListDesks} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
