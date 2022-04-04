import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Group, MemberData } from '../../api/group'
import { GroupTodo, GroupTodoInput } from '../../api/groupTodo'
import GroupTodoComponent from '../../components/group/GroupTodoComponent'
import { RootState } from '../../modules'
import { deleteGroupTodoAsync, findAllGroupTodosAsync, modifyGroupTodoAsync, saveGroupTodoAsync } from '../../modules/groupTodo'
import { modifyTodoStatusAsync } from '../../modules/todo'
import { changeUserTimerTodo } from '../../modules/user'
import produce from 'immer'
import { getUserListDataAsync } from '../../modules/group'

function GroupTodoContainer() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const groupSeq = Number(params.groupSeq)
    const groups = useSelector((state: RootState) => state.group.groups.data)
    const groupTodos = useSelector((state: RootState) => state.groupTodo.groupTodos.data)
    const userList = useSelector((state: RootState) => state.group.userList)
    const [group, setGroup] = useState<null | Group>(null)

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

    useEffect(() => {
        findGroupTodos()
        getUserList()
    }, [])

    const findGroupTodos = () => {
        dispatch(findAllGroupTodosAsync.request(groupSeq))
    }
    
    const getUserList = () => {
        dispatch(getUserListDataAsync.request(groupSeq))
    }

    const onClickToGroupAnalysis = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        navigate(`/group/analysis/${groupSeq}`)
    }

    const onClickToGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        navigate(`/group`)
    }

    const onClickToGroupSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        navigate(`/group/settings/${groupSeq}`)
    }

    const createTodo = (groupTodoInput: GroupTodoInput) => {
        dispatch(saveGroupTodoAsync.request(groupTodoInput))
    }

    const startTodoTimer = (selectedGroupTodo: GroupTodo) => {
        dispatch(changeUserTimerTodo(selectedGroupTodo))
        navigate('/timer')
    }

    const modifyTodo = (todoId: number, groupTodoInput: GroupTodoInput) => {
        dispatch(modifyGroupTodoAsync.request({ todoId: todoId, groupTodoInput: groupTodoInput }))
    }

    const deleteTodo = async (todoId: any) => {
        await dispatch(deleteGroupTodoAsync.request(todoId))
        await dispatch(findAllGroupTodosAsync.request(groupSeq))
    }

    const modifyTodoStatus = (todoId: number, todoStatus: string) => {
        dispatch(
            modifyTodoStatusAsync.request({
                todoId: todoId,
                todoStatus: { todoStatus: todoStatus },
            })
        )
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
                            borderBottom: (theme) => `2px solid ${theme.colors.greenText}`,
                            borderRadius: '0px',
                        }}
                        variant="text"
                        color="success"
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
                            borderRadius: '0px',
                            mb: '2px',
                        }}
                        variant="text"
                        color="success"
                        onClick={onClickToGroupSettings}
                    >
                        SETTING
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '91%',
                    mb: '3vh',
                }}
            >
                <GroupTodoComponent
                    group={group}
                    groupSeq={groupSeq}
                    groupTodos={groupTodos}
                    createTodo={createTodo}
                    modifyTodo={modifyTodo}
                    deleteTodo={deleteTodo}
                    modifyTodoStatus={modifyTodoStatus}
                    startTodoTimer={startTodoTimer}
                />
            </Box>
        </>
    )
}

export default GroupTodoContainer