import React from 'react'
import createSagaMiddleware from 'redux-saga'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import RootReducer from './RootReducer'
import {sagaWatcher} from '../Saga/sagas'
// ...

const saga = createSagaMiddleware()
const middleware = [...getDefaultMiddleware({thunk: false}), saga]

export const store = configureStore({
  reducer: RootReducer,
  middleware: middleware
})

saga.run(sagaWatcher)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch