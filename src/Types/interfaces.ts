
export interface IList {
    title: string,
    id: number
}

export interface ICard {
    columnId: number,
    title: string,
    description: string,
    id: number,
    checked: boolean,
    commentsIds: IComment['id'][]
}

export interface IComment{
    body: string,
    id:number
}

export interface IUser {
    token: string,
    name: string,
    active: boolean
}