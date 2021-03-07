import React from 'react'
import {ApiService} from './api'
import {AxiosRequestConfig} from 'axios'
import {ColumnsDto} from '../Types/api-types'
import { IList } from '../Types/interfaces';


class ColumnApi extends ApiService {
    getColumns = (token:string, config?: AxiosRequestConfig) => {
        return this.request.get(token)<IList[]>('columns', { ...config })
    };
    createColumns = (token:string, newColumn:ColumnsDto) => {
        return this.request.post(token)(`columns`, newColumn)
    };
    changeColumns = (token:string, idColumn:number, newColumn:ColumnsDto) => {
        return this.request.put(token)(`columns/${idColumn}`, newColumn)
    };
    removeColumns = (token:string, idColumn:number) => {
        return this.request.delete(token)(`columns/${idColumn}`)
    };
}

export default new ColumnApi()