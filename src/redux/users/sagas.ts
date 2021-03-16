import { call, put, takeEvery } from '@redux-saga/core/effects'
import React from 'react'
import { ACTIVE_USER } from './types'
import { IList } from '../../Types/interfaces'
import { loadListAction } from '../columns/action'
import columns from '../../API/Columns'

export default [
    takeEvery(ACTIVE_USER, sagaUserSetActive)
]

function *sagaUserSetActive(action:any) {
    const data:IList[] = yield call(columnsFromApi, action.payload)
    yield put(loadListAction(data))
}

async function columnsFromApi(user:any) {
    if(user.active){
    const colResult:any = await columns.getColumns(user.token)
    return []
    }
}