import React from 'react'
import { View, ToastAndroid } from 'react-native';
import {Input, Button, Icon} from 'react-native-elements'
import styles from '../styles'
import {useAppDispatch} from '../redux/hooks'
import {setActiveUserAction} from '../redux/users/action'
import {addListAction, loadListAction} from '../redux/columns/action'
import {useAppSelector} from '../redux/hooks'
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '../API/Auth'
import columns from '../API/Columns'
import { IList, IUser } from '../Types/interfaces';

type LoginProps = {
    navigation:any
}

export const SignIn: React.FC<LoginProps> = (props) => {
    const [usernameText, onChangeName] = React.useState('')
    const [passwordText, onChangePass] = React.useState('')
    const activeUser:IUser = useAppSelector((state:any)=>{
        return state.user.user
      })
    const dispatch = useAppDispatch()
    const loginAttempt = async () => {
        const userParametrs = {
            email: usernameText,
            password: passwordText
        }
        const result = await auth.signIn(userParametrs)
        console.log(result)
        if(result.name !== 'EntityNotFound'){
            const newUser:IUser = {
            active: true,
            token: result.token,
            name: result.name
            }
            dispatch(setActiveUserAction(newUser))
            await AsyncStorage.setItem('activeUser', JSON.stringify(newUser));
            console.log(activeUser)
            onChangeName('')
        }
        else {
            ToastAndroid.show("Введен неверный пароль или логин", ToastAndroid.SHORT);
        }
    }
    return (
      <View style={styles.container}>
                <View >
                <Input value={usernameText} onChangeText={text => onChangeName(text)} placeholder='Username' containerStyle={styles.input_style} leftIcon={<Icon name='person-outline'/>}/>
                <Input value={passwordText} onChangeText={text => onChangePass(text)} placeholder='Password' containerStyle={styles.input_style} leftIcon={<Icon name='vpn-key'/>} secureTextEntry={true}/>
                </View>
                <View style={styles.button_style}>
                <Button onPress={loginAttempt} title="Submit" type="outline"/>
                <Button onPress={() => props.navigation.push('Sign Up')} title="Registered" buttonStyle={styles.btn_register}/>
                </View>
      </View>
      );
}

export const SignUp: React.FC<LoginProps> = (props) => {
    const [emailText, onChangeEmail] = React.useState('')
    const [usernameText, onChangeName] = React.useState('')
    const [passwordText, onChangePass] = React.useState('')
    const [passCheckText, onChangePassCheck] = React.useState('')
    const regAttempt = async () => {
        if(passwordText === passCheckText){
        const userParametrs = {
            email: emailText,
            password: passwordText,
            name: usernameText
        }
        const result = await auth.signUp(userParametrs)
        console.log(result)
        props.navigation.navigate('Sign In')
        onChangeName('')
        }
        else{
            ToastAndroid.show("Пароли не одинаковы", ToastAndroid.SHORT);
        }
    }
    return (
    <View style={styles.container}>
                <View>
                <Input value={usernameText} onChangeText={text => onChangeName(text)} placeholder='Username' containerStyle={styles.input_style} leftIcon={<Icon name='person-outline'/>}/>
                <Input value={emailText} onChangeText={text => onChangeEmail(text)} placeholder='Email' containerStyle={styles.input_style} leftIcon={<Icon name='person-outline'/>}/>
                <Input value={passwordText} onChangeText={text => onChangePass(text)} placeholder='Password' containerStyle={styles.input_style} leftIcon={<Icon name='vpn-key'/>} secureTextEntry={true}/>
                <Input value={passCheckText} onChangeText={text => onChangePassCheck(text)} placeholder='Confirm password' containerStyle={styles.input_style} leftIcon={<Icon name='vpn-key'/>} secureTextEntry={true}/>
                </View>
                <View style={styles.button_style}>
                <Button onPress={regAttempt} title="Registered"/>
                </View>
    </View>
    );

}