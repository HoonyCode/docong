import axios from 'axios'
import { BASE_URL } from './auth'

const setHeader = function () {
  const token = localStorage.getItem('jwtToken')
  const header = {
    Authorization: `Bearer ${token}`,
  }
  return header
}

export async function saveTodo(todoInput: TodoInput) {
  console.log(todoInput)
  const response = await axios.post(`${BASE_URL}/api/todo`, todoInput, {
    headers: setHeader(),
  })
  return response.data
}

export async function findTodo(todoId: number) {
  const response = await axios.get(`${BASE_URL}/api/todo/${todoId}`, {
    headers: setHeader(),
  })
  return response.data
}

export async function modifyTodo(todoId: number, todoInput: TodoInput) {
  const response = await axios.put(
    `${BASE_URL}/api/todo/${todoId}`,
    todoInput,
    {
      headers: setHeader(),
    }
  )
  return response.data
}

export async function deleteTodo(todoId: number) {
  const response = await axios.delete(`${BASE_URL}/api/todo/${todoId}`, {
    headers: setHeader(),
  })
  return response.data
}

export async function modifyTodoStatus(todoId: number, todoStatus: string) {
  const response = await axios.put(
    `${BASE_URL}/api/todo/status/${todoId}`,
    todoStatus,
    {
      headers: setHeader(),
    }
  )
  return response.data
}

export async function findUserTodos() {
  const response = await axios.get(`${BASE_URL}/api/todo/user`, {
    headers: setHeader(),
  })
  return response.data
}

export async function changeTodoActivate(
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

export interface TodoInput {
  content: string
  predictedPomo: number
  teamId: null | number
  title: string
  userEmail: null | string
  workImportance: string
  workProficiency: string
  workType: string
}

export interface DefaultResponse {
  code: string
  message: string
  status: number
}

export interface Todo {
  content: string
  predictedPomo: number
  realPomo: number
  seq: number
  status: string
  title: string
  workImportance: string
  workProficiency: string
  workType: string
}

export interface Todos extends Array<Todo> {}

export interface ActivateData {
  activate: boolean
}
