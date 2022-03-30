import { call, put, takeEvery } from "redux-saga/effects";
import { changeGroupTodoActivate, DefaultResponse, deleteGroupTodo, findAllGroupTodos, findGroupTodo, GroupTodo, GroupTodos, modifyGroupTodo, modifyGroupTodoStatus, saveGroupTodo } from "../../api/groupTodo";
import { actions, changeGroupTodoActivateAsync, CHANGE_GROUP_TODO_ACTIVATE, deleteGroupTodoAsync, DELETE_GROUP_TODO, findAllGroupTodosAsync, findGroupTodoAsync, FIND_ALL_GROUP_TODOS, FIND_GROUP_TODO, modifyGroupTodoAsync, modifyGroupTodoStatusAsync, MODIFY_GROUP_TODO, MODIFY_GROUP_TODO_STATUS, saveGroupTodoAsync, SAVE_GROUP_TODO } from "./actions";

function* saveGroupTodoSaga(action: ReturnType<typeof saveGroupTodoAsync.request>) {
    try {
        const saveGroupTodoResponse: DefaultResponse = yield call(
            saveGroupTodo,
            action.payload
        )
        yield put(findAllGroupTodosAsync.request(action.payload.teamId)) // 그 그룹의 id를 넣어야함
        console.log(saveGroupTodoResponse)
    } catch (e: any) {
        console.error(e)
    }
}

function* findGroupTodoSaga(action: ReturnType<typeof findGroupTodoAsync.request>) {
    try {
        const findGroupTodoResponse: GroupTodo = yield call(
            findGroupTodo,
            action.payload
        )
        console.log(findGroupTodoResponse)
    } catch (e: any) {
        console.error(e)
    }
}

function* modifyGroupTodoSaga(action: ReturnType<typeof modifyGroupTodoAsync.request>) {
    try {
        const modifyGroupTodoResponse: DefaultResponse = yield call(
            modifyGroupTodo,
            action.payload.todoId,
            action.payload.groupTodoInput
        )
        yield put(findAllGroupTodosAsync.request(action.payload.groupTodoInput.teamId))
        console.log(modifyGroupTodoResponse)
    } catch (e: any) {
        console.error(e)
    }
}

function* deleteGroupTodoSaga(action: ReturnType<typeof deleteGroupTodoAsync.request>) {
    try {
        const deleteGroupTodoResponse: DefaultResponse = yield call(
            deleteGroupTodo,
            action.payload
        )
        // 여기서 group todo 갱신을 해줘야함
        console.log(deleteGroupTodoResponse)
    } catch (e: any) {
        console.error(e)
    }
}

function* modifyGroupTodoStatusSaga(action: ReturnType<typeof modifyGroupTodoStatusAsync.request>) {
    try {
        const modifyGroupTodoStatusResponse: DefaultResponse = yield call(
            modifyGroupTodoStatus,
            action.payload.todoId,
            action.payload.todoStatus
        )
        console.log(modifyGroupTodoStatusResponse)
    } catch (e: any) {
        console.error(e)
    }
}

function* changeGroupTodoActivateSaga(
    action: ReturnType<typeof changeGroupTodoActivateAsync.request>
) {
    try {
        const response: {} = yield call(
            changeGroupTodoActivate,
            action.payload.todoId,
            action.payload.activateData
        )
        console.log(response)
    } catch (e: any) {
        console.error(e)
    }
}

export function* findAllGroupTodosSaga(action: ReturnType<typeof actions.findAllGroupTodosAsync.request>) {
    try {
        const groupTodos: GroupTodos = yield call(
            findAllGroupTodos,
            action.payload
        )
        yield put(findAllGroupTodosAsync.success(groupTodos))
        console.log(groupTodos)
    } catch (e: any) {
        yield put(findAllGroupTodosAsync.failure(e))
        console.error(e)
    }
}

export function* groupTodoSaga() {
    yield takeEvery(SAVE_GROUP_TODO, saveGroupTodoSaga)
    yield takeEvery(FIND_GROUP_TODO, findGroupTodoSaga)
    yield takeEvery(MODIFY_GROUP_TODO, modifyGroupTodoSaga)
    yield takeEvery(DELETE_GROUP_TODO, deleteGroupTodoSaga)
    yield takeEvery(MODIFY_GROUP_TODO_STATUS, modifyGroupTodoStatusSaga)
    yield takeEvery(CHANGE_GROUP_TODO_ACTIVATE, changeGroupTodoActivateSaga)
    yield takeEvery(FIND_ALL_GROUP_TODOS, findAllGroupTodosSaga)
}