import React from 'react'
import {ApiService} from './api'

type AuthData = {
    email: string,
    password: string,
    name?:string
}

type AuthResponseData = {
    token: string,
    name: string
}

type UserResponseData = {

}

class AuthApi extends ApiService {
    signIn = (payload: AuthData) => this.request.post()<AuthResponseData>('auth/sign-in', payload);
    signUp = (payload: AuthData) => this.request.post()<UserResponseData>('auth/sign-up', payload);
}

export default new AuthApi()