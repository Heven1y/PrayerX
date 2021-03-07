import React from 'react'
import { View, ScrollView} from 'react-native';
import {Input, Icon} from 'react-native-elements'
import {ICard} from '../Types/interfaces'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from '../styles'
import Card from '../Component/Card'
import {useAppSelector, useAppDispatch} from '../redux/hooks' 
import { addCardAction, removeCardAction, changeCardAction} from '../redux/cards/action'
import cardsApi from '../API/Cards'
type ColumnProps = {
    route:any,
    navigation:any
}

type TasksProps = {
  route:any,
  navigation:any,
  onChangeDone(id:number, title: string, descript: string, done:boolean):void
  addCard(title:string, idColumn:number):void,
  removeCard(id:number):void
  idActiveColumn: number
}

const Tab = createMaterialTopTabNavigator();

export const ActivityColumn: React.FC<ColumnProps> = (props) => {
    const { titleColumn, idColumn} = props.route.params
    const activeUser = useAppSelector((state:any) => state.user.user)
    const dispatch = useAppDispatch()
    const onChangeDone = async (id:number, title: string, descript: string, done:boolean) => {
      console.log(done)
      dispatch(changeCardAction(id, title, descript, done))
      const result = await cardsApi.changeCard(activeUser.token, id, {title: title, description: descript, checked: done})
      console.log(result)
    }
    const addCard = async (title: string, idColumn:number) => {
      if(title === '') title = 'Task'
      const result:any = await cardsApi.createCard(activeUser.token, {
        title: title, 
        description: 'To change the description of the card click on the button in the upper right corner of the screen', 
        checked: false,
        column: {id:idColumn}
      })
      console.log(result)
      const newCard:ICard = {
        id: result.id,
        columnId: idColumn,
        title: title,
        description: 'To change the description of the card click on the button in the upper right corner of the screen',
        checked: false,
        commentsIds: []
      }
      dispatch(addCardAction(newCard))
    }
    const removeCard = (id:number) => {
      dispatch(removeCardAction(id))
      cardsApi.removeCard(activeUser.token, id)
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
    const [name, changeName] = React.useState('')
    const cards = useAppSelector((state:any)=> state.card.cards)
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
            {cards.map((card:ICard) => {
              if(!card.checked)
              return (
              <View key={card.id}>
              <Card {...props} onDeletePress={props.removeCard} card={card} onChangeDone={props.onChangeDone}/>
              </View>
              )
            })}
        </ScrollView>
    )
}

const DoneCards: React.FC<TasksProps> = (props) => {
  const cards = useAppSelector((state:any)=> state.card.cards)
    return (
        <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
            {cards.map((card:ICard) => {
              if(card.checked)
              return (
              <View key={card.id}>
              <Card {...props} onDeletePress={props.removeCard} card={card} onChangeDone={props.onChangeDone}/>
              </View>
              )
            })}
        </ScrollView>
    )
}