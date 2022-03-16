import axios from 'axios'

export async function savePomo(pomoData: PomoData) {
  alert('Pomo 저장 요청')
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
  user_seq: number
}
