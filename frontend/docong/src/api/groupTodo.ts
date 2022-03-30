import axios from 'axios'
import { BASE_URL } from './auth'

const setHeader = function() {
    const token = localStorage.getItem('jwtToken')
    const header = {
        Authorization: `Bearer ${token}`,
    }
    return header
}

export async function saveGroupTodo(groupTodoInput: GroupTodoInput) {
    const response = await axios.post(`${BASE_URL}/api/todo`, groupTodoInput, {
        headers: setHeader(),
    })
    return response.data
}

export async function findAllGroupTodos(team_id: number) {
    const response = await axios.get(`${BASE_URL}/api/todo/group/${team_id}`, {
        headers: setHeader(),
    })
    return response.data
}

export async function findGroupTodo(todoId: number) {
    const response = await axios.get(`${BASE_URL}/api/todo/${todoId}`, {
      headers: setHeader(),
    })
    return response.data
}

export async function modifyGroupTodo(todoId: number, groupTodoInput: GroupTodoInput) {
    const response = await axios.put(
      `${BASE_URL}/api/todo/${todoId}`,
      groupTodoInput,
      {
        headers: setHeader(),
      }
    )
    return response.data
}

export async function deleteGroupTodo(todoId: number) {
    const response = await axios.delete(`${BASE_URL}/api/todo/${todoId}`, {
      headers: setHeader(),
    })
    return response.data
}

export async function modifyGroupTodoStatus(todoId: number, todoStatus: string) {
    const response = await axios.put(
      `${BASE_URL}/api/todo/status/${todoId}`,
      todoStatus,
      {
        headers: setHeader(),
      }
    )
    return response.data
}

export async function changeGroupTodoActivate(
    todoId: number,
    activateData: ActivateData
  ) {
    const response = await axios.put(
      `${BASE_URL}/api/todo/activate/${todoId}`,
      activateData,
      {
        headers: setHeader(),
      }
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