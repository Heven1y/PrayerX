import React from 'react'
import { View, Text, ScrollView, TextInput } from 'react-native';
import {Input, Button, Icon, ListItem, Overlay} from 'react-native-elements'
import Feather from 'react-native-vector-icons/Feather'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import styles from '../styles'
import {IList} from '../Types/interfaces'
type ListProps = {
    route:any,
    navigation:any,
    list: IList,
    changeColumn(id: number, title:string):void,
    removeColumn(id: number):void
}

export const Column: React.FC<ListProps> = (props) => {
    const [visible, setVisible] = React.useState(false);
    const [title, onChangeTitle] = React.useState('')
    const openColumn = (title:string) => {
        console.log(props.list.cardsID)
        props.navigation.navigate('Column', { titleColumn: title, idColumn: props.list.id})
    }
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    const Change = (id: number, title:string) => {
        props.changeColumn(id, title)
        setVisible(!visible)
        onChangeTitle('')
    }
    const Delete = (id:number) => {
        props.removeColumn(id)
        setVisible(!visible)
        onChangeTitle('')
    }
    return (
        <>
        <ListItem containerStyle={styles.column_style} 
        onPress={() => openColumn(props.list.title)} onLongPress={toggleOverlay}
        style={styles.column_style_onPress}>
        <ListItem.Content>
        <ListItem.Title>{props.list.title}</ListItem.Title>
        </ListItem.Content>
        </ListItem>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View>
        <Text style={{marginLeft:10, fontSize: 20, marginBottom: 10, marginTop: 10}}>Change column</Text>
        <Input value={title} onChangeText={onChangeTitle} placeholder='Name column' containerStyle={styles.input_style}/>
        <Feather onPress={() => Change(props.list.id, title)} name="check" size={30} style={styles.icon_check}/>
        <EvilIcons onPress={() => Delete(props.list.id)} name='trash' size={32} style={styles.icon_trash}/>
        </View>
        </Overlay>
        </>
    )
}