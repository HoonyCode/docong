import { Box, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { GroupModifyData, JiraData } from '../../api/group';
import { deleteGroupAsync, modifyGroupAsync, modifyJiraInfoAsync } from '../../modules/group';
import { useDispatch } from 'react-redux';
import GroupModify from '../../components/group/GroupModify';
import GroupDelete from '../../components/group/GroupDelete';
import GroupDeleteForm from '../../components/group/GroupDeleteForm';
import { useState } from 'react';

function GroupSettingsContainer() {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    const groupSeq = Number(params.groupSeq)

    const [isOpenGroupDeleteForm, setIsOpenGroupDeleteForm] = useState(false)

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
        console.log("container -> ", groupModifyData)
        dispatch(modifyGroupAsync.request(groupModifyData))
    }

    const openGroupDeleteForm = () => {
        setIsOpenGroupDeleteForm(true)
    }

    const closeGroupDeleteForm = () => {
        setIsOpenGroupDeleteForm(false)
    }

    const onGroupDeleteSubmit = (team_id: number) => {
        dispatch(deleteGroupAsync.request(team_id))
        navigate(`/timer`)
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
                    onClick={(e: any) => e.prebentDefault()}
                >
                    SETTING
                </Button>
            </Box>
            <h1>그룹 관리</h1>
            <GroupModify onGroupModifySubmit={onGroupModifySubmit} />
            <GroupDelete openGroupDeleteForm={openGroupDeleteForm} />
            <GroupDeleteForm
                groupSeq={groupSeq}
                isOpenGroupDeleteForm={isOpenGroupDeleteForm}
                closeGroupDeleteForm={closeGroupDeleteForm}
                onGroupDeleteSubmit={onGroupDeleteSubmit}
            />
        </>
    )
}

export default GroupSettingsContainer