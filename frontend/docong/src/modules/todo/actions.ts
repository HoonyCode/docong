import { createAsyncAction } from 'typesafe-actions' // createAsyncAction 유틸함수 사용
import { AxiosError } from 'axios'
import { DefaultResponse, Todo, TodoInput, Todos } from '../../api/todo'

// 액션 type 선언
export const SAVE_TODO = 'todo/SAVE_TODO'
export const SAVE_TODO_SUCCESS = 'todo/SAVE_TODO_SUCCESS'
export const SAVE_TODO_ERROR = 'todo/SAVE_TODO_ERROR'

export const FIND_TODO = 'todo/FIND_TODO'
export const FIND_TODO_SUCCESS = 'todo/FIND_TODO_SUCCESS'
export const FIND_TODO_ERROR = 'todo/FIND_TODO_ERROR'

export const MODIFY_TODO = 'todo/MODIFY_TODO'
export const MODIFY_TODO_SUCCESS = 'todo/MODIFY_TODO_SUCCESS'
export const MODIFY_TODO_ERROR = 'todo/MODIFY_TODO_ERROR'

export const DELETE_TODO = 'todo/DELETE_TODO'
export const DELETE_TODO_SUCCESS = 'todo/DELETE_TODO_SUCCESS'
export const DELETE_TODO_ERROR = 'todo/DELETE_TODO_ERROR'

export const MODIFY_TODO_STATUS = 'todo/MODIFY_TODO_STATUS'
export const MODIFY_TODO_STATUS_SUCCESS = 'todo/MODIFY_TODO_STATUS_SUCCESS'
export const MODIFY_TODO_STATUS_ERROR = 'todo/MODIFY_TODO_STATUS_ERROR'

export const FIND_USER_TODOS = 'todo/FIND_USER_TODOS'
export const FIND_USER_TODOS_SUCCESS = 'todo/FIND_USER_TODOS_SUCCESS'
export const FIND_USER_TODOS_ERROR = 'todo/FIND_USER_TODOS_ERROR'

// 액션 생성함수 선언
export const saveTodoAsync = createAsyncAction(
  SAVE_TODO,
  SAVE_TODO_SUCCESS,
  SAVE_TODO_ERROR
)<TodoInput, DefaultResponse, AxiosError>()

export const findTodoAsync = createAsyncAction(
  FIND_TODO,
  FIND_TODO_SUCCESS,
  FIND_TODO_ERROR
)<number, Todo, AxiosError>()

export const modifyTodoAsync = createAsyncAction(
  MODIFY_TODO,
  MODIFY_TODO_SUCCESS,
  MODIFY_TODO_ERROR
)<any, DefaultResponse, AxiosError>()

export const deleteTodoAsync = createAsyncAction(
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR
)<number, DefaultResponse, AxiosError>()

export const modifyTodoStatusAsync = createAsyncAction(
  MODIFY_TODO_STATUS,
  MODIFY_TODO_STATUS_SUCCESS,
  MODIFY_TODO_STATUS_ERROR
)<any, DefaultResponse, AxiosError>()

export const findUserTodosAsync = createAsyncAction(
  FIND_USER_TODOS,
  FIND_USER_TODOS_SUCCESS,
  FIND_USER_TODOS_ERROR
)<null, Todos, AxiosError>()

export const actions = {
  saveTodoAsync,
  findTodoAsync,
  modifyTodoAsync,
  deleteTodoAsync,
  modifyTodoStatusAsync,
  findUserTodosAsync,
}
