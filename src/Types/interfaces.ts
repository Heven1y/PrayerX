
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
    done: boolean,
    commentsID: IComment['id'][]
}

export interface IComment{
    comment: string,
    auctor: string,
    id:number
}

export interface IUser {
    email: string,
    name: string,
    password: string,
    active: boolean
}