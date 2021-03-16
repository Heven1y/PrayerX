import React from 'react'
import {call, put, takeEvery} from 'redux-saga/effects'
import { ICard } from '../../Types/interfaces'
import { ADD_CARD, LOAD_CARD } from './types'
import { addCardAction, loadCardAction } from './action'
import cards from '../../API/Cards'
import { useAppSelector } from '../hooks'

export default [
    takeEvery(LOAD_CARD, sagaLoadCards),
    takeEvery(ADD_CARD, sagaAddCards)
]

function *sagaLoadCards(action:any) {
    const data:ICard[] = yield call(cardsFromApi, action.payload)
    yield put(loadCardAction(data))
}

function *sagaAddCards(action:any) {
    const data:ICard = yield call(cardInApi, action.payload)
    yield put(addCardAction(data))
}

async function cardsFromApi(payload:any) {
    try{
    const activeUserToken = useAppSelector((state:any) => state.user.user.token)
    const cardsFromAPI = await cards.getCards(activeUserToken)
    return cardsFromAPI
    }
    catch (error) {
        console.log('Нет доступа к API')
        console.log(error)
        return payload
    }
}

async function cardInApi(payload:any) {
    try{
    const activeUserToken = useAppSelector((state:any) => state.user.user.token)
    const result:any = await cards.createCard(activeUserToken, payload)
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
    catch (error) {
        console.log('Нет доступа к API')
        console.log(error)
        return payload
    }
}