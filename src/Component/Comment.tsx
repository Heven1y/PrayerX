import React from 'react'
import { Alert } from 'react-native'
import {ListItem} from 'react-native-elements'
import {IComment } from '../Types/interfaces';
import styles from '../styles'
import { useAppSelector } from '../redux/hooks';


type ListItemProps = {
  comment:IComment,
  changeComment(id: number, comment:string):void,
  removeComment(id:number):void
}

const Comment:React.FC<ListItemProps> = (props) => {
  const change = () => {
    props.changeComment(props.comment.id, props.comment.body)
  }
  const activeUser = useAppSelector((state:any) => {
    return state.user.user
  })
  const remove = () => {
    Alert.alert(
      "Deletion of the comment",
      'Are you sure you want to delete this comment: "' + props.comment.body + '"?',
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => props.removeComment(props.comment.id) }
      ],
      { cancelable: false }
    )
  }
  return (
    <ListItem containerStyle={styles.card_style} 
        onPress={change} onLongPress={remove}>
        <ListItem.Content>
        <ListItem.Title>{activeUser.name}</ListItem.Title>
        <ListItem.Subtitle>{props.comment.body}</ListItem.Subtitle>
        </ListItem.Content>
        </ListItem>
  )
}

export default Comment