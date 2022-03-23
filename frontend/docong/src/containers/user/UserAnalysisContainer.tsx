import { Button } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserData } from '../../api/user'
import EditUserForm from '../../components/user/EditUserForm'
import UserAnalysis from '../../components/user/UserAnalysis'
import { setUserInfoAsync } from '../../modules/user'

function UserAnalysisContainer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isOpenEditUserForm, setIsOpenEditUserForm] = useState(false)

  const onClickToTimer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate('/timer')
  }

  const onClickToTodos = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate('/user/todo')
  }

  const onClickLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('persist:root')
    navigate('/')
  }

  const openEditUserForm = () => {
    setIsOpenEditUserForm(true)
  }

  const closeEditUserForm = () => {
    setIsOpenEditUserForm(false)
  }

  const editUser = (userData: UserData) => {
    dispatch(setUserInfoAsync.request(userData))
    setIsOpenEditUserForm(false)
  }

  return (
    <>
      <Button variant="outlined" onClick={onClickToTimer}>
        Timer
      </Button>
      <Button variant="outlined" onClick={onClickToTodos}>
        Todo
      </Button>
      <Button variant="outlined" onClick={onClickLogout}>
        Logout
      </Button>
      <UserAnalysis openEditUserForm={openEditUserForm} />
      <EditUserForm
        isOpenEditUserForm={isOpenEditUserForm}
        closeEditUserForm={closeEditUserForm}
        editUser={editUser}
      />
    </>
  )
}

export default UserAnalysisContainer
