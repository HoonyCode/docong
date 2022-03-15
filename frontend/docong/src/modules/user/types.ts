import { actions } from './actions'
import { ActionType } from 'typesafe-actions'

export type UserAction = ActionType<typeof actions>

export type UserState = {
  userTimer: any
}

export type UserTimerKey = keyof UserState['userTimer']
