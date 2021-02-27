import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import RootReducer from './RootReducer'
// ...

export const store = configureStore({
  reducer: RootReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch