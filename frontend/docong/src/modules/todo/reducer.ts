import { createReducer } from 'typesafe-actions'
import { TodoAction, TodoState } from './types'
import { findUserTodosAsync } from './actions'
import {
  asyncState,
  createAsyncReducer,
  transformToArray,
} from '../../lib/reducerUtils'

// --- recerUtils 의 asyncState 를 활용한 리팩토링 ---
const initialState: TodoState = {
  userTodos: asyncState.initial(),
}

// --- reducerUtils 의 createAsyncReducer, transformToArray 를 활용한 리팩토링 ---
const todo = createReducer<TodoState, TodoAction>(initialState).handleAction(
  transformToArray(findUserTodosAsync),
  createAsyncReducer(findUserTodosAsync, 'userTodos')
)

export default todo
