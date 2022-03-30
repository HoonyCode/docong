import axios from 'axios'
// import { modifyJiraInfo } from '../modules/group'
import { BASE_URL } from './auth'
import { UserInfo } from './user'

const setHeader = function () {
    const token = localStorage.getItem('jwtToken')
    const header = {
        Authorization: `Bearer ${token}`,
    }
    return header
}

export async function createGroup(groupCreateData: GroupCreateData) {
    console.log(groupCreateData)
    const response = await axios.post(`${BASE_URL}/api/team`, groupCreateData, {
        headers: setHeader(),
    })
    return response.data
}

export async function modifyGroup(groupModifyData: GroupModifyData) {
    const response = await axios.put(`${BASE_URL}/api/team`, groupModifyData, {
        headers: setHeader(),
    })
    return response.data
}

export async function deleteGroup(team_id: number) {
    const response = await axios.delete(`${BASE_URL}/api/team/${team_id}`, {
        headers: setHeader(),
    })
    return response.data
}

export async function searchGroup(team_id: number) {
    const response = await axios.get(`${BASE_URL}/api/team/${team_id}`, {
        headers: setHeader(),
    })
    return response.data
}

export async function searchAllGroup() {
    const response = await axios.get(`${BASE_URL}/api/team/all`, {
        headers: setHeader(),
    })
    console.log("group all -> ", response.data)
    return response.data
}

export async function addMemberGroup(groupMemberModifyData: GroupMemberModifyData) {
    const response = await axios.post(`${BASE_URL}/api/team/member`, groupMemberModifyData, {
        headers: setHeader(),
    })
    return response.data
}

export async function deleteMemberGroup(groupMemberModifyData: GroupMemberModifyData2) {
    const response = await axios.delete(`${BASE_URL}/api/team/member/${groupMemberModifyData.team_id}/${groupMemberModifyData.user_email}`, {
        headers: setHeader(),
    })
    return response.data
}

export async function modifyJiraInfo(jiraData: JiraData, team_id: number) {
    console.log("group.ts ->", jiraData)
    const response = await axios.post(`${BASE_URL}/api/jira/${team_id}`, jiraData, {
        headers: setHeader(),
    })
    return response.data
}

export async function getJiraIssue(team_id: number) {
    const response = await axios.get(`${BASE_URL}/api/jira/${team_id}`, {
        headers: setHeader(),
    })
    return response.data
}

export interface JiraData {
    jiraDomain: string
    jiraUserId: string
    jiraAPIToken: string
    jiraProjectKey: string
}

export interface GroupCreateData {
    userEmail: string
    name: string
}

export interface GroupModifyData {
    userEmail: string
    teamId: number
    name: string
}

export interface GroupMemberModifyData {
    teamId: number
    userEmail: string
}

export interface GroupMemberModifyData2 {
    team_id: number
    user_email: string
}

export interface GroupData {
    teamId: number
    userList: Array<UserInfo>
    name: String
    leader: UserInfo
}

export interface DefaultResponse {
    code: string
    message: string
    status: number
}

export interface MemberData {
    email: string
    name: string
}

export interface Group {
    teamSeq: number
    createdDate: string
    modifiedDate: string
    jiraApiToken: string
    jiraDomain: string
    jiraProjectKey: string
    jiraUserId: string
    userList: Array<MemberData>
    name: string
}

export interface Groups extends Array<Group> {}