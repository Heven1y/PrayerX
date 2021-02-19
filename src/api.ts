import React from 'react'
import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://trello-purrweb.herokuapp.com'
  })