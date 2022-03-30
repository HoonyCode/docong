import { createReducer } from 'typesafe-actions'
import { GroupAction, GroupState } from './types'
import {
  asyncState,
  createAsyncReducer,
  transformToArray,
} from '../../lib/reducerUtils'
import { searchAllGroupAsync } from './actions'

const initialState: GroupState = {
    groups: asyncState.initial(),
}

const group = createReducer<GroupState, GroupAction>(initialState).handleAction(
    transformToArray(searchAllGroupAsync),
    createAsyncReducer(searchAllGroupAsync, 'groups')
)

export default group