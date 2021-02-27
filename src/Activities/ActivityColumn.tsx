import React from 'react'
import { View, Text, ScrollView, TextInput } from 'react-native';
import {Input, Button, Icon, ListItem} from 'react-native-elements'
import {ICard, IList} from '../Types/interfaces'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import styles from '../styles'
import Card from '../Component/Card'
import {useAppSelector} from '../redux/hooks' 
type CardsProps = {
    route:any,
    navigation:any,
    onChangeDone(done:boolean, id:number):void,
    addCard(title:string, idColumn:number):void
}

type CardsPropsRoot = {
  route:any,
  navigation:any,
  onChangeDone(done:boolean, id:number):void,
  addCard(title:string, idColumn:number):void
  idActiveColumn: number
}

const Tab = createMaterialTopTabNavigator();

export const ActivityColumn: React.FC<CardsProps> = (props) => {
    const { titleColumn, idColumn } = props.route.params
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: titleColumn, 
            headerTitleStyle: styles.header, 
            headerRight: () => (
              <EvilIcons
                onPress={() => {}}
                name="gear"
                size={30}
                style={styles.icon_settings}
              />
            ), headerStyle: {
              elevation: 0,
              shadowOpacity: 0, }
        });
      }, [props.navigation, titleColumn]);
    return (
        <Tab.Navigator tabBarOptions={{
          activeTintColor:'#72A8BC', 
          indicatorStyle: {
          backgroundColor: '#72A8BC'
          },
          inactiveTintColor:'#C8C8C8'
        }} >
          <Tab.Screen name="Prayers" options={{title:'my prayers', }}  >
            {(propsCard) => <MyPrayers {...propsCard} onChangeDone={props.onChangeDone} 
            addCard={props.addCard} idActiveColumn={idColumn}/>}
          </Tab.Screen>
          <Tab.Screen name="Subs" options={{title:'subscribed'}}>
            {(propsCard) => <SubscribedCards {...propsCard} onChangeDone={props.onChangeDone} 
            addCard={props.addCard}/>}
          </Tab.Screen>
        </Tab.Navigator>
      );
}



const MyPrayers: React.FC<CardsPropsRoot> = (props) => {
    const cardsInColumn = useAppSelector((state:any)=>{
      return state.card.cards
    })
    const ArrCardsID = useAppSelector((state:any)=> {
      return state.column.columns.find((column:IList) => column.id === props.idActiveColumn)
    })
    const [show, setShow] = React.useState(true)
    const [name, changeName] = React.useState('')
    const visibleCardDone = () => {
      setShow(!show)
    }
    const addCardNew = () => {
      props.addCard(name, props.idActiveColumn)
    }
    return (
        <ScrollView style={{backgroundColor:'#fff'}}>
            <Input leftIcon={<Icon onPress={addCardNew} name='add' iconStyle={{color: '#72A8BC', fontSize: 32, marginLeft: 10}}/>} 
            inputContainerStyle={{
              marginLeft: '2%', 
              marginRight: '2%',
              marginTop: 10,
              marginBottom: 10,
              borderStyle: 'solid',
              borderWidth: 1,
              borderRadius: 10,
              borderColor: '#C8C8C8'
            }}
            placeholder='Add a prayer...'
            value={name} onChangeText={changeName}/>
            {ArrCardsID.cardsID.map((cardID:number) => {
              if(cardsInColumn.find((card:ICard) => card.id === cardID).done === false)
              return (
              <View key={cardID}>
              <Card onDeletePress={()=>{}} card={cardsInColumn.find((card:ICard) => card.id === cardID)} onChangeDone={props.onChangeDone}/>
              </View>
              )
            })}
            <View style={{marginLeft: '20%', marginTop: 20, marginBottom: 20, marginRight: '20%'}}>
            <Button title={show === true ? 'Hide answered prayers' : 'Show answered prayers'} buttonStyle={styles.button_sub_and_hide} onPress={visibleCardDone}/>
            </View>
            {ArrCardsID.cardsID.map((cardID:number) => {
              if(cardsInColumn.find((card:ICard) => card.id === cardID).done === true && show === true)
              return (
              <View key={cardID}>
              <Card onDeletePress={()=>{}} card={cardsInColumn.find((card:ICard) => card.id === cardID)} onChangeDone={props.onChangeDone}/>
              </View>
              )
            })}
        </ScrollView>
    )
}

const SubscribedCards: React.FC<CardsProps> = (props) => {
    return (
        <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
            <Text>Тут карты на которые я подписан видимо</Text>
        </ScrollView>
    )
}