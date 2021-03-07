import React from 'react'
import {ApiService} from './api'
import {AxiosRequestConfig} from 'axios'
import {ColumnsDto, CardsDto} from '../Types/api-types'
import { ICard } from '../Types/interfaces'


class CardApi extends ApiService {
    getCards = (token:string) => {
        return this.request.get(token)<ICard[]>(`cards`)
    };
    createCard = (token:string, newCard:CardsDto) => {
        return this.request.post(token)(`cards`, newCard)
    };
    changeCard = (token:string, idCard:number, newCard:CardsDto) => {
        return this.request.put(token)(`cards/${idCard}`, newCard)
    };
    removeCard = (token:string, idCard:number) => {
        return this.request.delete(token)(`cards/${idCard}`)
    };
}

export default new CardApi()