import { createAction, createAsyncAction } from 'typesafe-actions' // createAsyncAction 유틸함수 사용
import { AxiosError } from 'axios'
import { SignupResponse } from '../../api/auth'

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

export const SAVE_POMO = 'user/SAVE_POMO'
export const SAVE_POMO_SUCCESS = 'user/SAVE_POMO_SUCCESS'
export const SAVE_POMO_ERROR = 'user/SAVE_POMO_ERROR'

export const CHANGE_USER_TIMER_TYPE = 'user/CHANGE_USER_TIMER_TYPE'
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

export const savePomoAsync = createAsyncAction(
  SAVE_POMO,
  SAVE_POMO_SUCCESS,
  SAVE_POMO_ERROR
)<any, any, AxiosError>()

export const changeUserTimerType = createAction(CHANGE_USER_TIMER_TYPE)<any>()
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
  changeUserTimerType,
  changeUserTimerStatus,
  changeUserTimerTime,
  startUserTimer,
  stopUserTimer,
  finishUserTimer,
}
