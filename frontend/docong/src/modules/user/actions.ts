import { createAsyncAction } from 'typesafe-actions' // createAsyncAction 유틸함수 사용
import { AxiosError } from 'axios'
import { SignupResponse } from '../../api/user'

export const USER_SIGNUP = 'user/USER_SIGNUP'
export const USER_SIGNUP_SUCCESS = 'user/USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_ERROR = 'user/USER_SIGNUP_ERROR'

export const USER_LOGIN = 'user/USER_LOGIN'
export const USER_LOGIN_SUCCESS = 'user/USER_LOGIN_SUCCESS'
export const USER_LOGIN_ERROR = 'user/USER_LOGIN_ERROR'

export const USER_GOOGLE_LOGIN = 'user/USER_GOOGLE_LOGIN'
export const USER_GOOGLE_LOGIN_SUCCESS = 'user/USER_GOOGLE_LOGIN_SUCCESS'
export const USER_GOOGLE_LOGIN_ERROR = 'user/USER_GOOGLE_LOGIN_ERROR'

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
