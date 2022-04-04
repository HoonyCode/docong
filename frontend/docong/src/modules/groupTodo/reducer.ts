import { createReducer } from "typesafe-actions";
import { asyncState, createAsyncReducer, transformToArray } from "../../lib/reducerUtils";
import { findAllGroupTodosAsync } from "./actions";
import { GroupTodoAction, GroupTodoState } from "./types";

const initialState: GroupTodoState = {
    groupTodos: asyncState.initial(),
}

const groupTodo = createReducer<GroupTodoState, GroupTodoAction>(initialState).handleAction(
    transformToArray(findAllGroupTodosAsync),
    createAsyncReducer(findAllGroupTodosAsync, 'groupTodos')
)

export default groupTodo