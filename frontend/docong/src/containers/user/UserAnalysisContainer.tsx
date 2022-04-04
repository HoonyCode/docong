import { Box, Button, Tab, Tabs } from '@mui/material'
import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserData } from '../../api/user'
import EditUserForm from '../../components/user/EditUserForm'
import UserCategoryAnalysis from '../../components/user/UserCategoryAnalysis'
import UserPomoCountAnalysis from '../../components/user/UserPomoCountAnalysis'
import UserRanking from '../../components/user/UserRanking'
import { RootState } from '../../modules'
import {
  getRankingListAsync,
  getUserInfoAsync,
  getUserPomoCountAsync,
  getWorkTypeAnalysisAsync,
  setUserInfoAsync,
} from '../../modules/user'
import Masonry from '@mui/lab/Masonry'

function UserAnalysisContainer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userInfo = useSelector((state: RootState) => state.user.userInfo.data)
  const rankingList = useSelector((state: RootState) =>
    state.user.rankingList ? state.user.rankingList.data : null
  )
  const workTypeAnalysis = useSelector((state: RootState) =>
    state.user.workTypeAnalysis ? state.user.workTypeAnalysis.data : null
  )
  const userPomoCountAnalysis = useSelector((state: RootState) =>
    state.user.userPomoCountAnalysis
      ? state.user.userPomoCountAnalysis.data
      : null
  )
  const [isOpenEditUserForm, setIsOpenEditUserForm] = useState(false)
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    dispatch(getUserInfoAsync.request(null))
  }, [])

  useEffect(() => {
    if (tabValue === 0) {
      dispatch(getRankingListAsync.request(null))
    } else if (tabValue === 1) {
      dispatch(getWorkTypeAnalysisAsync.request(null))
      dispatch(getUserPomoCountAsync.request(null))
    }
  }, [tabValue])

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
          height: '10%',
        }}
      >
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
          onClick={onClickToTodos}
        >
          BOARD
        </Button>
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
          ANALYSIS
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          height: '90%',
          px: '2vw',
          pt: '3vh',
          pb: '5vh',
        }}
      >
        <Box sx={{ width: '200px', borderRight: '1px solid lightGray' }}>
          <Tabs
            orientation="vertical"
            value={tabValue}
            onChange={onChangeTab}
            aria-label="Analysis Tabs"
            color="success"
            sx={{ mt: '2vh' }}
          >
            <Tab sx={{ fontSize: '16px' }} label="두콩 랭킹" />
            <Tab sx={{ fontSize: '16px' }} label="사용자 통계" />
          </Tabs>
        </Box>
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
            pl: '1vw',
            '> div': { width: '100%' },
          }}
        >
          {userInfo && !userInfo.birth && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
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
                를 입력하시면 사용 통계를 확인할 수 있습니다.
              </Box>
            </Box>
          )}
          {userInfo && userInfo.birth && tabValue === 0 && (
            <UserRanking rankingList={rankingList} />
          )}
          {userInfo && userInfo.birth && tabValue === 1 && (
            <Masonry
              sx={{ height: '100%', width: '100%' }}
              columns={2}
              spacing={3}
            >
              <Box
                sx={{
                  boxShadow: 3,
                  width: '50%',
                  height: '50%',
                  p: '15px',
                  borderRadius: '8px',
                }}
              >
                <Box sx={{ textAlign: 'center', fontSize: '20px' }}>
                  업무 카테고리 통계
                </Box>
                <UserCategoryAnalysis workTypeAnalysis={workTypeAnalysis} />
              </Box>
              <Box
                sx={{
                  boxShadow: 3,
                  width: '50%',
                  height: '40%',
                  p: '15px',
                  borderRadius: '8px',
                }}
              >
                <Box sx={{ textAlign: 'center', fontSize: '20px' }}>
                  두콩 합계
                </Box>
                <UserPomoCountAnalysis
                  userPomoCountAnalysis={userPomoCountAnalysis}
                />
              </Box>
            </Masonry>
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

export default memo(UserAnalysisContainer)
