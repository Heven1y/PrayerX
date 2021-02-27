import React from 'react'
import { IList } from '../../Types/interfaces'
import { ADD_COLUMN, CHANGE_COLUMN, REMOVE_COLUMN } from './types'
export const addListAction = (list:IList) => {
    return {
        type: ADD_COLUMN,
        payload: list
    }
}
export const removeListAction = (id:number) => {
    return {
        type: REMOVE_COLUMN,
        payload: id
    }
}
export const changeListAction = (id: number, title: string) => {
    return {
        type: CHANGE_COLUMN,
        payload: {
            id: id,
            title: title
        }
    }
}