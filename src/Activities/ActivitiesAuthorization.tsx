import React from 'react'
import { View, Text, ScrollView, TextInput } from 'react-native';
import {Input, Button, Icon} from 'react-native-elements'
import styles from '../styles'

type LoginProps = {
    navigation:any
}

export const SignIn: React.FC<LoginProps> = (props) => {
    const [usernameText, onChangeName] = React.useState('')
    const [passwordText, onChangePass] = React.useState('')
    const loginAttempt = () => {
        props.navigation.navigate('Desk', { username: usernameText, pass: passwordText})
        onChangeName('')
    }
    return (
      <View style={styles.container}>
                <View style={styles.inputView}>
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
    const [usernameText, onChangeName] = React.useState('')
    const [passwordText, onChangePass] = React.useState('')
    const regAttempt = () => {
        props.navigation.navigate('Desks', { username: usernameText})
        onChangeName('')
    }
    return (
    <View style={styles.container}>
                <View style={styles.inputView}>
                <Input value={usernameText} onChangeText={text => onChangeName(text)} placeholder='Username' containerStyle={styles.input_style} leftIcon={<Icon name='person-outline'/>}/>
                <Input value={usernameText} onChangeText={text => onChangeName(text)} placeholder='Email' containerStyle={styles.input_style} leftIcon={<Icon name='person-outline'/>}/>
                <Input value={passwordText} onChangeText={text => onChangePass(text)} placeholder='Password' containerStyle={styles.input_style} leftIcon={<Icon name='vpn-key'/>} secureTextEntry={true}/>
                <Input value={passwordText} onChangeText={text => onChangePass(text)} placeholder='Confirm password' containerStyle={styles.input_style} leftIcon={<Icon name='vpn-key'/>} secureTextEntry={true}/>
                </View>
                <View style={styles.button_style}>
                <Button onPress={regAttempt} title="Registered"/>
                </View>
    </View>
    );

}