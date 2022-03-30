import { CoPresentSharp } from '@mui/icons-material';
import { call, put, takeEvery } from 'redux-saga/effects'
import { TypeOfTag } from 'typescript';
import { addMemberGroup, createGroup, DefaultResponse, deleteGroup, deleteMemberGroup, getJiraIssue, Group, GroupData, Groups, modifyGroup, modifyJiraInfo, searchAllGroup, searchGroup } from '../../api/group';
import { actions, ADD_MEMBER_GROUP, CREATE_GROUP, DELETE_GROUP, DELETE_MEMBER_GROUP, getJiraIssueAsync, GET_JIRA_ISSUE, MODIFY_GROUP, MODIFY_JIRA_INFO, searchAllGroupAsync, SEARCH_ALL_GROUP, SEARCH_GROUP } from './actions';



export function* createGroupSaga(action: ReturnType<typeof actions.createGroupAsync.request>) {
  try {
    const createGroupResponse: number = yield call(
      createGroup,
      action.payload
    )
    // group을 생성하고 모든 그룹을 불러옴
    yield put(searchAllGroupAsync.request(null))
    console.log(createGroupResponse)
  } catch (e: any) {
    console.error(e)
  }
}

export function* modifyGroupSaga(action: ReturnType<typeof actions.modifyGroupAsync.request>) {
  try {
    const modifyGroupResponse: number = yield call(
      modifyGroup,
      action.payload
    )
    console.log(modifyGroupResponse)
  } catch (e: any) {
    console.error(e)
  }
}

export function* deleteGroupSaga(action: ReturnType<typeof actions.deleteGroupAsync.request>) {
  try {
    const deleteGroupResponse: DefaultResponse = yield call(
      deleteGroup,
      action.payload
    )
    // group을 삭제하고 모든 그룹을 불러옴
    // yield put(searchAllGroupAsync.request(null))
    console.log(deleteGroupResponse)
  } catch (e: any) {
    console.error(e)
  }
}

export function* searchGroupSaga(action: ReturnType<typeof actions.searchGroupAsync.request>) {
  try {
    const searchGroupResponse: GroupData = yield call(
      searchGroup,
      action.payload
    )
    console.log(searchGroupResponse)
  } catch (e: any) {
    console.error(e)
  }
}

export function* searchAllGroupSaga(action: ReturnType<typeof actions.searchAllGroupAsync.request>) {
  try{
    const groups: Groups = yield call(searchAllGroup)
    yield put(searchAllGroupAsync.success(groups))
    console.log(groups)
  } catch(e:any){
    yield put(searchAllGroupAsync.failure(e))
    console.error(e)
  }
}

export function* addMemberGroupSaga(action: ReturnType<typeof actions.addMemberGroupAsync.request>) {
  try{
    const addMemberGroupResponse: DefaultResponse = yield call(
      addMemberGroup,
      action.payload
    )
    console.log(addMemberGroupResponse)
  } catch(e: any) {
    console.error(e)
  }
}

export function* deleteMemberGroupSaga(action: ReturnType<typeof actions.deleteMemberGroupAsync.request>) {
  try{
    const deleteMemberGroupResponse: DefaultResponse = yield call(
      deleteMemberGroup,
      action.payload
    )
    console.log(deleteMemberGroupResponse)
  } catch(e: any) {
    console.error(e)
  }
}

export function* modifyJiraInfoSaga(action: ReturnType<typeof actions.modifyJiraInfoAsync.request>) {
  try{
    const modifyJiraInfoResponse: DefaultResponse = yield call(
      modifyJiraInfo,
      action.payload.jiraData,
      action.payload.team_id
    )
    // Jira 정보를 업데이트하고 Jira 데이터를 가져옴
    yield put(getJiraIssueAsync.request(action.payload.team_id))
    console.log(modifyJiraInfoResponse)
  }catch(e: any) {
    console.error(e)
  }
}

export function* getJiraIssueSaga(action: ReturnType<typeof actions.getJiraIssueAsync.request>) {
  try{
    const getJiraIssueResponse: DefaultResponse = yield call(
      getJiraIssue,
      action.payload
    )
    console.log(getJiraIssueResponse)
  } catch(e: any) {
    console.log(e)
  }
}

export function* groupSaga() {
  yield takeEvery(CREATE_GROUP, createGroupSaga)
  yield takeEvery(MODIFY_GROUP, modifyGroupSaga)
  yield takeEvery(DELETE_GROUP, deleteGroupSaga)
  yield takeEvery(SEARCH_GROUP, searchGroupSaga)
  yield takeEvery(SEARCH_ALL_GROUP, searchAllGroupSaga)
  yield takeEvery(ADD_MEMBER_GROUP, addMemberGroupSaga)
  yield takeEvery(DELETE_MEMBER_GROUP, deleteMemberGroupSaga)
  yield takeEvery(MODIFY_JIRA_INFO, modifyJiraInfoSaga)
  yield takeEvery(GET_JIRA_ISSUE, getJiraIssueSaga)
}