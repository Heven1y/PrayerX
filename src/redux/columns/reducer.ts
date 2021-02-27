import React from 'react'
import { IList} from '../../Types/interfaces'
import {ADD_COLUMN, CHANGE_COLUMN, REMOVE_COLUMN} from './types'
import { REMOVE_CARD, ADD_CARD} from '../cards/types'

const initialState = { 
    columns: []
}
export const listReducer = (state:any = initialState, action:any) => {
    switch(action.type) {
        case ADD_COLUMN: return {...state, columns: [action.payload, ...state.columns]}
        case REMOVE_COLUMN: return {...state, columns: state.columns.filter((column:IList) => column.id !== action.payload)}
        case CHANGE_COLUMN: return {
            ...state,
            columns: state.columns.map((column:IList) => {
                if(column.id === action.payload.id){
                    return {
                        ...column,
                        title: action.payload.title
                    }
                }
                return column
            })
        }
        case ADD_CARD: return {
            ...state,
            columns: state.columns.map((column:IList) => {
                if(column.id === action.payload.idList){
                    return {
                        ...column,
                        cardsID: [action.payload.card.id, ...column.cardsID]
                    }
                }
                return column
            })
        }
        case REMOVE_CARD: return {
            ...state,
            columns: state.columns.map((column:IList) => {
                return {
                    ...column,
                    cardsID: column.cardsID.filter(card => {
                        return card !== action.payload
                    })
                }
            })
        }
        default: return state
    }
}