import { actions } from './actions'
import { ActionType } from 'typesafe-actions'
import { AsyncState } from '../../lib/reducerUtils'
import { UserInfo } from '../../api/user'

export type UserAction = ActionType<typeof actions>

export type UserState = {
  userInfo: AsyncState<UserInfo, Error>
  userTimer: any
}

export type UserTimerKey = keyof UserState['userTimer']
