import { ActionType } from "typesafe-actions";
import { GroupTodo } from "../../api/groupTodo";
import { AsyncState } from "../../lib/reducerUtils";
import { actions } from "./actions";

export type GroupTodoAction = ActionType<typeof actions>

export type GroupTodoState = {
    groupTodos: AsyncState<GroupTodo, Error>
}