import { Box, Button } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { GroupTodo, GroupTodoInput } from '../../api/groupTodo'
import GroupTodoComponent from '../../components/group/GroupTodoComponent'
import { RootState } from '../../modules'
import { deleteGroupTodoAsync, findAllGroupTodosAsync, modifyGroupTodoAsync, saveGroupTodoAsync } from '../../modules/groupTodo'
import { modifyTodoStatusAsync } from '../../modules/todo'
import { changeUserTimerTodo } from '../../modules/user'

function GroupTodoContainer() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const groupSeq = Number(params.groupSeq)

    const groupTodos = useSelector((state: RootState) => state.groupTodo.groupTodos.data)

    useEffect(() => {
        findGroupTodos()
    }, [])

    const findGroupTodos = () => {
        dispatch(findAllGroupTodosAsync.request(groupSeq))
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

    const deleteTodo = (todoId: any) => {
        dispatch(deleteGroupTodoAsync.request(todoId))
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
                    onClick={(e: any) => e.prebentDefault()}
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