import { createReducer } from 'typesafe-actions'
import { UserAction, UserState } from './types'
import {
  CHANGE_USER_TIMER_STATUS,
  CHANGE_USER_TIMER_TIME,
  CHANGE_USER_TIMER_TODO,
  CHANGE_USER_TIMER_TYPE,
  getRankingListAsync,
  getUserInfoAsync,
  getUserPomoCountAsync,
  getUserTimeAnalysisAsync,
  getWorkTypeAnalysisAsync,
  INIT_USER_TIMER,
} from './actions'
import {
  asyncState,
  createAsyncReducer,
  transformToArray,
} from '../../lib/reducerUtils'

// --- recerUtils 의 asyncState 를 활용한 리팩토링 ---
const initialState: UserState = {
  userInfo: asyncState.initial(),
  // 개인 타이머 상태
  userTimer: {
    selectedType: { index: 1, name: 'Basic', time: 1500 },
    selectedTodo: null,
    status: 'stop',
    time: 1500,
  },
  rankingList: asyncState.initial(),
  workTypeAnalysis: asyncState.initial(),
  userPomoCountAnalysis: asyncState.initial(),
  userTimeAnalysis: asyncState.initial(),
}

// --- reducerUtils 의 createAsyncReducer, transformToArray 를 활용한 리팩토링 ---
const user = createReducer<UserState, UserAction>(initialState, {
  [INIT_USER_TIMER]: (state) => ({
    ...state,
    userTimer: initialState.userTimer,
  }),
  [CHANGE_USER_TIMER_TYPE]: (state, action) => ({
    ...state,
    userTimer: {
      ...state.userTimer,
      selectedType: action.payload.selectedType,
      time: action.payload.time,
    },
  }),
  [CHANGE_USER_TIMER_TODO]: (state, action) => ({
    ...state,
    userTimer: {
      ...state.userTimer,
      selectedTodo: action.payload,
    },
  }),
  [CHANGE_USER_TIMER_STATUS]: (state, action) => ({
    ...state,
    userTimer: {
      ...state.userTimer,
      status: action.payload,
    },
  }),
  [CHANGE_USER_TIMER_TIME]: (state, action) => ({
    ...state,
    userTimer: {
      ...state.userTimer,
      time: action.payload,
    },
  }),
})
  .handleAction(
    transformToArray(getUserInfoAsync),
    createAsyncReducer(getUserInfoAsync, 'userInfo')
  )
  .handleAction(
    transformToArray(getRankingListAsync),
    createAsyncReducer(getRankingListAsync, 'rankingList')
  )
  .handleAction(
    transformToArray(getWorkTypeAnalysisAsync),
    createAsyncReducer(getWorkTypeAnalysisAsync, 'workTypeAnalysis')
  )
  .handleAction(
    transformToArray(getUserPomoCountAsync),
    createAsyncReducer(getUserPomoCountAsync, 'userPomoCountAnalysis')
  )
  .handleAction(
    transformToArray(getUserTimeAnalysisAsync),
    createAsyncReducer(getUserTimeAnalysisAsync, 'userTimeAnalysis')
  )

export default user
