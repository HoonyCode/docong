import Api from '../lib/customApi'
import { BASE_URL } from './auth'

export async function saveTodo(todoInput: TodoInput) {
  const response = await Api.post(`${BASE_URL}/api/todo`, todoInput)
  return response.data
}

export async function findTodo(todoId: number) {
  const response = await Api.get(`${BASE_URL}/api/todo/${todoId}`)
  return response.data
}

export async function modifyTodo(todoId: number, todoInput: TodoInput) {
  const response = await Api.put(`${BASE_URL}/api/todo/${todoId}`, todoInput)
  return response.data
}

export async function deleteTodo(todoId: number) {
  const response = await Api.delete(`${BASE_URL}/api/todo/${todoId}`)
  return response.data
}

export async function modifyTodoStatus(todoId: number, todoStatus: string) {
  const response = await Api.put(
    `${BASE_URL}/api/todo/status/${todoId}`,
    todoStatus
  )
  return response.data
}

export async function findUserTodos() {
  const response = await Api.get(`${BASE_URL}/api/todo/user`)
  return response.data
}

export async function changeTodoActivate(
  todoId: number,
  activateData: ActivateData
) {
  const response = await Api.put(
    `${BASE_URL}/api/todo/activate/${todoId}`,
    activateData
  )
  return response.data
}

export async function predictPomo(predictData: PredictData) {
  const response = await Api.post(`${BASE_URL}/api/todo/predict`, predictData)
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
  activate: boolean
  content: string
  predictedPomo: number
  realPomo: number
  seq: number
  status: string
  title: string
  userEmail: string
  userImg: string
  userName: string
  workImportance: string
  workProficiency: string
  workType: string
}

export interface Todos extends Array<Todo> {}

export interface ActivateData {
  activate: boolean
}

export interface PredictData {
  birth: string
  endTime: string
  gender: string
  importance: number
  job: string
  mbti: string
  position: number
  proficiency: number
  startTime: string
  timeStatus: string
  type: number
}

export interface PredictPomo {
  pred: number
}
