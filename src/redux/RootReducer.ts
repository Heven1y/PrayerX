import React from 'react'
import {combineReducers} from 'redux'
import { listReducer } from './columns/reducer'
import {cardReducer} from './cards/reducer'
import {commentReducer} from './comments/reducer'
import {userReducer} from './users/reducer'
export const AppReducer = combineReducers({
    column: listReducer,
    card: cardReducer,
    comment: commentReducer,
    user: userReducer
})

const RootReducer = (state:any, action:any) => {
    if(action.type === 'RESET_STORE'){
        state = undefined
    }
    return AppReducer(state, action)
  }

export default RootReducer