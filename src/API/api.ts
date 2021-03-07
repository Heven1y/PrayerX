import React from 'react'
import {Alert} from 'react-native'
import axios, { AxiosRequestConfig } from 'axios'
import HttpClient from './HttpClient'

export class ApiService {
  protected request = {
    post: (token?: string) => async <TResponse, TData = {}>(
      uri: string,
      data?: TData,
      config?: AxiosRequestConfig,
    ): Promise<TResponse> => {
      try {
        const request = await HttpClient(token);
        const response = await request.post(uri, data, config);
        return response.data;
      } catch (error) {
        return this.handleRequestError<TResponse>(token, uri, error);
      }
    },
    put: (token?: string) => async <TResponse, TData = {}>(
      uri: string,
      data: TData,
      config?: AxiosRequestConfig,
    ): Promise<TResponse> => {
      try {
        const request = await HttpClient(token);
        const response = await request.put(uri, data, config);

        return response.data;
      } catch (error) {
        return this.handleRequestError<TResponse>(token, uri, error);
      }
    },
    patch: (token?: string) => async <TResponse, TData = {}>(
      uri: string,
      data?: TData,
      config?: AxiosRequestConfig,
    ): Promise<TResponse> => {
      try {
        const request = await HttpClient(token);
        const response = await request.patch(uri, data, config);

        return response.data;
      } catch (error) {
        return this.handleRequestError<TResponse>(token, uri, error);
      }
    },
    get: (token?: string) => async <TResponse>(
      uri: string,
      config?: AxiosRequestConfig,
    ): Promise<TResponse> => {
      try {
        const request = await HttpClient(token);
        const response = await request.get(uri, config);

        return response.data;
      } catch (error) {
        return this.handleRequestError<TResponse>(token, uri, error);
      }
    },
    delete: (token?: string) => async <TResponse>(
      uri: string,
      config?: AxiosRequestConfig,
    ): Promise<TResponse> => {
      try {
        const request = await HttpClient(token);
        const response = await request.delete(uri, config);

        return response.data;
      } catch (error) {
        return this.handleRequestError<TResponse>(token, uri, error);
      }
    },
  }
  protected handleRequestError = <TResponse>(token:any, uri:any, error:any) => {
    if (axios.isCancel(error)) {
      return {} as TResponse;
    }

    if (error.response && error.response.data) {
      return error
    }

    throw error;
  };
  
}