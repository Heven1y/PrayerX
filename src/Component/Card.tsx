import React from 'react'
import { Text } from 'react-native'
import {ListItem} from 'react-native-elements'
import { ICard } from '../Types/interfaces';
import styles from '../styles'
import Icon from 'react-native-vector-icons/Feather'
import commentApi from '../API/Comments'
import {useAppDispatch, useAppSelector} from '../redux/hooks'
import { loadCommentAction } from '../redux/comments/action';

type ListItemProps = {
  onDeletePress(id:number):void,
  onChangeDone(id:number, title: string, descript: string, done:boolean):void
  card: ICard,
  navigation: any
}

const Card:React.FC<ListItemProps> = (props) => {
  const [check, setCheck] = React.useState(props.card.checked)
  const activeUser = useAppSelector((state:any) => {
    return state.user.user
  })
  const dispatch = useAppDispatch()
  const cheking = () => {
    props.onChangeDone(props.card.id, props.card.title, props.card.description, !check)
    setCheck(props.card.checked)
  }
  const remove = () => {
    props.onDeletePress(props.card.id)
  }
  const openCard = async () => {
    const commentsFromAPI = await commentApi.getComment(activeUser.token)
    dispatch(loadCommentAction(commentsFromAPI))
    props.navigation.navigate('Card', { idCard: props.card.id})
  }
  return (
    <ListItem containerStyle={styles.card_style} 
        onPress={openCard} onLongPress={() => {}}>
        <ListItem.CheckBox checked={props.card.checked} onPress={cheking} size={26}></ListItem.CheckBox>
        <ListItem.Content>
        <ListItem.Title numberOfLines={1} style={props.card.checked === true ? {textDecorationLine: 'line-through'}:{}}>{props.card.title}</ListItem.Title>
        </ListItem.Content>
        <Icon name='message-square' size={24}/>
        <Text>{props.card.commentsIds.length}</Text>
        <Icon name='trash' size={24} style={{color: '#ff0000'}} onPress={remove}/>
        </ListItem>
  )
}

export default Card