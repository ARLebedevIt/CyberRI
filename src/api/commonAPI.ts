import axios from 'axios'

export const instanceCRI = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': process.env.REACT_APP_COMMONKEY
  }
})
