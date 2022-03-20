import { Button } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TodoInput } from '../../api/todo'
import UserTodo from '../../components/user/UserTodo'
import { RootState } from '../../modules'
import {
  deleteTodoAsync,
  findUserTodosAsync,
  modifyTodoAsync,
  modifyTodoStatusAsync,
  saveTodoAsync,
} from '../../modules/todo'

function UserTodoContainer() {
  const userTodos = useSelector((state: RootState) => state.todo.userTodos.data)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // useEffect 수정하기
  useEffect(() => {
    findUserTodos()
  }, [])

  const onClickToTimer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate('/')
  }

  const onClickLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('persist:root')
    navigate('/login')
  }

  const createTodo = (todoInput: TodoInput) => {
    dispatch(saveTodoAsync.request(todoInput))
  }

  const modifyTodo = (todoId: number, todoInput: TodoInput) => {
    dispatch(modifyTodoAsync.request({ todoId: todoId, todoInput: todoInput }))
  }

  const deleteTodo = (todoId: number) => {
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
      <Button variant="outlined" onClick={onClickToTimer}>
        Timer
      </Button>
      <Button variant="outlined" onClick={onClickLogout}>
        Logout
      </Button>
      <UserTodo
        userTodos={userTodos}
        createTodo={createTodo}
        modifyTodo={modifyTodo}
        deleteTodo={deleteTodo}
        modifyTodoStatus={modifyTodoStatus}
      />
    </>
  )
}

export default UserTodoContainer
