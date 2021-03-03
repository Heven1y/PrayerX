import React from 'react'
import { View, Text, ScrollView, ToastAndroid } from 'react-native';
import {Input, Button, Icon, Overlay} from 'react-native-elements'
import {IList} from '../Types/interfaces'
import Feather from 'react-native-vector-icons/Feather'
import styles from '../styles'
import {useAppDispatch, useAppSelector} from '../redux/hooks'
import {addListAction, changeListAction, removeListAction} from '../redux/columns/action'
import {setActiveUserAction} from '../redux/users/action'
import {Column} from '../Component/Column'

type DeskProps = {
    route:any,
    navigation:any
}

export const ActivityDesk:React.FC<DeskProps> = (props) => {
    const [visible, setVisible] = React.useState(false);
    const [titleDesk, onChangeTitle] = React.useState('')
    const Columns = useAppSelector((state:any)=>{
        return state.column.columns
      })
    const dispatch = useAppDispatch()
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'My Desk', 
             headerTitleStyle: styles.header, 
             headerRight: () => (
                 <Icon
                   onPress={toggleOverlay}
                   name="add"
                   iconStyle={styles.icon_add}
                 />
               ),
               headerLeft: () => (
                <Icon
                onPress={logOut}
                name="logout"
                iconStyle={{width: 40, marginLeft: 10}}
              />
               ),
               headerTitleAlign: 'center'
        });
      }, [props.navigation]);
    const addColumn = (title:string) => {
        if(title === '') title = 'Column'
        const newColumn:IList = {
            id: Date.now(),
            title: title,
            cardsID: []
        }
        dispatch(addListAction(newColumn))
        setVisible(!visible)
        onChangeTitle('')
    }
    const logOut = () => {
      dispatch(setActiveUserAction(false))
    }
    const changeColumn = (id:number, title:string) => {
      if(title === '') title = 'Column'
      dispatch(changeListAction(id, title))
    }
    const removeColumn = (id:number) => {
        dispatch(removeListAction(id))
    }

    const toggleOverlay = () => {
      setVisible(!visible);
    };
    return(
        <>
          <ScrollView style={{backgroundColor: '#fff'}}>
          <View style={{marginTop: 10, marginBottom: 10}}>
          {Columns.map((column:IList) => {
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
          <Button onPress={() => addColumn(titleDesk)} icon={<Feather name="check" size={30} style={{ color: '#72A8BC',}}/>} 
          buttonStyle={{backgroundColor: '#f0f0ff', borderRadius: 30}}/>
          </View>
          </Overlay>
        </>
        )

}