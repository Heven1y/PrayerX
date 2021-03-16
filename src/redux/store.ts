import React from 'react'
import createSagaMiddleware from 'redux-saga'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import RootReducer from './RootReducer'
import {all} from 'redux-saga/effects'
import cardSagas from './cards/sagas'
import commentSagas from './comments/sagas'
import columnSagas from './columns/sagas'
import userSagas from './users/sagas'

function *sagaWatcher (){
  yield all([
    ...cardSagas,
    ...commentSagas,
    ...columnSagas,
    ...userSagas
  ]);
}

const saga = createSagaMiddleware()
const middleware = [...getDefaultMiddleware({thunk: false}), saga]

export const store = configureStore({
  reducer: RootReducer,
  middleware: middleware
})

saga.run(sagaWatcher)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch