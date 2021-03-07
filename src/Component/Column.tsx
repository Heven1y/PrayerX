import React from 'react'
import { View, Text} from 'react-native';
import {Input, Button, ListItem, Overlay} from 'react-native-elements'
import Feather from 'react-native-vector-icons/Feather'
import styles from '../styles'
import {ICard, IList} from '../Types/interfaces'
import cardsApi from '../API/Cards'
import {useAppDispatch, useAppSelector} from '../redux/hooks'
import { loadCardAction } from '../redux/cards/action';
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
    const activeUser = useAppSelector((state:any) => state.user.user.token)
    const dispatch = useAppDispatch()
    const openColumn = async (title:string) => {
        const cardsFromAPI = await cardsApi.getCards(activeUser)
        props.navigation.navigate('Column', { titleColumn: title, idColumn: props.list.id})
        dispatch(loadCardAction(cardsFromAPI.filter((card:ICard) => card.columnId === props.list.id)))
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
        <Button onPress={() => Change(props.list.id, title)} icon={<Feather name="check" size={30} style={{ color: '#72A8BC',}}/>} 
          buttonStyle={{backgroundColor: '#f0f0ff', borderRadius: 30}}/>
          <Button onPress={() => Delete(props.list.id)} icon={<Feather name='trash' size={25} style={{color: '#FF0000',}}/>} 
          buttonStyle={{marginTop:10, backgroundColor: '#fff0f0', borderRadius: 30}}/>
        </View>
        </Overlay>
        </>
    )
}