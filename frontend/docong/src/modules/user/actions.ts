import { createAction, createAsyncAction } from 'typesafe-actions' // createAsyncAction 유틸함수 사용
import { AxiosError } from 'axios'
import { SignupResponse } from '../../api/auth'
import { UserData, UserInfo } from '../../api/user'
import { PomoData } from '../../api/pomo'
import { Todo } from '../../api/todo'

// 액션 type 선언
export const USER_SIGNUP = 'user/USER_SIGNUP'
export const USER_SIGNUP_SUCCESS = 'user/USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_ERROR = 'user/USER_SIGNUP_ERROR'

export const USER_LOGIN = 'user/USER_LOGIN'
export const USER_LOGIN_SUCCESS = 'user/USER_LOGIN_SUCCESS'
export const USER_LOGIN_ERROR = 'user/USER_LOGIN_ERROR'

export const USER_GOOGLE_LOGIN = 'user/USER_GOOGLE_LOGIN'
export const USER_GOOGLE_LOGIN_SUCCESS = 'user/USER_GOOGLE_LOGIN_SUCCESS'
export const USER_GOOGLE_LOGIN_ERROR = 'user/USER_GOOGLE_LOGIN_ERROR'

export const GET_USER_INFO = 'user/GET_USER_INFO'
export const GET_USER_INFO_SUCCESS = 'user/GET_USER_INFO_SUCCESS'
export const GET_USER_INFO_ERROR = 'user/GET_USER_INFO_ERROR'

export const SET_USER_INFO = 'user/SET_USER_INFO'
export const SET_USER_INFO_SUCCESS = 'user/SET_USER_INFO_SUCCESS'
export const SET_USER_INFO_ERROR = 'user/SET_USER_INFO_ERROR'

export const SAVE_POMO = 'user/SAVE_POMO'
export const SAVE_POMO_SUCCESS = 'user/SAVE_POMO_SUCCESS'
export const SAVE_POMO_ERROR = 'user/SAVE_POMO_ERROR'

export const INIT_USER_TIMER = 'user/INIT_USER_TIMER'
export const CHANGE_USER_TIMER_TYPE = 'user/CHANGE_USER_TIMER_TYPE'
export const CHANGE_USER_TIMER_TODO = 'user/CHANGE_USER_TIMER_TODO'
export const CHANGE_USER_TIMER_STATUS = 'user/CHANGE_USER_TIMER_STATUS'
export const CHANGE_USER_TIMER_TIME = 'user/CHANGE_USER_TIMER_TIME'
export const START_USER_TIMER = 'user/START_USER_TIMER'
export const STOP_USER_TIMER = 'user/STOP_USER_TIMER'
export const FINISH_USER_TIMER = 'user/FINISH_USER_TIMER'

// 액션 생성함수 선언
export const userSignupAsync = createAsyncAction(
  USER_SIGNUP,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_ERROR
)<any, SignupResponse, AxiosError>()

export const userLoginAsync = createAsyncAction(
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR
)<any, any, AxiosError>()

export const userGoogleLoginAsync = createAsyncAction(
  USER_GOOGLE_LOGIN,
  USER_GOOGLE_LOGIN_SUCCESS,
  USER_GOOGLE_LOGIN_ERROR
)<any, string, AxiosError>()

export const getUserInfoAsync = createAsyncAction(
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR
)<null, UserInfo, AxiosError>()

export const setUserInfoAsync = createAsyncAction(
  SET_USER_INFO,
  SET_USER_INFO_SUCCESS,
  SET_USER_INFO_ERROR
)<UserData, any, AxiosError>()

export const savePomoAsync = createAsyncAction(
  SAVE_POMO,
  SAVE_POMO_SUCCESS,
  SAVE_POMO_ERROR
)<PomoData, any, AxiosError>()

export const initUserTimer = createAction(INIT_USER_TIMER)()
export const changeUserTimerType = createAction(CHANGE_USER_TIMER_TYPE)<any>()
export const changeUserTimerTodo = createAction(
  CHANGE_USER_TIMER_TODO
)<null | Todo>()
export const changeUserTimerStatus = createAction(
  CHANGE_USER_TIMER_STATUS
)<string>()
export const changeUserTimerTime = createAction(
  CHANGE_USER_TIMER_TIME
)<number>()
export const startUserTimer = createAction(START_USER_TIMER)()
export const stopUserTimer = createAction(STOP_USER_TIMER)()
export const finishUserTimer = createAction(FINISH_USER_TIMER)()

export const actions = {
  userSignupAsync,
  userLoginAsync,
  userGoogleLoginAsync,
  getUserInfoAsync,
  setUserInfoAsync,
  savePomoAsync,
  initUserTimer,
  changeUserTimerType,
  changeUserTimerTodo,
  changeUserTimerStatus,
  changeUserTimerTime,
  startUserTimer,
  stopUserTimer,
  finishUserTimer,
}
