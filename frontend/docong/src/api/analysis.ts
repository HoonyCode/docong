import axios from 'axios'
import { BASE_URL } from './auth'

const setHeader = function () {
  const token = localStorage.getItem('jwtToken')
  const header = {
    Authorization: `Bearer ${token}`,
  }
  return header
}

export async function getRankingList() {
  const response = await axios.get(`${BASE_URL}/api/analysis/ranking`, {
    headers: setHeader(),
  })
  return response.data
}

export async function getWorkTypeAnalysis() {
  const response = await axios.get(`${BASE_URL}/api/analysis/worktype`, {
    headers: setHeader(),
  })
  return response.data
}

export interface RankingData {
  userName: string
  userEmail: string
  pomoCount: number
}

export interface RankingDataList extends Array<RankingData> {}

export interface WorkTypeData {
  countTodo: number
  totalPomo: number
  workType: string
}

export interface WorkTypeAnalysis extends Array<WorkTypeData> {}
