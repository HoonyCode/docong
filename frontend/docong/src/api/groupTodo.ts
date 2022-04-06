import Api from '../lib/customApi'
import { BASE_URL } from './auth'

export async function saveGroupTodo(groupTodoInput: GroupTodoInput) {
  const response = await Api.post(`${BASE_URL}/api/todo`, groupTodoInput)
  return response.data
}

export async function findAllGroupTodos(team_id: number) {
  const response = await Api.get(`${BASE_URL}/api/todo/group/${team_id}`)
  return response.data
}

export async function findGroupTodo(todoId: number) {
  const response = await Api.get(`${BASE_URL}/api/todo/${todoId}`)
  return response.data
}

export async function modifyGroupTodo(
  todoId: number,
  groupTodoInput: GroupTodoInput
) {
  const response = await Api.put(
    `${BASE_URL}/api/todo/${todoId}`,
    groupTodoInput
  )
  return response.data
}

export async function deleteGroupTodo(todoId: number) {
  const response = await Api.delete(`${BASE_URL}/api/todo/${todoId}`)
  return response.data
}

export async function modifyGroupTodoStatus(
  todoId: number,
  todoStatus: string
) {
  const response = await Api.put(
    `${BASE_URL}/api/todo/status/${todoId}`,
    todoStatus
  )
  return response.data
}

export async function changeGroupTodoActivate(
  todoId: number,
  activateData: ActivateData
) {
  const response = await Api.put(
    `${BASE_URL}/api/todo/activate/${todoId}`,
    activateData
  )
  return response.data
}

export interface GroupTodoInput {
  content: string
  predictedPomo: number
  teamId: number
  title: string
  userEmail: string
  workImportance: string
  workProficiency: string
  workType: string
}

export interface DefaultResponse {
  code: string
  message: string
  status: number
}

export interface ActivateData {
  activate: boolean
}

export interface GroupTodo {
  seq: number
  title: string
  content: string
  status: string
  predictedPomo: number
  realPomo: number
  workProficiency: string
  workType: string
  workImportance: string
  userEmail: string
  userName: string
  userImg: string
  activate: boolean
}

export interface GroupTodos extends Array<GroupTodo> {}
