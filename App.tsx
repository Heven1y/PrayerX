import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {SignIn, SignUp} from './src/Screens/ScreensAuthorization'
import {ActivityColumn} from './src/Screens/ScreenColumn'
import {ActivityCard} from './src/Screens/ScreenCard'
import {ActivityDesk} from './src/Screens/ScreenDesk'
import {useAppSelector, useAppDispatch} from './src/redux/hooks'
import { IUser } from './src/Types/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {setActiveUserAction} from './src/redux/users/action'
import columns from './src/API/Columns'
import { loadListAction } from './src/redux/columns/action';
const Stack = createStackNavigator();

const App:React.FC = () => { 
  const activeUser:IUser = useAppSelector((state:any)=>{
    return state.user.user
  })
  const dispatch = useAppDispatch()
  const [load, setLoad] = React.useState(false)
  React.useEffect(() => {
    async function getActiveFromStore() {
      if(!load) {
        const user = await JSON.parse(await AsyncStorage.getItem('activeUser') || '{}') as IUser
        console.log(user.active)
        if(user.active){
          dispatch(setActiveUserAction(user))
        }
        setLoad(true)
      }
    }
    getActiveFromStore()
  }, [load])
  return (
    <NavigationContainer>
      {
        activeUser.active ? (
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
