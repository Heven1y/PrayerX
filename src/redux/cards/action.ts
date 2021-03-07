import React from 'react'
import { ICard} from '../../Types/interfaces'
import { ADD_CARD, REMOVE_CARD, CHANGE_CARD, LOAD_CARD} from './types'
export const addCardAction = (card:ICard) => {
    return {
        type: ADD_CARD,
        payload: card
    }
}
export const removeCardAction = (id :number) => {
    return {
        type: REMOVE_CARD,
        payload: id
    }
}
export const changeCardAction = (id:number, title:string, description:string, checked:boolean) => {
    return {
        type: CHANGE_CARD,
        payload: {
            id: id,
            title: title,
            description: description,
            checked: checked
        }
    }
}

export const loadCardAction = (cards:ICard[]) => {
    return {
        type: LOAD_CARD,
        payload: cards
    }
}