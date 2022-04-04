import { actions } from './actions'
import { ActionType } from 'typesafe-actions'
import { AsyncState } from '../../lib/reducerUtils'
import { Groups, OnOffUserList } from '../../api/group'

export type GroupAction = ActionType<typeof actions>

export type GroupState = {
    groups: AsyncState<Groups, Error>
    userList: AsyncState<OnOffUserList, Error>
}