import { createAsyncAction } from 'typesafe-actions' // createAsyncAction 유틸함수 사용
import { AxiosError } from 'axios'
import { GroupCreateData, GroupModifyData, GroupMemberModifyData, DefaultResponse, GroupData, GroupMemberModifyData2, Groups, OnOffUserList } from '../../api/group'
import { GroupAllDateInput, RankingDataList, UserAllDateAnalysis, UserTimeAnalysis } from '../../api/analysis'


export const CREATE_GROUP = 'group/CREATE_GROUP'
export const CREATE_GROUP_SUCCESS = 'group/CREATE_GROUP_SUCCESS'
export const CREATE_GROUP_ERROR = 'group/CREATE_GROUP_ERROR'

export const MODIFY_GROUP = 'group/MODIFY_GROUP'
export const MODIFY_GROUP_SUCCESS = 'group/MODIFY_GROUP_SUCCESS'
export const MODIFY_GROUP_ERROR = 'group/MODIFY_GROUP_ERROR'

export const DELETE_GROUP = 'group/DELETE_GROUP'
export const DELETE_GROUP_SUCCESS = 'group/DELETE_GROUP_SUCCESS'
export const DELETE_GROUP_ERROR = 'group/DELETE_GROUP_ERROR'

export const SEARCH_GROUP = 'group/SEARCH_GROUP'
export const SEARCH_GROUP_SUCCESS = 'group/SEARCH_GROUP_SUCCESS'
export const SEARCH_GROUP_ERROR = 'group/SEARCH_GROUP_ERROR'

export const SEARCH_ALL_GROUP = 'group/SEARCH_ALL_GROUP'
export const SEARCH_ALL_GROUP_SUCCESS = 'group/SEARCH_ALL_GROUP_SUCCESS'
export const SEARCH_ALL_GROUP_ERROR = 'group/SEARCH_ALL_GROUP_ERROR'

export const ADD_MEMBER_GROUP = 'group/ADD_MEMBER_GROUP'
export const ADD_MEMBER_GROUP_SUCCESS = 'group/ADD_MEMBER_GROUP_SUCCESS'
export const ADD_MEMBER_GROUP_ERROR = 'group/ADD_MEMBER_GROUP_ERROR'

export const DELETE_MEMBER_GROUP = 'group/DELETE_MEMBER_GROUP'
export const DELETE_MEMBER_GROUP_SUCCESS = 'group/DELETE_MEMBER_GROUP_SUCCESS'
export const DELETE_MEMBER_GROUP_ERROR = 'group/DELETE_MEMBER_GROUP_ERROR'

export const GET_USER_LIST_DATA = 'group/GET_USER_LIST_DATA'
export const GET_USER_LIST_DATA_SUCCESS = 'group/GET_USER_LIST_DATA_SUCCESS'
export const GET_USER_LIST_DATA_ERROR = 'group/GET_USER_LIST_DATA_ERROR'

export const MODIFY_JIRA_INFO = 'group/MODIFY_JIRA_INFO'
export const MODIFY_JIRA_INFO_SUCCESS = 'group/MODIFY_JIRA_INFO_SUCCESS'
export const MODIFY_JIRA_INFO_FAIL = 'group/MODIFY_JIRA_INFO_FAIL'

export const GET_JIRA_ISSUE = 'group/GET_JIRA_ISSUE'
export const GET_JIRA_ISSUE_SUCCESS = 'group/GET_JIRA_ISSUE_SUCCESS'
export const GET_JIRA_ISSUE_FAIL = 'group/GET_JIRA_ISSUE_FAIL'

export const GET_GROUP_ALL_DATE_ANALYSIS = 'group/GET_GROUP_ALL_DATE_ANALYSIS'
export const GET_GROUP_ALL_DATE_ANALYSIS_SUCCESS = 'group/GET_GROUP_ALL_DATE_ANALYSIS_SUCCESS'
export const GET_GROUP_ALL_DATE_ANALYSIS_FAIL = 'group/GET_GROUP_ALL_DATE_ANALYSIS_FAIL'

export const GET_GROUP_RANKING_LIST = 'group/GET_GROUP_RANKING_LIST'
export const GET_GROUP_RANKING_LIST_SUCCESS = 'group/GET_GROUP_RANKING_LIST_SUCCESS'
export const GET_GROUP_RANKING_LIST_FAIL = 'group/GET_GROUP_RANKING_LIST_FAIL'

