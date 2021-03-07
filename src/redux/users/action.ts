import React from 'react'
import { IUser} from '../../Types/interfaces'
import { ACTIVE_USER } from './types'

export const setActiveUserAction = (user:IUser) => {
    return {
        type: ACTIVE_USER,
        payload: user
    }
}