import React from 'react'
import { View, ScrollView} from 'react-native';
import {Input, Icon} from 'react-native-elements'
import {ICard, IList} from '../Types/interfaces'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from '../styles'
import Card from '../Component/Card'
import {useAppSelector, useAppDispatch} from '../redux/hooks' 
import { addCardAction, removeCardAction, changeDoneAction} from '../redux/cards/action'
type ColumnProps = {
    route:any,
    navigation:any
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
    const dispatch = useAppDispatch()
    const onChangeDone = (done:boolean, id:number) => {
      dispatch(changeDoneAction(done, id))
    }
    const addCard = (title: string, idColumn:number) => {
      if(title === '') title = 'Task'
      const newCard:ICard = {
        id: Date.now(),
        title: title,
        description: 'To change the description of the card click on the button in the upper right corner of the screen',
        auctor: 'Admin',
        done: false,
        commentsID: []
      }
      dispatch(addCardAction(newCard, idColumn))
    }
    const removeCard = (id:number) => {
      console.log('Карта удалена: '+id)
      dispatch(removeCardAction(id))
    }
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: titleColumn, 
            headerTitleStyle: styles.header, 
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0, },
            headerTitleAlign: 'center',
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
            {(propsCard) => <MyTasks {...propsCard} onChangeDone={onChangeDone} 
            addCard={addCard} idActiveColumn={idColumn} removeCard={removeCard}/>}
          </Tab.Screen>
          <Tab.Screen name="Done" options={{title:'done'}}>
            {(propsCard) => <DoneCards {...propsCard} onChangeDone={onChangeDone} 
            addCard={addCard} removeCard={removeCard} idActiveColumn={idColumn}/>}
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
    const [name, changeName] = React.useState('')
    const addCardNew = () => {
      props.addCard(name, props.idActiveColumn)
      changeName('')
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
              <Card {...props} onDeletePress={props.removeCard} card={findCard} onChangeDone={props.onChangeDone}/>
              </View>
              )
            })}
        </ScrollView>
    )
}

const DoneCards: React.FC<TasksProps> = (props) => {
  const cardsInColumn = useAppSelector((state:any)=>{
    return state.card.cards
  })
  const ArrCardsID = useAppSelector((state:any)=> {
    return state.column.columns.find((column:IList) => column.id === props.idActiveColumn)
  })
    return (
        <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
            {ArrCardsID.cardsID.map((cardID:number) => {
              const findCard = cardsInColumn.find((card:ICard) => card.id === cardID)
              if(findCard.done)
              return (
              <View key={cardID}>
              <Card {...props} onDeletePress={props.removeCard} card={findCard} onChangeDone={props.onChangeDone}/>
              </View>
              )
            })}
        </ScrollView>
    )
}