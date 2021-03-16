import React from 'react'
import {call, put, takeEvery} from 'redux-saga/effects'
import columns from '../../API/Columns'
import { ADD_COLUMN } from './types'
import { IList } from '../../Types/interfaces'
import { addListAction } from '../columns/action'
import { ColumnsDto } from '../../Types/api-types'
import { useAppSelector } from '../hooks'

export default [
    takeEvery(ADD_COLUMN, sagaAddColumn)
]

function *sagaAddColumn(action:any) {
    const data:IList = yield call(columnsInApi, action.payload)
    yield put(addListAction(data))
}

async function columnsInApi(payload:any) {
    try{
    const activeUserToken = useAppSelector((state:any) => state.user.user.token)
    const newColumnApi:ColumnsDto = {
        title: payload.title,
        description: ''
    }
    const answer:any = await columns.createColumns(activeUserToken, newColumnApi)
    const newColumn:IList = {
        id: answer.id,
        title: payload.title
    }
    return newColumn
    }
    catch (error) {
        console.log('Не удалось установить связь с API')
        console.log(error)
    }
}