import React from 'react'
import { View, Text, ScrollView, TextInput } from 'react-native';
import {Input, Button, Icon} from 'react-native-elements'
import {api} from '../api'
type ListProps = {
    route:any,
    navigation:any
}

export const ListDesks: React.FC<ListProps> = (props) => {
    const { username} = props.route.params
    const AddDesk = async () => {
        let res = await api.post('/columns', { header: {Authorization : `bearer 726427`}, title: '123', description:'567'})
        console.log(res)
    }
    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{username}</Text>
            <Button title='Add desk' onPress={AddDesk}/>
        </View>
    )
}