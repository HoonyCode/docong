import { createAsyncAction } from 'typesafe-actions' // createAsyncAction 유틸함수 사용
import { AxiosError } from 'axios'
import { GroupTodo, GroupTodos, GroupTodoInput, DefaultResponse } from '../../api/groupTodo'

export const FIND_ALL_GROUP_TODOS = 'group/FIND_ALL_GROUP_TODOS'
export const FIND_ALL_GROUP_TODOS_SUCCESS = 'group/FIND_ALL_GROUP_TODOS_SUCCESS'
export const FIND_ALL_GROUP_TODOS_ERROR = 'group/FIND_ALL_GROUP_TODOS_ERROR'

export const SAVE_GROUP_TODO = 'groupTodo/SAVE_GROUP_TODO'
export const SAVE_GROUP_TODO_SUCCESS = 'groupTodo/SAVE_GROUP_TODO_SUCCESS'
export const SAVE_GROUP_TODO_ERROR = 'groupTodo/SAVE_GROUP_TODO_ERROR'

export const MODIFY_GROUP_TODO = 'todo/MODIFY_GROUP_TODO'
export const MODIFY_GROUP_TODO_SUCCESS = 'todo/MODIFY_GROUP_TODO_SUCCESS'
export const MODIFY_GROUP_TODO_ERROR = 'todo/MODIFY_GROUP_TODO_ERROR'

export const DELETE_GROUP_TODO = 'todo/DELETE_GROUP_TODO'
export const DELETE_GROUP_TODO_SUCCESS = 'todo/DELETE_GROUP_TODO_SUCCESS'
export const DELETE_GROUP_TODO_ERROR = 'todo/DELETE_GROUP_TODO_ERROR'

export const MODIFY_GROUP_TODO_STATUS = 'todo/MODIFY_GROUP_TODO_STATUS'
export const MODIFY_GROUP_TODO_STATUS_SUCCESS = 'todo/MODIFY_GROUP_TODO_STATUS_SUCCESS'
export const MODIFY_GROUP_TODO_STATUS_ERROR = 'todo/MODIFY_GROUP_TODO_STATUS_ERROR'

export const CHANGE_GROUP_TODO_ACTIVATE = 'todo/CHANGE_GROUP_TODO_ACTIVATE'
export const CHANGE_GROUP_TODO_ACTIVATE_SUCCESS = 'todo/CHANGE_GROUP_TODO_ACTIVATE_SUCCESS'
export const CHANGE_GROUP_TODO_ACTIVATE_ERROR = 'todo/CHANGE_GROUP_TODO_ACTIVATE_ERROR'

export const FIND_GROUP_TODO = 'todo/FIND_GROUP_TODO'
export const FIND_GROUP_TODO_SUCCESS = 'todo/FIND_GROUP_TODO_SUCCESS'
export const FIND_GROUP_TODO_ERROR = 'todo/FIND_GROUP_TODO_ERROR'

export const findAllGroupTodosAsync = createAsyncAction(
    FIND_ALL_GROUP_TODOS,
    FIND_ALL_GROUP_TODOS_SUCCESS,
    FIND_ALL_GROUP_TODOS_ERROR
)<number, GroupTodos, AxiosError>()

export const saveGroupTodoAsync = createAsyncAction(
    SAVE_GROUP_TODO,
    SAVE_GROUP_TODO_SUCCESS,
    SAVE_GROUP_TODO_ERROR
)<GroupTodoInput, DefaultResponse, AxiosError>()

export const findGroupTodoAsync = createAsyncAction(
    FIND_GROUP_TODO,
    FIND_GROUP_TODO_SUCCESS,
    FIND_GROUP_TODO_ERROR
)<number, GroupTodo, AxiosError>()

export const modifyGroupTodoAsync = createAsyncAction(
    MODIFY_GROUP_TODO,
    MODIFY_GROUP_TODO_SUCCESS,
    MODIFY_GROUP_TODO_ERROR
)<any, DefaultResponse, AxiosError>()

export const deleteGroupTodoAsync = createAsyncAction(
    DELETE_GROUP_TODO,
    DELETE_GROUP_TODO_SUCCESS,
    DELETE_GROUP_TODO_ERROR
)<number, DefaultResponse, AxiosError>()

export const modifyGroupTodoStatusAsync = createAsyncAction(
    MODIFY_GROUP_TODO_STATUS,
    MODIFY_GROUP_TODO_STATUS_SUCCESS,
    MODIFY_GROUP_TODO_ERROR
)<any, DefaultResponse, AxiosError>()

export const changeGroupTodoActivateAsync = createAsyncAction(
    CHANGE_GROUP_TODO_ACTIVATE,
    CHANGE_GROUP_TODO_ACTIVATE_SUCCESS,
    CHANGE_GROUP_TODO_ACTIVATE_ERROR
  )<any, any, AxiosError>()

export const actions = {
    findAllGroupTodosAsync,
    saveGroupTodoAsync,
    findGroupTodoAsync,
    modifyGroupTodoAsync,
    deleteGroupTodoAsync,
    modifyGroupTodoStatusAsync,
    changeGroupTodoActivateAsync
}