import axios from 'axios'
import { BASE_URL } from '../api/auth'
import { refresh } from './refreshToken'

const Api = axios.create({
  baseURL: BASE_URL,
})

Api.interceptors.request.use(refresh)

export default Api
