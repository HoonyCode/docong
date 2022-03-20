import axios from 'axios'
import { BASE_URL } from './auth'

export async function savePomo(pomoData: PomoData) {
  const response = await axios.post(`${BASE_URL}/api/pomo`, pomoData)
  return response.data
}

export interface PomoData {
  emotion: string
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
