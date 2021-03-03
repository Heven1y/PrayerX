import React from 'react'
import { IUser} from '../../Types/interfaces'
import { REG_USER, ACTIVE_USER } from './types'

export const regUserAction = (user:IUser) => {
    return {
        type: REG_USER,
        payload: {
            newUser: user
        }
    }
}
export const setActiveUserAction = (active:boolean) => {
    return {
        type: ACTIVE_USER,
        payload: {
            active: active
        }
    }
}