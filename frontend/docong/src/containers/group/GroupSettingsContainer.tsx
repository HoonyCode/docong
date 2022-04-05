import { Avatar, Box, Button, Divider, Tooltip } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { GroupModifyData, Group, MemberData, GroupMemberModifyData, GroupMemberModifyData2, OnOffUser } from '../../api/group';
import { addMemberGroupAsync, deleteGroupAsync, deleteMemberGroupAsync, getUserListDataAsync, modifyGroupAsync, modifyJiraInfoAsync, searchAllGroupAsync } from '../../modules/group';
import { useDispatch, useSelector } from 'react-redux';
import GroupModify from '../../components/group/GroupModify';
import GroupDelete from '../../components/group/GroupDelete';
import GroupDeleteForm from '../../components/group/GroupDeleteForm';
import { useEffect, useState } from 'react';
import { RootState } from '../../modules';
import GroupMemberSetting from '../../components/group/GroupMemberSetting';
import MemberDelete from '../../components/group/MemberDelete';
import MemberDeleteForm from '../../components/group/MemberDeleteForm';
import { findAllGroupTodosAsync } from '../../modules/groupTodo';
import OnTimer from '../../components/group/OnTimer';

function GroupSettingsContainer() {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    const userInfo = useSelector((state: RootState) => state.user.userInfo.data)
    const userList = useSelector((state: RootState) => state.group.userList.data)
    const groups = useSelector((state: RootState) => state.group.groups.data)
    const groupSeq = Number(params.groupSeq)
    const [group, setGroup] = useState<null | Group>(null)

    useEffect(() => {
        findAllGroup()
        getUserList()
    }, [])

    useEffect(() => {
        if (groups != null) {
            const matchGroup = groups
                .find(g => g.teamSeq === groupSeq);
            setGroup({
                teamSeq: matchGroup ? matchGroup.teamSeq : 0,
                jiraApiToken: matchGroup ? matchGroup.jiraApiToken : '',
                jiraDomain: matchGroup ? matchGroup.jiraDomain : '',
                jiraProjectKey: matchGroup ? matchGroup.jiraProjectKey : '',
                jiraUserId: matchGroup ? matchGroup.jiraUserId : '',
                userList: matchGroup ? matchGroup.userList : null,
                name: matchGroup ? matchGroup.name : '',
                leaderEmail: matchGroup ? matchGroup.leaderEmail : ''
            })
        }
    }, [groups])

    const [isOpenGroupDeleteForm, setIsOpenGroupDeleteForm] = useState(false)
    const [isOpenMemberDeleteForm, setIsOpenMemberDeleteForm] = useState(false)

    const findAllGroup = () => {
        dispatch(searchAllGroupAsync.request(null))
    }

    const getUserList = () => {
        dispatch(getUserListDataAsync.request(groupSeq))
    }

    const onClickToGroupTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        navigate(`/group/todo/${groupSeq}`)
    }

    const onClickToGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        navigate(`/group`)
    }

    const onClickToGroupAnalysis = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        navigate(`/group/analysis/${groupSeq}`)
    }

    const onGroupModifySubmit = (groupModifyData: GroupModifyData) => {
        dispatch(modifyGroupAsync.request(groupModifyData))
    }

    const openGroupDeleteForm = () => {
        setIsOpenGroupDeleteForm(true)
    }

    const closeGroupDeleteForm = () => {
        setIsOpenGroupDeleteForm(false)
    }

    const openMemberDeleteForm = () => {
        setIsOpenMemberDeleteForm(true)
    }

    const closeMemberDeleteForm = () => {
        setIsOpenMemberDeleteForm(false)
    }

    const onGroupDeleteSubmit = (id: number) => {
        dispatch(deleteGroupAsync.request(id))
        navigate(`/timer`)
    }

    const onMemberDeleteSubmit = (groupMemberModifyData: GroupMemberModifyData2) => {
        dispatch(deleteMemberGroupAsync.request(groupMemberModifyData))
        navigate(`/timer`)
    }

    const onAddGroupMemberSubmit = (groupMemberModifyData: GroupMemberModifyData) => {
        dispatch(addMemberGroupAsync.request(groupMemberModifyData))
    }

    const onMemberDeleteByLeaderSubmit = (groupMemberModifyData: GroupMemberModifyData2) => {
        dispatch(deleteMemberGroupAsync.request(groupMemberModifyData))
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'end',
                    height: '9%',
                }}
            >
                <Button
                    sx={{
                        fontSize: '24px',
                        color: (theme) => theme.colors.greenText,
                        mx: '0.8vw',
                        borderRadius: '0px',
                    }}
                    variant="text"
                    color="success"
                    onClick={onClickToGroup}
                >
                    GROUP
                </Button>
                <Button
                    sx={{
                        fontSize: '24px',
                        color: (theme) => theme.colors.greenText,
                        mx: '0.8vw',
                        borderRadius: '0px',
                    }}
                    variant="text"
                    color="success"
                    onClick={onClickToGroupTodo}
                >
                    BOARD
                </Button>
                <Button
                    sx={{
                        fontSize: '24px',
                        color: (theme) => theme.colors.greenText,
                        mx: '0.8vw',
                        borderRadius: '0px',
                        mb: '2px',
                    }}
                    variant="text"
                    color="success"
                    onClick={onClickToGroupAnalysis}
                >
                    ANALYSIS
                </Button>
                <Button
                    sx={{
                        fontSize: '24px',
                        color: (theme) => theme.colors.greenText,
                        mx: '0.8vw',
                        borderBottom: (theme) => `2px solid ${theme.colors.greenText}`,
                        borderRadius: '0px',
                        mb: '2px',
                    }}
                    variant="text"
                    color="success"
                >
                    SETTING
                </Button>
                <OnTimer
                    userList={userList}
                    getUserList={getUserList}
                />
            </Box>

            <Box
                sx={{
                    justifyContent: 'center',
                    pt: 5,
                    mx: 20
                }}>
                {userInfo !== null && group !== null && userInfo.email === group.leaderEmail &&
                    <h1>그룹 관리</h1>
                }
                {userInfo !== null && group !== null && userInfo.email === group.leaderEmail &&
                    <GroupModify
                        group={group}
                        onGroupModifySubmit={onGroupModifySubmit}
                    />
                }
                <GroupMemberSetting
                    group={group}
                    onAddGroupMemberSubmit={onAddGroupMemberSubmit}
                    onMemberDeleteByLeaderSubmit={onMemberDeleteByLeaderSubmit}
                />
                {userInfo !== null && userInfo.email !== group?.leaderEmail &&
                    <MemberDelete
                        openMemberDeleteForm={openMemberDeleteForm}
                    />
                }
                <MemberDeleteForm
                    group={group}
                    isOpenMemberDeleteForm={isOpenMemberDeleteForm}
                    closeMemberDeleteForm={closeMemberDeleteForm}
                    onMemberDeleteSubmit={onMemberDeleteSubmit}
                />
                {userInfo !== null && group !== null && userInfo.email === group.leaderEmail &&
                    <GroupDelete
                        group={group}
                        openGroupDeleteForm={openGroupDeleteForm}
                    />
                }
                <GroupDeleteForm
                    group={group}
                    isOpenGroupDeleteForm={isOpenGroupDeleteForm}
                    closeGroupDeleteForm={closeGroupDeleteForm}
                    onGroupDeleteSubmit={onGroupDeleteSubmit}
                />
            </Box>
        </>
    )
}

export default GroupSettingsContainer