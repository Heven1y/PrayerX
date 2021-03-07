import React from 'react'
import { ICard} from '../../Types/interfaces'
import {ADD_CARD, CHANGE_CARD, REMOVE_CARD, DONE_CARD, LOAD_CARD} from './types'
import {ADD_COMMENT, REMOVE_COMMENT} from '../comments/types'

const initialState = { 
    cards: []
}
export const cardReducer = (state:any = initialState, action:any) => {
    switch (action.type){
        case ADD_CARD: return {
            ...state,
            cards: [action.payload, ...state.cards]
        }
        case LOAD_CARD: return {
            ...state,
            cards: action.payload
        }
        case REMOVE_CARD: return {
            ...state,
            cards: state.cards.filter((card:ICard) => {
                return card.id !== action.payload
            })
        }
        case CHANGE_CARD: return {
            ...state,
            cards: state.cards.map((card:ICard) => {
                if(card.id === action.payload.id){
                    return {
                        ...card,
                        title: action.payload.title,
                        description: action.payload.description,
                        checked: action.payload.checked
                    }
                }
                return card
            })
        }
        case ADD_COMMENT: return {
            ...state,
            cards: state.cards.map((card:ICard) => {
                if(card.id === action.payload.idCard){
                    return {
                        ...card,
                        commentsIds: [action.payload.comment.id, ...card.commentsIds]
                    }
                }
                return card
            })
        }
        case REMOVE_COMMENT: return {
            ...state,
            cards: state.cards.map((card:ICard) => {
                return {
                    ...card,
                    commentsIds: card.commentsIds.filter(id => {
                        return id !== action.payload
                    })
                }
            })
        }
        default: return state
    }
}