import Api from '../lib/customApi'
import { BASE_URL } from './auth'

export async function savePomo(pomoData: PomoData) {
  const response = await Api.post(`${BASE_URL}/api/pomo`, pomoData)
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
