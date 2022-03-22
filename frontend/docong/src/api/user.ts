import axios from 'axios'
import { BASE_URL } from './auth'

const setHeader = function () {
  const token = localStorage.getItem('jwtToken')
  const header = {
    Authorization: `Bearer ${token}`,
  }
  return header
}

export async function getUserInfo() {
  const response = await axios.get(`${BASE_URL}/api/user/info`, {
    headers: setHeader(),
  })
  return response.data
}

export async function setUserInfo(userData: UserData) {
  console.log(userData)
  const response = await axios.patch(`${BASE_URL}/api/user/info`, userData, {
    headers: setHeader(),
  })
  return response.data
}

export interface UserInfo {
  email: string
  name: string
  birth: string
  gender: string
  mbti: string
  job: string
  position: number
}

export interface DefaultResponse {
  code: string
  message: string
  status: number
}

export interface UserData {
  mbti: string
  birth: string
  gender: string
  job: string
  name: string
  position: number
}
