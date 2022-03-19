import axios from 'axios'

const setHeader = function () {
  const token = localStorage.getItem('jwtToken')
  const header = {
    Authorization: `Bearer ${token}`,
  }
  return header
}

export async function saveTodo(todoInput: TodoInput) {
  console.log(todoInput)
  const response = await axios.post(`/api/todo`, todoInput, {
    headers: setHeader(),
  })
  return response.data
}

export async function findTodo(todoId: number) {
  const response = await axios.get(`/api/todo/${todoId}`, {
    headers: setHeader(),
  })
  return response.data
}

export async function modifyTodo(todoId: number, todoInput: TodoInput) {
  const response = await axios.put(`/api/todo/${todoId}`, todoInput, {
    headers: setHeader(),
  })
  return response.data
}

export async function deleteTodo(todoId: number) {
  const response = await axios.delete(`/api/todo/${todoId}`, {
    headers: setHeader(),
  })
  return response.data
}

export async function modifyTodoStatus(todoId: number, todoStatus: string) {
  const response = await axios.put(`/api/todo/status/${todoId}`, todoStatus, {
    headers: setHeader(),
  })
  return response.data
}

export async function findUserTodos() {
  const response = await axios.get(`/api/todo/user`, {
    headers: setHeader(),
  })
  return response.data
}

export interface TodoInput {
  content: string
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
