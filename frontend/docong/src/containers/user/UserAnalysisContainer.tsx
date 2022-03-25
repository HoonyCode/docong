import { Box, Button, Tab, Tabs } from '@mui/material'
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

  const onClickToTodos = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate('/user/todo')
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
            mb: '2px',
          }}
          variant="text"
          color="success"
          onClick={onClickToTodos}
        >
          BOARD
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
          onClick={(e: any) => e.preventDefault()}
        >
          ANALYSIS
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mx: '5vw',
          my: '5vh',
        }}
      >
        <UserAnalysis openEditUserForm={openEditUserForm} />
      </Box>
      <EditUserForm
        isOpenEditUserForm={isOpenEditUserForm}
        closeEditUserForm={closeEditUserForm}
        editUser={editUser}
      />
    </>
  )
}

export default UserAnalysisContainer
