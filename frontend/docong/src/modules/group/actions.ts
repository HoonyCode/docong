import { createAsyncAction } from 'typesafe-actions' // createAsyncAction 유틸함수 사용
import { AxiosError } from 'axios'
import { GroupCreateData, GroupModifyData, GroupMemberModifyData, DefaultResponse, GroupData, GroupMemberModifyData2, Groups } from '../../api/group'


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

export const MODIFY_JIRA_INFO = 'group/MODIFY_JIRA_INFO'
export const MODIFY_JIRA_INFO_SUCCESS = 'group/MODIFY_JIRA_INFO_SUCCESS'
export const MODIFY_JIRA_INFO_FAIL = 'group/MODIFY_JIRA_INFO_FAIL'

export const GET_JIRA_ISSUE = 'group/GET_JIRA_ISSUE'
export const GET_JIRA_ISSUE_SUCCESS = 'group/GET_JIRA_ISSUE_SUCCESS'
export const GET_JIRA_ISSUE_FAIL = 'group/GET_JIRA_ISSUE_FAIL'

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

export const actions = {
    createGroupAsync,
    modifyGroupAsync,
    deleteGroupAsync,
    searchGroupAsync,
    searchAllGroupAsync,
    addMemberGroupAsync,
    deleteMemberGroupAsync,
    modifyJiraInfoAsync,
    getJiraIssueAsync
}