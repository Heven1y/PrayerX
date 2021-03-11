import React from 'react'
import {call, put, takeEvery} from 'redux-saga/effects'
import { ACTIVE_USER } from '../redux/users/types'
import columns from '../API/Columns'
import cards from '../API/Cards'
import comments from '../API/Comments'
import { ICard, IComment, IList } from '../Types/interfaces'
import { addListAction, loadListAction } from '../redux/columns/action'
import { ADD_COLUMN_IN_API } from '../redux/columns/types'
import { ColumnsDto } from '../Types/api-types'
import { ADD_CARD_IN_API, LOAD_CARD_FROM_API } from '../redux/cards/types'
import { addCardAction, loadCardAction } from '../redux/cards/action'
import { ADD_COMMENT_IN_API, LOAD_COMMENT_FROM_API } from '../redux/comments/types'
import { addCommentAction, loadCommentAction } from '../redux/comments/action'
export function *sagaWatcher (){
    yield takeEvery(ACTIVE_USER, sagaUserSetActive)
    yield takeEvery(ADD_COLUMN_IN_API, sagaAddColumn)
    yield takeEvery(LOAD_CARD_FROM_API, sagaLoadCards)
    yield takeEvery(ADD_CARD_IN_API, sagaAddCards)
    yield takeEvery(LOAD_COMMENT_FROM_API, sagaLoadComments)
    yield takeEvery(ADD_COMMENT_IN_API, sagaAddComments)
}

function *sagaUserSetActive(action:any) {
    const data:IList[] = yield call(columnsFromApi, action.payload)
    yield put(loadListAction(data))
}

function *sagaAddColumn(action:any) {
    const data:IList = yield call(columnsInApi, action.payload)
    yield put(addListAction(data))
}

function *sagaLoadCards(action:any) {
    const data:ICard[] = yield call(cardsFromApi, action.payload)
    yield put(loadCardAction(data))
}

function *sagaAddCards(action:any) {
    const data:ICard = yield call(cardInApi, action.payload)
    yield put(addCardAction(data))
}

function *sagaLoadComments(action:any) {
    const data:IComment[] = yield call(commentsFromApi, action.payload)
    yield put(loadCommentAction(data))
}

function *sagaAddComments(action:any) {
    const data:IComment = yield call(commentInApi, action.payload)
    yield put(addCommentAction(action.payload.idCard, data))
}

async function columnsFromApi(user:any) {
    if(user.active){
    const colResult = await columns.getColumns(user.token)
    return colResult
    }
    else {
        return []
    }
}

async function columnsInApi(payload:any) {
    const newColumnApi:ColumnsDto = {
        title: payload.title,
        description: ''
    }
    const answer:any = await columns.createColumns(payload.token, newColumnApi)
    const newColumn:IList = {
        id: answer.id,
        title: payload.title
    }
    return newColumn
}

async function cardsFromApi(payload:any) {
    const cardsFromAPI = await cards.getCards(payload.token)
    return cardsFromAPI.filter((card:ICard) => card.columnId === payload.id)
}

async function cardInApi(payload:any) {
    const result:any = await cards.createCard(payload.token, payload.card)
    const newCard:ICard = {
        id: result.id,
        columnId: result.columnId,
        title: result.title,
        description: result.description,
        checked: result.checked,
        commentsIds: []
    }
    return newCard
}

async function commentsFromApi(payload:any) {
    const result = await comments.getComment(payload)
    return result
}

async function commentInApi(payload:any) {
    const result:any = await comments.createComment(payload.token, payload.idCard, {body: payload.body})
    const newComment:IComment = {
        id: result.id,
        body: payload.body
    }
    console.log(newComment)
    return newComment
}