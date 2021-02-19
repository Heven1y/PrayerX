import React from 'react'
import { View, Text, ScrollView, TextInput } from 'react-native';
import {Input, Button, Icon} from 'react-native-elements'
import { UserOutlined} from '@ant-design/icons'
import styles from '../styles'

type LoginProps = {
    navigation:any
}

export const Login: React.FC<LoginProps> = (props) => {
    const [usernameText, onChangeName] = React.useState('')
    const loginAttempt = () => {
        props.navigation.navigate('Desks', { username: usernameText})
        onChangeName('')
    }
    return (
      <View style={styles.container}>
                <Text style={styles.login_text}>
                    Login
                </Text>
                <View style={styles.inputView}>
                <Input value={usernameText} onChangeText={text => onChangeName(text)} placeholder='Username' containerStyle={styles.input_style} leftIcon={<Icon name='person-outline'/>}/>
                <Input placeholder='Password' containerStyle={styles.input_style} leftIcon={<Icon name='vpn-key'/>} secureTextEntry={true}/>
                </View>
                <View style={styles.button_style}>
                <Button onPress={loginAttempt} title="Submit" type="outline"/>
                <Button onPress={() => props.navigation.push('Sign Up')} title="Registered" buttonStyle={styles.btn_register}/>
                </View>
      </View>
      );
}

export const Signin: React.FC = () => {
    return (
        <View style={styles.container}>
      <Text>Активность для регистрации</Text>
    </View>
    );

}