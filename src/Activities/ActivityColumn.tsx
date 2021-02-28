import React from 'react'
import { View, Text, ScrollView, TextInput } from 'react-native';
import {Input, Button, Icon, ListItem} from 'react-native-elements'
import {ICard, IList} from '../Types/interfaces'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import styles from '../styles'
import Card from '../Component/Card'
import {useAppSelector} from '../redux/hooks' 
type ColumnProps = {
    route:any,
    navigation:any,
    onChangeDone(done:boolean, id:number):void,
    addCard(title:string, idColumn:number):void
    removeCard(id:number):void
}

type TasksProps = {
  route:any,
  navigation:any,
  onChangeDone(done:boolean, id:number):void,
  addCard(title:string, idColumn:number):void,
  removeCard(id:number):void
  idActiveColumn: number
}

const Tab = createMaterialTopTabNavigator();

export const ActivityColumn: React.FC<ColumnProps> = (props) => {
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
          <Tab.Screen name="Tasks" options={{title:'my tasks', }}  >
            {(propsCard) => <MyTasks {...propsCard} onChangeDone={props.onChangeDone} 
            addCard={props.addCard} idActiveColumn={idColumn} removeCard={props.removeCard}/>}
          </Tab.Screen>
          <Tab.Screen name="Subs" options={{title:'subscribed'}}>
            {(propsCard) => <SubscribedCards {...propsCard} onChangeDone={props.onChangeDone} 
            addCard={props.addCard} removeCard={props.removeCard} idActiveColumn={idColumn}/>}
          </Tab.Screen>
        </Tab.Navigator>
      );
}



const MyTasks: React.FC<TasksProps> = (props) => {
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
      changeName('')
    }
    const buttonDoneTask = () => {
      if(ArrCardsID.cardsID.length > 0)
      return (
        <View style={{marginLeft: '20%', marginTop: 20, marginBottom: 20, marginRight: '20%'}}>
        <Button title={show ? 'HIDE COMPLETED TASK' : 'SHOW COMPLETED TASK'} titleStyle={{fontSize:14}}
            buttonStyle={styles.button_sub_and_hide} onPress={visibleCardDone}/>
        </View>
      )
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
            placeholder='Add a task...'
            value={name} onChangeText={changeName}/>
            {ArrCardsID.cardsID.map((cardID:number) => {
              const findCard = cardsInColumn.find((card:ICard) => card.id === cardID)
              if(!findCard.done)
              return (
              <View key={cardID}>
              <Card onDeletePress={props.removeCard} card={findCard} onChangeDone={props.onChangeDone} navigation={props.navigation}/>
              </View>
              )
            })}
            {buttonDoneTask()}
            {ArrCardsID.cardsID.map((cardID:number) => {
              const findCard = cardsInColumn.find((card:ICard) => card.id === cardID)
              if(findCard.done && show)
              return (
              <View key={cardID}>
              <Card onDeletePress={props.removeCard} card={findCard} onChangeDone={props.onChangeDone} navigation={props.navigation}/>
              </View>
              )
            })}
        </ScrollView>
    )
}

const SubscribedCards: React.FC<TasksProps> = (props) => {
  const cardsInColumn = useAppSelector((state:any)=>{
    return state.card.cards
  })
  const ArrCardsID = useAppSelector((state:any)=> {
    return state.column.columns.find((column:IList) => column.id === props.idActiveColumn)
  })
  const [show, setShow] = React.useState(true)
  const visibleCardDone = () => {
    setShow(!show)
  }
  const buttonDoneTask = () => {
    if(cardsInColumn.find((card:ICard) => card.subscribed === true))
    return (
      <View style={{marginLeft: '20%', marginTop: 20, marginBottom: 20, marginRight: '20%'}}>
      <Button title={show ? 'HIDE COMPLETED TASK' : 'SHOW COMPLETED TASK'} titleStyle={{fontSize:14}}
          buttonStyle={styles.button_sub_and_hide} onPress={visibleCardDone}/>
      </View>
    )
  }
    return (
        <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
            {ArrCardsID.cardsID.map((cardID:number) => {
              const findCard = cardsInColumn.find((card:ICard) => card.id === cardID)
              if(!findCard.done && findCard.subscribed)
              return (
              <View key={cardID}>
              <Card onDeletePress={props.removeCard} card={findCard} onChangeDone={props.onChangeDone} navigation={props.navigation}/>
              </View>
              )
            })}
            {buttonDoneTask()}
            {ArrCardsID.cardsID.map((cardID:number) => {
              const findCard = cardsInColumn.find((card:ICard) => card.id === cardID)
              if(findCard.done && show && findCard.subscribed)
              return (
              <View key={cardID}>
              <Card onDeletePress={props.removeCard} card={findCard} onChangeDone={props.onChangeDone} navigation={props.navigation}/>
              </View>
              )
            })}
        </ScrollView>
    )
}