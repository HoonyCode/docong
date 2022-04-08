import Api from '../lib/customApi'
import { BASE_URL } from './auth'

export async function getUserInfo() {
  const response = await Api.get(`${BASE_URL}/api/user/info`)
  return response.data
}

export async function setUserInfo(userData: UserData) {
  const response = await Api.patch(`${BASE_URL}/api/user/info`, userData)
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
  image: string
  tier: string
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
  image: string
}
