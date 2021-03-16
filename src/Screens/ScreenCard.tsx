import React from 'react'
import { View, Text, ScrollView, KeyboardAvoidingView, ToastAndroid, Keyboard } from 'react-native';
import {Input, Overlay, Button} from 'react-native-elements'
import {ICard, IComment} from '../Types/interfaces'
import Feather from 'react-native-vector-icons/Feather'
import styles from '../styles'
import {useAppDispatch, useAppSelector} from '../redux/hooks'
import Comment from '../Component/Comment'
import {addCommentAction, changeCommentAction, removeCommentAction} from '../redux/comments/action'
import {changeCardAction} from '../redux/cards/action'
import commentApi from '../API/Comments'
import cardsApi from '../API/Cards'

type CardProps = {
    route:any,
    navigation:any
}

export const ActivityCard:React.FC<CardProps> = (props) => {
    const { idCard } = props.route.params
    let refOnInput:any
    const [visible, setVisible] = React.useState(false)
    const [idComment, setID] = React.useState(0)
    const [valueInput, setValue] = React.useState('')
    const activeCard = useAppSelector((state:any)=>{
        return state.card.cards.find((card:ICard) => card.id === idCard)
    })
    const commentsInCard = useAppSelector((state:any) => {
       return state.comment.comments
    })
    const activeUser = useAppSelector((state:any) => {
      return state.user.user
   })
    const [title, setTitle] = React.useState(activeCard.title)
    const [descript, setDescript] = React.useState(activeCard.description)
    const dispatch = useAppDispatch()
      React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: '', 
            headerTitleStyle: styles.header_card_title, 
            headerRight: () => (
              <Feather
                onPress={toggleOverlay}
                name="edit-3"
                size={22}
                style={styles.icon_edit_card}
              />
            ), 
            headerTintColor: '#fff',
            headerStyle: styles.header_card,
            
        });
      }, [props.navigation, activeCard.title]);
    const addComment = () => {
      const newComment:IComment = {
        id: Date.now(),
        body: valueInput
      }
      dispatch(addCommentAction(idCard, newComment))
      ToastAndroid.show("Comment added!", ToastAndroid.SHORT);
      setValue('')
      Keyboard.dismiss()
    }
    const changeCard = () => {
      dispatch(changeCardAction(idCard, title, descript, activeCard.checked))
      cardsApi.changeCard(activeUser.token, idCard, {title: title, description: descript, checked: activeCard.checked})
      setVisible(!visible)
    }
    const prevChange = (id:number, comment:string) => {
      setValue(comment)
      setID(id)
      refOnInput.focus()
      ToastAndroid.show("You are currently editing a comment", ToastAndroid.SHORT);
    }
    const changeComment = () => {
      commentApi.changeComment(activeUser.token, idComment, {body: valueInput})
      dispatch(changeCommentAction(idComment, valueInput))
      ToastAndroid.show("Comment changed!", ToastAndroid.SHORT);
      setID(0)
      setValue('')
      Keyboard.dismiss()
    }
    const removeComment = (id:number) => {
      commentApi.removeComment(activeUser.token, id)
      dispatch(removeCommentAction(id))
    }
    const toggleOverlay = () => {
      setVisible(!visible)
    }
    return (
        <>
        <View style={{width:'100%', height:'auto', backgroundColor:'#BFB393'}}>
            <Text style={{fontSize:16, color:'#fff', marginLeft: 25, marginRight: 25, marginBottom: 20, lineHeight: 28}}>{activeCard.title}</Text>
        </View>
        <View style={{...styles.style_View_in_card, width: '100%', flexDirection: 'row'}}>
        <View><Text style={styles.style_text_in_card_for_title}>Date create card</Text></View>
        <View style={{flex: 1, alignItems: 'center'}}><Text style={{color: '#BFB393', fontSize: 16, marginTop: 14}}>{new Date(activeCard.id).toDateString()}</Text></View>
        </View>
        <View style={{...styles.style_View_in_card,width: '100%', borderStyle: 'solid', borderRightWidth: 1, borderColor: '#f0f0f0'}}>
        <View><Text style={styles.style_text_in_card_for_title}>Description</Text></View>
        <ScrollView style={{maxHeight:100}}><Text style={styles.style_text_in_card}>{activeCard.description}</Text></ScrollView>
        </View>
        <View style={{backgroundColor:'#fff'}}><Text style={styles.style_text_in_card_for_title}>Comments</Text></View>
        <ScrollView style={{backgroundColor:'#fff'}}>
          {activeCard.commentsIds.map((commentID:number)=> {
            const findComment = commentsInCard.find((comment:IComment) => comment.id === commentID)
            return (
              <View key={commentID}>
                <Comment comment={findComment} changeComment={prevChange} removeComment={removeComment}/>
              </View>
            )
          })}
        </ScrollView>
        <KeyboardAvoidingView keyboardVerticalOffset={-500} behavior='padding' style={{ marginVertical: -25, backgroundColor: '#fff',}}>
            <Input
              value={valueInput}
              onBlur={() => {
                setID(0)
                setValue('')
              }}
              ref={(input) => refOnInput = input}
              style={{maxHeight:100, position:'relative'}}
              containerStyle={{ borderStyle: 'solid', borderWidth: 1, borderColor: '#f0f0f0'}}
              inputContainerStyle={{ borderBottomColor: '#fff'}}
              onChangeText={setValue}
              multiline={true}
              placeholder='Add a comment...'
              rightIcon={valueInput.length > 0 ? <Feather onPress={() => idComment !== 0 ? changeComment() : addComment()} name="send" size={26} 
              style={styles.icon_add_comment} /> : <></>}
              leftIcon={<Feather name="message-square" size={26} style={styles.icon_add_comment} />}
            />
        </KeyboardAvoidingView>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View>
          <Text style={{marginLeft:10, fontSize: 20, marginBottom: 10, marginTop: 10}}>Change card</Text>
          <Input value={title} onChangeText={setTitle} placeholder='Title card' containerStyle={styles.input_style}/>
          <Input style={{maxHeight: 200}} multiline={true} value={descript} 
          onChangeText={setDescript} placeholder='Descripton' containerStyle={styles.input_style}
          inputContainerStyle = {{borderStyle: 'solid', borderRadius: 10, borderWidth: 1, borderColor: '#999'}}/>
          <Button onPress={changeCard} icon={<Feather name="check" size={30} style={{ color: '#72A8BC',}}/>} 
          buttonStyle={{backgroundColor: '#f0f0ff', borderRadius: 30}}/>
          </View>
        </Overlay>
        </>
    )

}