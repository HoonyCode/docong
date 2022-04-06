import { Box, Button, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Group } from '../../api/group'
import { GroupTodo, GroupTodoInput } from '../../api/groupTodo'
import GroupTodoComponent from '../../components/group/GroupTodoComponent'
import { RootState } from '../../modules'
import {
  deleteGroupTodoAsync,
  findAllGroupTodosAsync,
  modifyGroupTodoAsync,
  saveGroupTodoAsync,
} from '../../modules/groupTodo'
import { modifyTodoStatusAsync } from '../../modules/todo'
import { changeUserTimerTodo } from '../../modules/user'
import { getUserListDataAsync } from '../../modules/group'
import OnTimer from '../../components/group/OnTimer'
import useInterval from '@use-it/interval'

function GroupTodoContainer() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const [groupSeq, setGroupSeq] = useState(Number(params.groupSeq))
  //   const groupSeq = Number(params.groupSeq)
  const groups = useSelector((state: RootState) => state.group.groups.data)
  const groupTodos = useSelector(
    (state: RootState) => state.groupTodo.groupTodos.data
  )
  const userList = useSelector((state: RootState) => state.group.userList.data)
  const [group, setGroup] = useState<null | Group>(null)

  useEffect(() => {
    if (groups != null) {
      const matchGroup = groups.find((g) => g.teamSeq === groupSeq)
      setGroup({
        teamSeq: matchGroup ? matchGroup.teamSeq : 0,
        jiraApiToken: matchGroup ? matchGroup.jiraApiToken : '',
        jiraDomain: matchGroup ? matchGroup.jiraDomain : '',
        jiraProjectKey: matchGroup ? matchGroup.jiraProjectKey : '',
        jiraUserId: matchGroup ? matchGroup.jiraUserId : '',
        userList: matchGroup ? matchGroup.userList : null,
        name: matchGroup ? matchGroup.name : '',
        leaderEmail: matchGroup ? matchGroup.leaderEmail : '',
      })
    }
  }, [groups, groupSeq])

  useEffect(() => {
    setGroupSeq(Number(params.groupSeq))
  }, [params.groupSeq])

  // useEffect(() => {
  //   findGroupTodos()
  //   getUserList()
  // }, [groupSeq])

  useInterval(() => {
    findGroupTodos()
    getUserList()
  }, 5000)

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
    dispatch(
      modifyGroupTodoAsync.request({
        todoId: todoId,
        groupTodoInput: groupTodoInput,
      })
    )
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
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'end',
          height: '10%',
        }}
      >
        <Grid item xs={3}></Grid>
        <Grid item xs={6} sx={{ textAlign: 'center' }}>
          <Button
            sx={{
              fontSize: '20px',
              fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
              color: (theme) => theme.colors.greenText,
              mx: '0.8vw',
              borderBottom: (theme) => `2px solid ${theme.colors.greenText}`,
              borderRadius: '0px',
            }}
            variant="text"
            color="success"
            onClick={(e: any) => e.preventDefault()}
          >
            BOARD
          </Button>
          <Button
            sx={{
              fontSize: '20px',
              fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
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
              fontSize: '20px',
              fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
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
        </Grid>
        <Grid item xs={3} sx={{ pr: '5vw' }}>
          <OnTimer userList={userList} getUserList={getUserList} />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '90%',
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
