import React from 'react'
import { IComment} from '../../Types/interfaces'
import { ADD_COMMENT, REMOVE_COMMENT, CHANGE_COMMENT, LOAD_COMMENT } from './types'

export const addCommentAction = (idCard:number, comment:IComment) => {
    return {
        type: ADD_COMMENT,
        payload: {
            idCard: idCard,
            comment: comment
        }
    }
}
export const removeCommentAction = (id:number) => {
    return {
        type: REMOVE_COMMENT,
        payload: id
    }
}

export const loadCommentAction = (comments:IComment[]) => {
    return {
        type: LOAD_COMMENT,
        payload: comments
    }
}

export const changeCommentAction = (id:number, newComment:string) => {
    return {
        type: CHANGE_COMMENT,
        payload: {
            id: id,
            newComment: newComment
        }
    }
}