import { call, put, takeEvery } from '@redux-saga/core/effects'
import React from 'react'
import { IComment } from '../../Types/interfaces'
import { addCommentAction, loadCommentAction } from './action'
import comments from '../../API/Comments'
import { useAppSelector } from '../hooks'
import { ADD_COMMENT, LOAD_COMMENT } from './types'

export default [
    takeEvery(LOAD_COMMENT, sagaLoadComments),
    takeEvery(ADD_COMMENT, sagaAddComments)
]

function *sagaLoadComments(action:any) {
    const data:IComment[] = yield call(commentsFromApi, action.payload)
    yield put(loadCommentAction(data))
}

function *sagaAddComments(action:any) {
    const data:IComment = yield call(commentInApi, action.payload)
    yield put(addCommentAction(action.payload.idCard, data))
}

async function commentsFromApi(payload:any) {
    try{
        const activeUserToken = useAppSelector((state:any) => state.user.user.token)
        const result = await comments.getComment(activeUserToken)
        return result
    }
    catch(error){
        console.log('Нет доступа к API')
        console.log(error)
        return payload
    }
}

async function commentInApi(payload:any) {
    try{
    const activeUserToken = useAppSelector((state:any) => state.user.user.token)
    const result:any = await comments.createComment(activeUserToken, payload.idCard, {body: payload.comment.body})
    const newComment:IComment = {
        id: result.id,
        body: result.body
    }
    return newComment
    }
    catch(error){
        console.log('Нет доступа к API')
        console.log(error)
        return payload
    }
}