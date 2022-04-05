import axios from 'axios'
import { BASE_URL } from './auth'

const setHeader = function () {
  const token = localStorage.getItem('jwtToken')
  const header = {
    Authorization: `Bearer ${token}`,
  }
  return header
}

export async function savePomo(pomoData: PomoData) {
  const response = await axios.post(`${BASE_URL}/api/pomo`, pomoData, {
    headers: setHeader(),
  })
  return response.data
}

export interface PomoData {
  otherTime: number
  endTime: string
  noise: string
  startTime: string
  timeStatus: string
  todo_seq: null | number
}

export interface DefaultResponse {
  code: string
  message: string
  status: number
}
