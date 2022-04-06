import Api from '../lib/customApi'
import { BASE_URL } from './auth'

export async function getRankingList() {
  const response = await Api.get(`${BASE_URL}/api/analysis/ranking`)
  return response.data
}

export async function getWorkTypeAnalysis() {
  const response = await Api.get(`${BASE_URL}/api/analysis/worktype`)
  return response.data
}

export async function getUserPomoCount() {
  const response = await Api.get(`${BASE_URL}/api/analysis/pomotime`)
  return response.data
}

export async function getUserTimeAnalysis() {
  const response = await Api.get(`${BASE_URL}/api/analysis/time`)
  return response.data
}

export async function getUserAllDateAnalysis(year: number) {
  const response = await Api.get(`${BASE_URL}/api/analysis/date/${year}`)
  return response.data
}

// group API
export async function getGroupAllDateAnalysis(year: number, groupSeq: number) {
  // 그룹 잔디
  const response = await Api.get(
    `${BASE_URL}/api/analysis/date/${year}/${groupSeq}`
  )
  return response.data
}

export async function getGroupRankingList(team_id: number) {
  // 그룹 랭킹
  const response = await Api.get(
    `${BASE_URL}/api/analysis/groupRanking/${team_id}`
  )
  return response.data
}

export async function getGroupTimeAnalysis(groupSeq: number) {
  // 시간대별 뽀모
  const response = await Api.get(`${BASE_URL}/api/analysis/time/${groupSeq}`)
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

export interface TeamPomoCount {
  pomoCount: number
  teamName: string
}

export interface UserPomoCount {
  singlePomoCount: number
  teamPomoCount: Array<TeamPomoCount>
  totalPomoCount: number
}

export interface UserTimeData {
  cnt: number
  hour: number
}

export interface UserTimeAnalysis extends Array<UserTimeData> {}

export interface UserAllDateData {
  count: number
  localDate: Array<number>
}

export interface UserAllDateAnalysis extends Array<UserAllDateData> {}

export interface GroupAllDateInput {
  year: number
  groupSeq: number
}
