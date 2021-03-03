import React from 'react'
import { ICard} from '../../Types/interfaces'
import { ADD_CARD, REMOVE_CARD, CHANGE_CARD, DONE_CARD} from './types'
export const addCardAction = (card:ICard, idList:number) => {
    return {
        type: ADD_CARD,
        payload: {
            card: card,
            idList: idList
        }
    }
}
export const removeCardAction = (id :number) => {
    return {
        type: REMOVE_CARD,
        payload: id
    }
}
export const changeCardAction = (id:number, title:string, description:string) => {
    return {
        type: CHANGE_CARD,
        payload: {
            id: id,
            title: title,
            description: description
        }
    }
}
export const changeDoneAction = (done: boolean, id:number) => {
    return {
        type: DONE_CARD,
        payload: {
            id: id,
            done: done
        }
    }
}