import { Box, Button, Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserData } from '../../api/user'
import EditUserForm from '../../components/user/EditUserForm'
import UserInfo from '../../components/user/UserInfo'
import UserRanking from '../../components/user/UserRanking'
import { RootState } from '../../modules'
import { getRankingListAsync, setUserInfoAsync } from '../../modules/user'

function UserAnalysisContainer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userInfo = useSelector((state: RootState) => state.user.userInfo.data)
  const rankingList = useSelector((state: RootState) =>
    state.user.rankingList ? state.user.rankingList.data : null
  )
  const [isOpenEditUserForm, setIsOpenEditUserForm] = useState(false)
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    if (tabValue === 0) {
      console.log(userInfo)
      dispatch(getRankingListAsync.request(null))
    }
  }, [])

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

  const onChangeTab = (e: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      dispatch(getRankingListAsync.request(null))
    }
    setTabValue(newValue)
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
          height: '91%',
          px: '5vw',
          pt: '3vh',
          pb: '5vh',
        }}
      >
        <Box sx={{ width: '250px', borderRight: '1px solid lightGray' }}>
          <UserInfo userInfo={userInfo} openEditUserForm={openEditUserForm} />
          <Tabs
            orientation="vertical"
            value={tabValue}
            onChange={onChangeTab}
            aria-label="Analysis Tabs"
            color="success"
            sx={{ mt: '2vh' }}
          >
            <Tab sx={{ fontSize: '16px' }} label="Ranking" />
            <Tab sx={{ fontSize: '16px' }} label="준비중" disabled />
          </Tabs>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
            pl: '1vw',
          }}
        >
          {userInfo && !userInfo.birth && (
            <>
              <Box
                sx={{
                  fontSize: '20px ',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: (theme) => theme.colors.greenText,
                  textDecoration: 'underline',
                }}
                onClick={openEditUserForm}
              >
                추가 정보
              </Box>
              <Box sx={{ fontSize: '20px' }}>
                를 입력하시면 순위를 확인할 수 있습니다.
              </Box>
            </>
          )}
          {userInfo && userInfo.birth && tabValue === 0 && (
            <UserRanking rankingList={rankingList} />
          )}
        </Box>
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
