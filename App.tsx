import React, {useState} from 'react';
import styles from './src/styles'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {SignIn, SignUp} from './src/Activities/ActivitiesAuthorization'
import {Column} from './src/Component/Column'
import {Icon, Input, Overlay, Text} from 'react-native-elements'
import Feather from 'react-native-vector-icons/Feather'
import {ActivityColumn} from './src/Activities/ActivityColumn'
import {ActivityCard} from './src/Activities/ActivityCard'
import {ICard, IList} from './src/Types/interfaces'
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {connect, ConnectedProps} from 'react-redux'
import {addListAction, removeListAction, changeListAction} from './src/redux/columns/action' 
import { addCardAction, changeCardAction, removeCardAction, changeDoneAction, subscribeCardAction} from './src/redux/cards/action'
import {  addCommentAction, changeCommentAction, removeCommentAction} from './src/redux/comments/action'
type PropsFromRedux = ConnectedProps<typeof connector>

const mapDispatchToProps = {
  addListAction,
  removeListAction,
  changeListAction,
  addCardAction,
  changeCardAction,
  removeCardAction,
  addCommentAction,
  changeCommentAction,
  removeCommentAction,
  changeDoneAction,
  subscribeCardAction
}

const mapStateToProps = (state:any) => {
  return {
    columnsRedux: state.column.columns
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

const Stack = createStackNavigator();

const App:React.FC<PropsFromRedux> = (propsApp) => {
  const [visible, setVisible] = useState(false);
  const [titleDesk, onChangeTitle] = React.useState('')
  const addCard = (title: string, idColumn:number) => {
    if(title === '') title = 'Task'
    const newCard:ICard = {
      id: Date.now(),
      title: title,
      description: 'Opisanie',
      auctor: 'sema',
      subscribed: false,
      done: false,
      commentsID: []
    }
    propsApp.addCardAction(newCard, idColumn)
  }
  const onChangeDone = (done:boolean, id:number) => {
      propsApp.changeDoneAction(done, id)
  }
  const removeCard = (id:number) => {
      console.log('Карта удалена: '+id)
      propsApp.removeCardAction(id)
  }
  const subscribeCard = (subscribe: boolean, id:number) => {
    propsApp.subscribeCardAction(subscribe, id)
  }


    const addColumn = (title:string) => {
        if(title === '') title = 'Column'
        const newColumn:IList = {
            id: Date.now(),
            title: title,
            cardsID: []
        }
        propsApp.addListAction(newColumn)
        setVisible(!visible)
        onChangeTitle('')
    }

    const changeColumn = (id:number, title:string) => {
      if(title === '') title = 'Column'
      propsApp.changeListAction(id, title)
    }
    const removeColumn = (id:number) => {
      propsApp.removeListAction(id)
    }

    const toggleOverlay = () => {
      setVisible(!visible);
    };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Desk'>
        <Stack.Screen name="Sign In" component={SignIn}/>
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Desk" options={{
             title: 'My Desk', 
             headerTitleStyle: styles.header, 
             headerRight: () => (
                 <Icon
                   onPress={toggleOverlay}
                   name="add"
                   iconStyle={styles.icon_add}
                 />
               ),
               headerTitleAlign: 'center'
        }}>
          {(props) => {
            return(
            <>
              <ScrollView style={{backgroundColor: '#fff'}}>
              <View style={{marginTop: 10, marginBottom: 10}}>
              {propsApp.columnsRedux.map((column:IList) => {
              return(
                <View key={column.id}>
                <Column {...props} list={column} changeColumn={changeColumn} removeColumn={removeColumn}></Column>
                </View>
              )
              })}
              </View>
              </ScrollView>
              <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
              <View>
              <Text style={{marginLeft:10, fontSize: 20, marginBottom: 10, marginTop: 10}}>Create column</Text>
              <Input value={titleDesk} onChangeText={onChangeTitle} placeholder='Name column' containerStyle={styles.input_style}/>
              <Feather onPress={() => {addColumn(titleDesk)}} name="check" size={30} style={styles.icon_check}/>
              </View>
              </Overlay>
            </>
            )}}
        </Stack.Screen>
        <Stack.Screen name="Column" options={{headerLeft: () => null, headerTitleAlign: 'center',}}>
            {(props) => <ActivityColumn {...props} onChangeDone={onChangeDone} addCard={addCard} removeCard={removeCard}/>}
        </Stack.Screen>
        <Stack.Screen name="Card">
            {(props) => <ActivityCard {...props} subscribeCard={subscribeCard}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default connector(App)
