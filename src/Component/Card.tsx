import React from 'react'
import { Text, TouchableOpacity, View, Image, LayoutAnimation, SafeAreaView, StyleSheet } from 'react-native'
import {ListItem, Button} from 'react-native-elements'
import { ICard } from '../Types/interfaces';
import styles from '../styles'
import Icon from 'react-native-vector-icons/Feather'

type ListItemProps = {
  onDeletePress():void,
  onChangeDone(done:boolean, id:number):void
  card: ICard
}

const Card:React.FC<ListItemProps> = (props) => {
  const [check, setCheck] = React.useState(props.card.done)
  const cheking = () => {
    props.onChangeDone(!check, props.card.id)
    setCheck(props.card.done)
  }
  return (
    <ListItem containerStyle={styles.card_style} 
        onPress={() => {}} onLongPress={() => {}}>
        <View style={{ backgroundColor:'#ff0000', width: 3, height: 15, borderStyle: 'solid', borderRadius: 50}}/>
        <ListItem.CheckBox checked={props.card.done} onPress={cheking} size={26}></ListItem.CheckBox>
        <ListItem.Content>
        <ListItem.Title style={props.card.done === true ? {textDecorationLine: 'line-through'}:{}}>{props.card.title}</ListItem.Title>
        </ListItem.Content>
        <Icon name='users' size={24}/>
        <Text>15</Text>
        <Icon name='trash' size={24} style={{color: '#ff0000'}}/>
        </ListItem>
  )
}

export default Card