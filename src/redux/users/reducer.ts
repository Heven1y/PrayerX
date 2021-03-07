import React from 'react'
import {IUser} from '../../Types/interfaces'
import {REG_USER, ACTIVE_USER} from './types'

const initialState = {
    user: {
        active: false,
        token: '',
        name: ''
    }
}

export const userReducer = (state:any = initialState, action:any) => {
    switch (action.type){
        case ACTIVE_USER: return {
            ...state,
            user: action.payload
        }
        default: return state
    }
}