import { createReducer } from 'typesafe-actions'
import { UserAction } from './types'
import { userSignupAsync } from './actions'
import { createAsyncReducer, transformToArray } from '../../lib/reducerUtils'

// --- recerUtils 의 asyncState 를 활용한 리팩토링 ---
// const initialState: UserState = {
//   userProfile: asyncState.initial(),
// };

// --- reducerUtils 의 asyncState, createAsyncReducer, transformToArray 를 활용한 리팩토링 ---
// const user = createReducer<UserState, UserAction>(
//   initialState
// ).handleAction(
//   transformToArray(userSignupAsync),
//   createAsyncReducer(userSignupAsync, "userProfile")
// );
