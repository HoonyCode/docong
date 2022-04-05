import { createAction, createAsyncAction } from 'typesafe-actions' // createAsyncAction 유틸함수 사용
import { AxiosError } from 'axios'
import { SignupResponse } from '../../api/auth'
import { UserData, UserInfo } from '../../api/user'
import { PomoData } from '../../api/pomo'
import { Todo } from '../../api/todo'
import {
  RankingDataList,
  UserAllDateAnalysis,
  UserPomoCount,
  UserTimeAnalysis,
  WorkTypeAnalysis,
} from '../../api/analysis'

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

export const GET_RANKING_LIST = 'user/GET_RANKING_LIST'
export const GET_RANKING_LIST_SUCCESS = 'user/GET_RANKING_LIST_SUCCESS'
export const GET_RANKING_LIST_ERROR = 'user/GET_RANKING_LIST_ERROR'

export const GET_WORK_TYPE_ANALYSIS = 'user/GET_WORK_TYPE_ANALYSIS'
export const GET_WORK_TYPE_ANALYSIS_SUCCESS =
  'user/GET_WORK_TYPE_ANALYSIS_SUCCESS'
export const GET_WORK_TYPE_ANALYSIS_ERROR = 'user/GET_WORK_TYPE_ANALYSIS_ERROR'

export const GET_USER_POMO_COUNT = 'user/GET_USER_POMO_COUNT'
export const GET_USER_POMO_COUNT_SUCCESS = 'user/GET_USER_POMO_COUNT_SUCCESS'
export const GET_USER_POMO_COUNT_ERROR = 'user/GET_USER_POMO_COUNT_ERROR'

export const GET_USER_TIME_ANALYSIS = 'user/GET_USER_TIME_ANALYSIS'
export const GET_USER_TIME_ANALYSIS_SUCCESS =
  'user/GET_USER_TIME_ANALYSIS_SUCCESS'
export const GET_USER_TIME_ANALYSIS_ERROR = 'user/GET_USER_TIME_ANALYSIS_ERROR'

export const GET_USER_ALL_DATE_ANALYSIS = 'user/GET_USER_ALL_DATE_ANALYSIS'
export const GET_USER_ALL_DATE_ANALYSIS_SUCCESS =
  'user/GET_USER_ALL_DATE_ANALYSIS_SUCCESS'
export const GET_USER_ALL_DATE_ANALYSIS_ERROR =
  'user/GET_USER_ALL_DATE_ANALYSIS_ERROR'

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

export const getRankingListAsync = createAsyncAction(
  GET_RANKING_LIST,
  GET_RANKING_LIST_SUCCESS,
  GET_RANKING_LIST_ERROR
)<any, RankingDataList, AxiosError>()

export const getWorkTypeAnalysisAsync = createAsyncAction(
  GET_WORK_TYPE_ANALYSIS,
  GET_WORK_TYPE_ANALYSIS_SUCCESS,
  GET_WORK_TYPE_ANALYSIS_ERROR
)<any, WorkTypeAnalysis, AxiosError>()

export const getUserPomoCountAsync = createAsyncAction(
  GET_USER_POMO_COUNT,
  GET_USER_POMO_COUNT_SUCCESS,
  GET_USER_POMO_COUNT_ERROR
)<any, UserPomoCount, AxiosError>()

export const getUserTimeAnalysisAsync = createAsyncAction(
  GET_USER_TIME_ANALYSIS,
  GET_USER_TIME_ANALYSIS_SUCCESS,
  GET_USER_TIME_ANALYSIS_ERROR
)<any, UserTimeAnalysis, AxiosError>()

export const getUserAllDateAnalysisAsync = createAsyncAction(
  GET_USER_ALL_DATE_ANALYSIS,
  GET_USER_ALL_DATE_ANALYSIS_SUCCESS,
  GET_USER_ALL_DATE_ANALYSIS_ERROR
)<number, UserAllDateAnalysis, AxiosError>()

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
  getRankingListAsync,
  getWorkTypeAnalysisAsync,
  getUserPomoCountAsync,
  getUserTimeAnalysisAsync,
  getUserAllDateAnalysisAsync,
  initUserTimer,
  changeUserTimerType,
  changeUserTimerTodo,
  changeUserTimerStatus,
  changeUserTimerTime,
  startUserTimer,
  stopUserTimer,
  finishUserTimer,
}
