import { createReducer } from 'typesafe-actions'
import { GroupAction, GroupState } from './types'
import {
  asyncState,
  createAsyncReducer,
  transformToArray,
} from '../../lib/reducerUtils'
import { GET_GROUP_ALL_DATE_ANALYSIS, GET_GROUP_ALL_DATE_ANALYSIS_FAIL, GET_GROUP_ALL_DATE_ANALYSIS_SUCCESS, GET_GROUP_RANKING_LIST, GET_GROUP_RANKING_LIST_FAIL, GET_GROUP_RANKING_LIST_SUCCESS, GET_GROUP_TIME_ANALYSIS, GET_GROUP_TIME_ANALYSIS_FAIL, GET_GROUP_TIME_ANALYSIS_SUCCESS, GET_USER_LIST_DATA, GET_USER_LIST_DATA_ERROR, GET_USER_LIST_DATA_SUCCESS, searchAllGroupAsync } from './actions'

const initialState: GroupState = {
  groups: asyncState.initial(),
  userList: asyncState.initial(),
  groupAllDateAnalysis: asyncState.initial(),
  rankingList: asyncState.initial(),
  groupTimeAnalysis: asyncState.initial()
}

const group = createReducer<GroupState, GroupAction>(initialState,{
  [GET_USER_LIST_DATA]: (state) => ({
    ...state,
    userList: asyncState.load(),
  }),
  [GET_USER_LIST_DATA_SUCCESS]: (state, action) => ({
    ...state,
    userList: asyncState.success(action.payload),
  }),
  [GET_USER_LIST_DATA_ERROR]: (state, action) => ({
    ...state,
    userList: asyncState.error(action.payload)
  }),
  
  [GET_GROUP_ALL_DATE_ANALYSIS]: (state) => ({
    ...state,
    groupAllDateAnalysis: asyncState.load(),
  }),
  [GET_GROUP_ALL_DATE_ANALYSIS_SUCCESS]: (state, action) => ({
    ...state,
    groupAllDateAnalysis: asyncState.success(action.payload)
  }),
  [GET_GROUP_ALL_DATE_ANALYSIS_FAIL]: (state, action) => ({
    ...state,
    groupAllDateAnalysis: asyncState.error(action.payload),
  }),
  
  [GET_GROUP_RANKING_LIST]: (state) => ({
    ...state,
    rankingList: asyncState.load(),
  }),
  [GET_GROUP_RANKING_LIST_SUCCESS]: (state, action) => ({
    ...state,
    rankingList: asyncState.success(action.payload)
  }),
  [GET_GROUP_RANKING_LIST_FAIL]: (state, action) => ({
    ...state,
    rankingList: asyncState.error(action.payload),
  }),

  [GET_GROUP_TIME_ANALYSIS]: (state) => ({
    ...state,
    groupTimeAnalysis: asyncState.load(),
  }),
  [GET_GROUP_TIME_ANALYSIS_SUCCESS]: (state, action) => ({
    ...state,
    groupTimeAnalysis: asyncState.success(action.payload)
  }),
  [GET_GROUP_TIME_ANALYSIS_FAIL]: (state, action) => ({
    ...state,
    groupTimeAnalysis: asyncState.error(action.payload),
  }),
})
  .handleAction(
    transformToArray(searchAllGroupAsync),
    createAsyncReducer(searchAllGroupAsync, 'groups')
  )


export default group