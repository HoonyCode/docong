import { Box, Button } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Todo, TodoInput } from '../../api/todo'
import UserTodo from '../../components/user/UserTodo'
import { RootState } from '../../modules'
import {
  deleteTodoAsync,
  findUserTodosAsync,
  modifyTodoAsync,
  modifyTodoStatusAsync,
  saveTodoAsync,
} from '../../modules/todo'
import { changeUserTimerTodo } from '../../modules/user'

function UserTodoContainer() {
  const userTodos = useSelector((state: RootState) => state.todo.userTodos.data)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // useEffect 수정하기
  useEffect(() => {
    findUserTodos()
  }, [])

  const onClickToUserAnalysis = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate('/user/analysis')
  }

  const createTodo = (todoInput: TodoInput) => {
    dispatch(saveTodoAsync.request(todoInput))
  }

  const startTodoTimer = (selectedTodo: Todo) => {
    dispatch(changeUserTimerTodo(selectedTodo))
    navigate('/timer')
  }

  const modifyTodo = (todoId: number, todoInput: TodoInput) => {
    dispatch(modifyTodoAsync.request({ todoId: todoId, todoInput: todoInput }))
  }

  const deleteTodo = (todoId: any) => {
    dispatch(deleteTodoAsync.request(todoId))
  }

  const modifyTodoStatus = (todoId: number, todoStatus: string) => {
    dispatch(
      modifyTodoStatusAsync.request({
        todoId: todoId,
        todoStatus: { todoStatus: todoStatus },
      })
    )
  }

  const findUserTodos = () => {
    dispatch(findUserTodosAsync.request(null))
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'end',
          height: '10%',
        }}
      >
        <Button
          sx={{
            fontSize: '20px',
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
            color: (theme) => theme.colors.greenText,
            mx: '0.8vw',
            borderRadius: '0px',
            mb: '2px',
          }}
          variant="text"
          color="success"
          onClick={onClickToUserAnalysis}
        >
          ANALYSIS
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '90%',
          mb: '3vh',
        }}
      >
        <UserTodo
          userTodos={userTodos}
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

export default UserTodoContainer
