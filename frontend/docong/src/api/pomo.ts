import axios from 'axios'

export async function savePomo(pomoData: PomoData) {
  const response = await axios.post(`/api/pomo`, pomoData)
  return response.data
}

export interface PomoData {
  emotion: string
  endTime: string
  noise: string
  startTime: string
  timeStatus: string
  todo_seq: number
}

export interface DefaultResponse {
  code: string
  message: string
  status: number
}
