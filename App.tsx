import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {SignIn, SignUp} from './src/Activities/ActivitiesAuthorization'
import {ActivityColumn} from './src/Activities/ActivityColumn'
import {ActivityCard} from './src/Activities/ActivityCard'
import {ActivityDesk} from './src/Activities/ActivityDesk'
import {useAppSelector} from './src/redux/hooks'

const Stack = createStackNavigator();

const App:React.FC = () => { 
  const activeUser = useAppSelector((state:any)=>{
    return state.user.user.active
  })
  return (
    <NavigationContainer>
      {
        activeUser ? (
          <Stack.Navigator initialRouteName={"Desk"}>
              <Stack.Screen name="Desk"  component={ActivityDesk}/>
              <Stack.Screen name="Column" component={ActivityColumn}/>
              <Stack.Screen name="Card" component = {ActivityCard}/>
            </Stack.Navigator>
        )
        : (
          <Stack.Navigator initialRouteName={"Sign In"}>
              <Stack.Screen name="Sign In" component={SignIn}/>
              <Stack.Screen name="Sign Up" component={SignUp} />
          </Stack.Navigator>
        )
      }
    </NavigationContainer>
  );
};

export default App
