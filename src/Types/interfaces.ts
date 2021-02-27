import React from 'react'
export interface IList {
    title: string,
    id: number,
    cardsID: ICard['id'][]
}

export interface ICard {
    title: string,
    description: string,
    auctor: string,
    id: number,
    subscribed: boolean,
    done: boolean,
    commentsID: IComment['id'][]
}

export interface IComment{
    comment: string,
    auctor: string,
    id:number
}