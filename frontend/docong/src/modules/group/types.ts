import { actions } from './actions'
import { ActionType } from 'typesafe-actions'
import { AsyncState } from '../../lib/reducerUtils'
import { Groups, OnOffUserList } from '../../api/group'
import { RankingDataList, UserAllDateAnalysis, UserTimeAnalysis } from '../../api/analysis'

export type GroupAction = ActionType<typeof actions>

export type GroupState = {
    groups: AsyncState<Groups, Error>
    userList: AsyncState<OnOffUserList, Error>
    groupAllDateAnalysis: AsyncState<UserAllDateAnalysis, Error>
    rankingList: AsyncState<RankingDataList, Error>
    groupTimeAnalysis: AsyncState<UserTimeAnalysis, Error>
}