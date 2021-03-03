import React from 'react'
import {IUser} from '../../Types/interfaces'
import {REG_USER, ACTIVE_USER} from './types'

const initialState = {
    user: {}
}

export const userReducer = (state:any = initialState, action:any) => {
    switch (action.type){
        case ACTIVE_USER: return {
            ...state,
            user: {
                ...state.user,
                active: action.payload.active
            }
        }
        default: return state
    }
}