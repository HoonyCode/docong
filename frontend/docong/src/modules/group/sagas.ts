import { call, put, takeEvery } from 'redux-saga/effects'
import { getGroupAllDateAnalysis, getGroupRankingList, getGroupTimeAnalysis, RankingDataList, UserAllDateAnalysis, UserTimeAnalysis } from '../../api/analysis';
import { addMemberGroup, createGroup, DefaultResponse, deleteGroup, deleteMemberGroup, getJiraIssue, getUserListData, Group, GroupData, Groups, modifyGroup, modifyJiraInfo, OnOffUserList, searchAllGroup, searchGroup } from '../../api/group';
import { actions, ADD_MEMBER_GROUP, CREATE_GROUP, DELETE_GROUP, DELETE_MEMBER_GROUP, getJiraIssueAsync, getUserListDataAsync, GET_GROUP_ALL_DATE_ANALYSIS, GET_GROUP_RANKING_LIST, GET_GROUP_TIME_ANALYSIS, GET_JIRA_ISSUE, GET_USER_LIST_DATA, MODIFY_GROUP, MODIFY_JIRA_INFO, searchAllGroupAsync, SEARCH_ALL_GROUP, SEARCH_GROUP } from './actions';



export function* createGroupSaga(action: ReturnType<typeof actions.createGroupAsync.request>) {
  try {
    const createGroupResponse: number = yield call(
      createGroup,
      action.payload
    )
    // group을 생성하고 모든 그룹을 불러옴
    yield put(searchAllGroupAsync.request(null))
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
    // group을 생성하고 모든 그룹을 불러옴
    yield put(searchAllGroupAsync.request(null))
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
    yield put(searchAllGroupAsync.request(null))
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
  } catch (e: any) {
    console.error(e)
  }
}

export function* searchAllGroupSaga(action: ReturnType<typeof actions.searchAllGroupAsync.request>) {
  try {
    const groups: Groups = yield call(searchAllGroup)
    yield put(searchAllGroupAsync.success(groups))
  } catch (e: any) {
    yield put(searchAllGroupAsync.failure(e))
    console.error(e)
  }
}

export function* addMemberGroupSaga(action: ReturnType<typeof actions.addMemberGroupAsync.request>) {
  try {
    const addMemberGroupResponse: DefaultResponse = yield call(
      addMemberGroup,
      action.payload
    )
  } catch (e: any) {
    alert("잘못된 유저를 추가하였습니다.")
    console.error(e)
  }
}

export function* deleteMemberGroupSaga(action: ReturnType<typeof actions.deleteMemberGroupAsync.request>) {
  try {
    const deleteMemberGroupResponse: DefaultResponse = yield call(
      deleteMemberGroup,
      action.payload
    )
    // group을 생성하고 모든 그룹을 불러옴
    yield put(searchAllGroupAsync.request(null))
  } catch (e: any) {
    console.error(e)
  }
}

export function* getUserListDataSaga(action: ReturnType<typeof actions.getUserListDataAsync.request>) {
  try {
    const getUserListDataResponse: OnOffUserList = yield call(
      getUserListData,
      action.payload
    )
    yield put(getUserListDataAsync.success(getUserListDataResponse))
  } catch (e: any) {
    yield put(getUserListDataAsync.failure(e))
    console.error(e)
  }
}

export function* modifyJiraInfoSaga(action: ReturnType<typeof actions.modifyJiraInfoAsync.request>) {
  try {
    const modifyJiraInfoResponse: DefaultResponse = yield call(
      modifyJiraInfo,
      action.payload.jiraData,
      action.payload.team_id
    )
    // Jira 정보를 업데이트하고 Jira 데이터를 가져옴
    yield put(getJiraIssueAsync.request(action.payload.team_id))
  } catch (e: any) {
    console.error(e)
  }
}

export function* getJiraIssueSaga(action: ReturnType<typeof actions.getJiraIssueAsync.request>) {
  try {
    const getJiraIssueResponse: DefaultResponse = yield call(
      getJiraIssue,
      action.payload
    )
  } catch (e: any) {
    console.log(e)
  }
}

export function* getGroupAllDateAnalysisSaga(action: ReturnType<typeof actions.getGroupAllDateAnalysisAsync.request>) {
  try {
    const getGroupAllDateAnalysisResponse: UserAllDateAnalysis = yield call(
      getGroupAllDateAnalysis,
      action.payload.year,
      action.payload.groupSeq
    )
    yield put(actions.getGroupAllDateAnalysisAsync.success(getGroupAllDateAnalysisResponse))
  }
  catch (e:any) {
    console.log(e)
    yield put(actions.getGroupAllDateAnalysisAsync.failure(e))
  }
}

export function* getGroupRankingListSaga(action: ReturnType<typeof actions.getGroupRankingListAsync.request>) {
  try {
    const getGroupRankingListResponse: RankingDataList = yield call(
      getGroupRankingList,
      action.payload
    )
    yield put(actions.getGroupRankingListAsync.success(getGroupRankingListResponse))
  }
  catch (e:any) {
    console.log(e)
    yield put(actions.getGroupRankingListAsync.failure(e))
  }
}

export function* getGroupTimeAnalysisSaga(action: ReturnType<typeof actions.getGroupTimeAnalysisAsync.request>) {
  try {
    const getGroupTimeAnalysisAsyncResponse: UserTimeAnalysis = yield call(
      getGroupTimeAnalysis,
      action.payload
    )
    yield put(actions.getGroupTimeAnalysisAsync.success(getGroupTimeAnalysisAsyncResponse))
  }
  catch (e:any) {
    console.log(e)
    yield put(actions.getGroupTimeAnalysisAsync.failure(e))
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
  yield takeEvery(GET_USER_LIST_DATA, getUserListDataSaga)
  yield takeEvery(GET_GROUP_ALL_DATE_ANALYSIS, getGroupAllDateAnalysisSaga)
  yield takeEvery(GET_GROUP_RANKING_LIST, getGroupRankingListSaga)
  yield takeEvery(GET_GROUP_TIME_ANALYSIS, getGroupTimeAnalysisSaga)
}