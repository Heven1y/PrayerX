import React, {useState} from 'react'
import { View, Text, ScrollView, TextInput } from 'react-native';
import {Input, Button} from 'react-native-elements'
import styles from '../styles'

type LoginProps = {
    navigation:any
}

export const Login: React.FC<LoginProps> = (props) => {
    return (
      <View style={styles.container}>
                <Text style={styles.login_text}>
                    Login
                </Text>
                <View style={styles.inputView}>
                <TextInput placeholder='Username' style={styles.input_style}/>
                <TextInput placeholder='Password' style={styles.input_style}/>
                </View>
                <View style={styles.button_style}>
                <Button onPress={() => {}} title="Submit"/>
                <Button onPress={() => props.navigation.navigate('Sign-in')} title="Registered"/>
                </View>
      </View>
      );
}

export const Signin = () => {
    return (
        <View style={styles.container}>
      <Text>Активность для регистрации</Text>
    </View>
    );

}