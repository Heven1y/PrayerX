import React from 'react'
import { ADD_CARD_IN_API, LOAD_CARD_FROM_API } from '../redux/cards/types'
import { ADD_COLUMN_IN_API } from '../redux/columns/types'
import { ADD_COMMENT_IN_API, LOAD_COMMENT_FROM_API } from '../redux/comments/types'
export const addColumnInApi = (token: string, title:string) => {
    return {
        type: ADD_COLUMN_IN_API,
        payload: {
            token: token,
            title: title
        }
    }
}

export const loadCardsFromApi = (token:string, id:number) => {
    return {
        type: LOAD_CARD_FROM_API,
        payload: {
            token: token,
            id: id
        }
    }
}

export const addCardInApi = (token: string, card: any) => {
    return {
        type: ADD_CARD_IN_API,
        payload: {
            token: token,
            card: card
        }
    }
}

export const loadCommentsFromApi = (token:string) => {
    return {
        type: LOAD_COMMENT_FROM_API,
        payload: token
    }
}

export const addCommentInApi = (token: string, idCard: number, body:string) => {
    return {
        type: ADD_COMMENT_IN_API,
        payload: {
            token: token,
            idCard: idCard,
            body: body
        }
    }
}