export const GET_GROUP_TIME_ANALYSIS = 'group/GET_GROUP_TIME_ANALYSIS'
export const GET_GROUP_TIME_ANALYSIS_SUCCESS = 'group/GET_GROUP_TIME_ANALYSIS_SUCCESS'
export const GET_GROUP_TIME_ANALYSIS_FAIL = 'group/GET_GROUP_TIME_ANALYSIS_FAIL'

// 액션 생성함수 선언
export const createGroupAsync = createAsyncAction(
    CREATE_GROUP,
    CREATE_GROUP_SUCCESS,
    CREATE_GROUP_ERROR
)<GroupCreateData, number, AxiosError>()

export const modifyGroupAsync = createAsyncAction(
    MODIFY_GROUP,
    MODIFY_GROUP_SUCCESS,
    MODIFY_GROUP_ERROR
)<GroupModifyData, number, AxiosError>()

export const deleteGroupAsync = createAsyncAction(
    DELETE_GROUP,
    DELETE_GROUP_SUCCESS,
    DELETE_GROUP_ERROR
)<any, DefaultResponse, AxiosError>()

export const searchGroupAsync = createAsyncAction(
    SEARCH_GROUP,
    SEARCH_GROUP_SUCCESS,
    SEARCH_GROUP_ERROR
)<any, GroupData, AxiosError>()

export const searchAllGroupAsync = createAsyncAction(
    SEARCH_ALL_GROUP,
    SEARCH_ALL_GROUP_SUCCESS,
    SEARCH_ALL_GROUP_ERROR
)<null, Groups, AxiosError>()

export const addMemberGroupAsync = createAsyncAction(
    ADD_MEMBER_GROUP,
    ADD_MEMBER_GROUP_SUCCESS,
    ADD_MEMBER_GROUP_ERROR
)<GroupMemberModifyData, DefaultResponse, AxiosError>()

export const deleteMemberGroupAsync = createAsyncAction(
    DELETE_MEMBER_GROUP,
    DELETE_MEMBER_GROUP_SUCCESS,
    DELETE_MEMBER_GROUP_ERROR
)<GroupMemberModifyData2, DefaultResponse, AxiosError>()

export const getUserListDataAsync = createAsyncAction(
    GET_USER_LIST_DATA,
    GET_USER_LIST_DATA_SUCCESS,
    GET_USER_LIST_DATA_ERROR
)<number, OnOffUserList, AxiosError>()

export const modifyJiraInfoAsync = createAsyncAction(
    MODIFY_JIRA_INFO,
    MODIFY_JIRA_INFO_SUCCESS,
    MODIFY_JIRA_INFO_FAIL
)<any, DefaultResponse, AxiosError>()

export const getJiraIssueAsync = createAsyncAction(
    GET_JIRA_ISSUE,
    GET_JIRA_ISSUE_SUCCESS,
    GET_JIRA_ISSUE_FAIL
)<any, DefaultResponse, AxiosError>()

export const getGroupAllDateAnalysisAsync = createAsyncAction(
    GET_GROUP_ALL_DATE_ANALYSIS,
    GET_GROUP_ALL_DATE_ANALYSIS_SUCCESS,
    GET_GROUP_ALL_DATE_ANALYSIS_FAIL
)<GroupAllDateInput, UserAllDateAnalysis, AxiosError>()

export const getGroupRankingListAsync = createAsyncAction(
    GET_GROUP_RANKING_LIST,
    GET_GROUP_RANKING_LIST_SUCCESS,
    GET_GROUP_RANKING_LIST_FAIL
)<number, RankingDataList, AxiosError>()

export const getGroupTimeAnalysisAsync = createAsyncAction(
    GET_GROUP_TIME_ANALYSIS,
    GET_GROUP_TIME_ANALYSIS_SUCCESS,
    GET_GROUP_TIME_ANALYSIS_FAIL
)<number, UserTimeAnalysis, AxiosError>()

export const actions = {
    createGroupAsync,
    modifyGroupAsync,
    deleteGroupAsync,
    searchGroupAsync,
    searchAllGroupAsync,
    addMemberGroupAsync,
    deleteMemberGroupAsync,
    getUserListDataAsync,
    modifyJiraInfoAsync,
    getJiraIssueAsync,
    getGroupAllDateAnalysisAsync,
    getGroupRankingListAsync,
    getGroupTimeAnalysisAsync
}