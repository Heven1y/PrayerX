import React from 'react'
import {combineReducers} from 'redux'
import { listReducer } from './columns/reducer'
import {cardReducer} from './cards/reducer'
import {commentReducer} from './comments/reducer'
import {userReducer} from './users/reducer'
export const RootReducer = combineReducers({
    column: listReducer,
    card: cardReducer,
    comment: commentReducer,
    user: userReducer
})
export default RootReducer