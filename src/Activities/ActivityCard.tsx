import React from 'react'
import { View, Text, ScrollView, TextInput } from 'react-native';
import {Input, Button, Icon, ListItem} from 'react-native-elements'
import {ICard, IList} from '../Types/interfaces'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Feather from 'react-native-vector-icons/Feather'
import styles from '../styles'
import Card from '../Component/Card'
import {useAppSelector} from '../redux/hooks'

type CardProps = {
    route:any,
    navigation:any,
    subscribeCard(subscribe:boolean, id:number):void
}

export const ActivityCard:React.FC<CardProps> = (props) => {
    const { idCard } = props.route.params
    
    const activeCard = useAppSelector((state:any)=>{
        return state.card.cards.find((card:ICard) => card.id === idCard)
      })

      React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: '', 
            headerTitleStyle: styles.header_card_title, 
            headerRight: () => (
              <Feather
                onPress={() => {}}
                name="edit-3"
                size={22}
                style={styles.icon_edit_card}
              />
            ), 
            headerTintColor: '#fff',
            headerStyle: styles.header_card,
            
        });
      }, [props.navigation, activeCard.title]);
    const subscribe = () => {
        props.subscribeCard(!activeCard.subscribed, activeCard.id)
    }
    return (
        <>
        <View style={{width:'100%', height:'auto', backgroundColor:'#BFB393'}}>
            <Text style={{fontSize:16, color:'#fff', marginLeft: 25, marginRight: 25, marginBottom: 20, lineHeight: 28}}>{activeCard.title}</Text>
        </View>
        <ScrollView style={{backgroundColor:'#fff'}}>
            <Text>ID карты которой ты открыл: {activeCard.id}</Text>
            <Text>Описание карты: {activeCard.description}</Text>
            <Text>Автор карты: {activeCard.auctor}</Text>
            <Button title={activeCard.subscribed ? 'Отписаться от карты' : 'Подписаться на карту'} onPress={subscribe}/>
        </ScrollView>
        </>
    )

}