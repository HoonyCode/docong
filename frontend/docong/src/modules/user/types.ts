import { actions } from './actions'
import { ActionType } from 'typesafe-actions'
import { AsyncState } from '../../lib/reducerUtils'
import { UserInfo } from '../../api/user'
import { RankingDataList } from '../../api/analysis'

export type UserAction = ActionType<typeof actions>

export type UserState = {
  userInfo: AsyncState<UserInfo, Error>
  userTimer: any
  rankingList: AsyncState<RankingDataList, Error>
}

export type UserTimerKey = keyof UserState['userTimer']
