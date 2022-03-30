import { actions } from './actions'
import { ActionType } from 'typesafe-actions'
import { AsyncState } from '../../lib/reducerUtils'
import { Group } from '../../api/group'

export type GroupAction = ActionType<typeof actions>

export type GroupState = {
    groups: AsyncState<Group, Error>
}