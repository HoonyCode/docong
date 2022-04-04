import { createReducer } from 'typesafe-actions'
import { GroupAction, GroupState } from './types'
import {
  asyncState,
  createAsyncReducer,
  transformToArray,
} from '../../lib/reducerUtils'
import { GET_USER_LIST_DATA, GET_USER_LIST_DATA_ERROR, GET_USER_LIST_DATA_SUCCESS, searchAllGroupAsync } from './actions'

const initialState: GroupState = {
  groups: asyncState.initial(),
  userList: asyncState.initial()
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
  })
})
  .handleAction(
    transformToArray(searchAllGroupAsync),
    createAsyncReducer(searchAllGroupAsync, 'groups')
  )


export default group