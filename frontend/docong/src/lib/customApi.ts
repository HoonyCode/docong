import axios from 'axios'
import { BASE_URL } from '../api/auth'

const Api = axios.create({
  baseURL: BASE_URL,
})

Api.interceptors.request.use()

export default Api
