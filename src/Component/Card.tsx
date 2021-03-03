import React from 'react'
import { Text, TouchableOpacity, View, Image, LayoutAnimation, SafeAreaView, StyleSheet } from 'react-native'
import {ListItem, Button} from 'react-native-elements'
import { ICard } from '../Types/interfaces';
import styles from '../styles'
import Icon from 'react-native-vector-icons/Feather'
import {useAppSelector} from '../redux/hooks'

type ListItemProps = {
  onDeletePress(id:number):void,
  onChangeDone(done:boolean, id:number):void
  card: ICard,
  navigation: any
}

const Card:React.FC<ListItemProps> = (props) => {
  const numberCommentsInCard = useAppSelector((state:any)=>{
    return state.card.cards.find((card:ICard) => card.id === props.card.id).commentsID.length
  })
  const [check, setCheck] = React.useState(props.card.done)
  const cheking = () => {
    props.onChangeDone(!check, props.card.id)
    setCheck(props.card.done)
  }
  const remove = () => {
    props.onDeletePress(props.card.id)
  }
  const openCard = () => {
    props.navigation.navigate('Card', { idCard: props.card.id})
  }
  return (
    <ListItem containerStyle={styles.card_style} 
        onPress={openCard} onLongPress={() => {}}>
        <ListItem.CheckBox checked={props.card.done} onPress={cheking} size={26}></ListItem.CheckBox>
        <ListItem.Content>
        <ListItem.Title numberOfLines={1} style={props.card.done === true ? {textDecorationLine: 'line-through'}:{}}>{props.card.title}</ListItem.Title>
        </ListItem.Content>
        <Icon name='message-square' size={24}/>
        <Text>{numberCommentsInCard}</Text>
        <Icon name='trash' size={24} style={{color: '#ff0000'}} onPress={remove}/>
        </ListItem>
  )
}

export default Card