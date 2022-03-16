import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/'

const setHeader = function () {
  const token = localStorage.getItem('jwtToken')
  const header = {
    Authorization: `Bearer ${token}`,
  }
  return header
}

export async function savePomo(pomoData: PomoData) {
  alert('Pomo 저장 요청')
  const response = await axios.post(`${BASE_URL}pomo`, pomoData)
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
