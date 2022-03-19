import { actions } from './actions'
import { ActionType } from 'typesafe-actions'
import { AsyncState } from '../../lib/reducerUtils'
import { Todo } from '../../api/todo'

export type TodoAction = ActionType<typeof actions>

export type TodoState = {
  userTodos: AsyncState<Todo, Error>
}
