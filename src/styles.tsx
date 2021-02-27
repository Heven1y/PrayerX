import { transform } from '@babel/core';
import React from 'react'
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center'
    },
    login_text: {
      position: 'relative',
      fontSize: 20,
      marginBottom: 20
    },
    inputView: {
    },
    input_style: {
      width: 300
    },
    button_style: {
      flexDirection: 'row',
    },
    btn_register: {
      marginLeft: 30
    },
    header: {
      position: 'absolute',
      left: '50%',
      transform: [{translateY: -15}],
      fontSize: 16
    },
    icon_add: {
      position: 'relative',
      color: '#72A8BC',
      fontSize: 32,
      right: 5
    },
    icon_settings: {
      position: 'relative',
      color: '#72A8BC',
      fontSize: 32,
      width: 40
    },
    column_style: {
      width: '100%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 15
    },
    column_style_onPress: {
      width: '90%',
      marginLeft: '5%',
      marginBottom: 10,
      borderStyle: 'solid',
      borderRadius: 15
    },
    icon_check: {
      position: 'relative',
      color: '#7CFC00',
      width: 40,
      left: '85%',
      top: '-5%'
    },
    icon_trash: {
      position: 'absolute',
      color: '#FF0000',
      width: 40,
      left: '5%',
      top: '75%'
    },
    card_style: {
      width: '100%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderTopWidth: 0,
      borderColor: '#f0f0f0'
    },
    button_sub_and_hide: {
      width: '100%', 
      height: 30, 
      borderStyle: 'solid',
      borderRadius: 50,
      backgroundColor: '#BFB393'
    }
  });

export default styles