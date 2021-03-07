import React from 'react'
import {ApiService} from './api'
import {AxiosRequestConfig} from 'axios'
import {ColumnsDto, CardsDto, CommentsDto} from '../Types/api-types'
import { IComment} from '../Types/interfaces'


class CommentApi extends ApiService {
    getComment = (token:string) => {
        return this.request.get(token)<IComment[]>(`comments`)
    };
    createComment = (token:string, idCard:number, newComment:CommentsDto) => {
        return this.request.post(token)(`cards/${idCard}/comments`, newComment)
    };
    changeComment = (token:string, idComment:number,newComment:CommentsDto) => {
        return this.request.put(token)(`comments/${idComment}`, newComment)
    };
    removeComment = (token:string, idComment:number) => {
        return this.request.delete(token)(`comments/${idComment}`)
    };
}

export default new CommentApi()