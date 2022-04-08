import { Box, Button, Divider } from '@mui/material'
import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserData } from '../../api/user'
import EditUserForm from '../../components/user/EditUserForm'
import UserCategoryAnalysis from '../../components/user/UserCategoryAnalysis'
import UserPomoCountAnalysis from '../../components/user/UserPomoCountAnalysis'
import { RootState } from '../../modules'
import {
  getUserAllDateAnalysisAsync,
  getUserPomoCountAsync,
  getUserTimeAnalysisAsync,
  getWorkTypeAnalysisAsync,
  setUserInfoAsync,
} from '../../modules/user'
import UserTimeCountAnalysis from '../../components/user/UserTimeCountAnalysis'
import UserAllDateCountAnalysis from '../../components/user/UserAllDateCountAnalysis'

function UserAnalysisContainer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userInfo = useSelector((state: RootState) => state.user.userInfo.data)
  const workTypeAnalysis = useSelector((state: RootState) =>
    state.user.workTypeAnalysis ? state.user.workTypeAnalysis.data : null
  )
  const userPomoCountAnalysis = useSelector((state: RootState) =>
    state.user.userPomoCountAnalysis
      ? state.user.userPomoCountAnalysis.data
      : null
  )
  const userTimeAnalysis = useSelector((state: RootState) =>
    state.user.userTimeAnalysis ? state.user.userTimeAnalysis.data : null
  )
  const userAllDateAnalysis = useSelector((state: RootState) =>
    state.user.userAllDateAnalysis ? state.user.userAllDateAnalysis.data : null
  )
  const [isOpenEditUserForm, setIsOpenEditUserForm] = useState(false)

  useEffect(() => {
    dispatch(getWorkTypeAnalysisAsync.request(null))
    dispatch(getUserPomoCountAsync.request(null))
    dispatch(getUserTimeAnalysisAsync.request(null))
    dispatch(getUserAllDateAnalysisAsync.request(new Date().getFullYear()))
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
            fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
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
          ANALYSIS
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          height: '90%',
          px: '3vw',
          pt: '3vh',
          pb: '5vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            flexGrow: 1,
            overflow: 'overlay',
            '> div': { width: '100%' },
            '::-webkit-scrollbar': {
              width: '0px',
            },
            '::-webkit-scrollbar-thumb': {
              backgroundColor: '#8a9788',
              borderRadius: '8px',
              backgroundClip: 'padding-box',
              border: '1px solid transparent',
            },
            '::-webkit-scrollbar-track': {
              backgroundColor: '#c4c4c4',
              borderRadius: '8px',
              boxShadow: 'inset 0px 0px 5px white',
            },
            '&:hover': {
              '::-webkit-scrollbar': {
                width: '8px',
              },
            },
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
          {userInfo && userInfo.birth && (
            <Box sx={{ px: '2vw', py: '1vh' }}>
              <Box
                sx={{
                  boxShadow: 2,
                  width: '100%',
                  height: '17vw',
                  p: '20px',
                  mb: '1.5vw',
                  borderRadius: '8px',
                }}
              >
                <Box sx={{ textAlign: 'center', fontSize: '1.8vw' }}>
                  두콩밭
                </Box>
                <Divider sx={{ my: '0.3vw' }} variant="middle" />
                <UserAllDateCountAnalysis
                  userAllDateAnalysis={userAllDateAnalysis}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: '1.5vw',
                }}
              >
                <Box
                  sx={{
                    boxShadow: 2,
                    width: '49%',
                    height: '21vw',
                    p: '20px',
                    borderRadius: '8px',
                  }}
                >
                  <Box
                    sx={{ textAlign: 'center', fontSize: '1.6vw', mb: '1vw' }}
                  >
                    두콩 합계
                  </Box>
                  <UserPomoCountAnalysis
                    userPomoCountAnalysis={userPomoCountAnalysis}
                  />
                </Box>
                <Box
                  sx={{
                    boxShadow: 2,
                    width: '49%',
                    height: '21vw',
                    p: '20px',
                    borderRadius: '8px',
                  }}
                >
                  <Box
                    sx={{ textAlign: 'center', fontSize: '1.6vw', mb: '1vw' }}
                  >
                    시간대별 통계
                  </Box>
                  <UserTimeCountAnalysis userTimeAnalysis={userTimeAnalysis} />
                </Box>
              </Box>
              <Box sx={{ pb: '1vw' }}>
                <Box
                  sx={{
                    boxShadow: 2,
                    width: '100%',
                    height: '31vw',
                    p: '20px',
                    mb: '20px',
                    borderRadius: '8px',
                  }}
                >
                  <Box
                    sx={{ textAlign: 'center', fontSize: '1.6vw', mb: '1vw' }}
                  >
                    업무 카테고리 통계
                  </Box>
                  <UserCategoryAnalysis workTypeAnalysis={workTypeAnalysis} />
                </Box>
              </Box>
            </Box>
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
