import React from 'react'
import axios from 'axios';
export default async (accessToken:any, optHeaders = {}) => {
  const token = accessToken
  let headers = {};

  if (token) {
    headers = {
      authorization: `Bearer ${token}`,
      ...optHeaders,
    };
  }
  const instance = axios.create({
    headers,
    baseURL: 'https://trello-purrweb.herokuapp.com',
  });
  return instance;
};