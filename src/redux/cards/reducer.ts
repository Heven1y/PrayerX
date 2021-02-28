import React from 'react'
import { ICard} from '../../Types/interfaces'
import {ADD_CARD, CHANGE_CARD, REMOVE_CARD, SUBSCRIBE_CARD, DONE_CARD} from './types'
import {ADD_COMMENT, REMOVE_COMMENT} from '../comments/types'

const initialState = { 
    cards: []
}
export const cardReducer = (state:any = initialState, action:any) => {
    switch (action.type){
        case ADD_CARD: return {
            ...state,
            cards: [action.payload.card, ...state.cards]
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
                        description: action.payload.description
                    }
                }
                return card
            })
        }
        case DONE_CARD: return {
            ...state,
            cards: state.cards.map((card:ICard) => {
                if(card.id === action.payload.id){
                    return{
                      ...card,
                      done: action.payload.done
                    }
                  }
                  return card
            })
        }
        case SUBSCRIBE_CARD: return {
            ...state,
            cards: state.cards.map((card:ICard) => {
                if(card.id === action.payload.id){
                    return{
                      ...card,
                      subscribed: action.payload.subscribe
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
                        commentsID: [action.payload.comment.id, ...card.commentsID]
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
                    commentsID: card.commentsID.filter(card => {
                        return card !== action.payload
                    })
                }
            })
        }
        default: return state
    }
}