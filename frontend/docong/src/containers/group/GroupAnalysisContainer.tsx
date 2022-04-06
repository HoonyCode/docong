import { Box, Button, Divider, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { UserData } from '../../api/user'
import OnTimer from '../../components/group/OnTimer'
import UserAllDateCountAnalysis from '../../components/user/UserAllDateCountAnalysis'
import UserTimeCountAnalysis from '../../components/user/UserTimeCountAnalysis'
import { RootState } from '../../modules'
import {
  getGroupAllDateAnalysisAsync,
  getGroupRankingListAsync,
  getGroupTimeAnalysisAsync,
  getUserListDataAsync,
} from '../../modules/group'
import { setUserInfoAsync } from '../../modules/user'
import UserRanking from '../../components/user/UserRanking'

function GroupAnalysisContainer() {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()

  const groupSeq = Number(params.groupSeq)
  const userInfo = useSelector((state: RootState) => state.user.userInfo.data)
  const userList = useSelector((state: RootState) => state.group.userList.data)

  const groupAllDateAnalysis = useSelector((state: RootState) =>
    state.group.groupAllDateAnalysis
      ? state.group.groupAllDateAnalysis.data
      : null
  )

  const rankingList = useSelector((state: RootState) =>
    state.group.rankingList ? state.group.rankingList.data : null
  )

  const groupTimeAnalysis = useSelector((state: RootState) =>
    state.group.groupTimeAnalysis ? state.group.groupTimeAnalysis.data : null
  )

  const groupAllDateInput = {
    year: new Date().getFullYear(),
    groupSeq: groupSeq,
  }

  const [isOpenEditUserForm, setIsOpenEditUserForm] = useState(false)

  useEffect(() => {
    getUserList()
    dispatch(getGroupAllDateAnalysisAsync.request(groupAllDateInput))
    dispatch(getGroupRankingListAsync.request(groupSeq))
    dispatch(getGroupTimeAnalysisAsync.request(groupSeq))
  }, [])

  const getUserList = () => {
    dispatch(getUserListDataAsync.request(groupSeq))
  }

  const onClickToGroupTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate(`/group/todo/${groupSeq}`)
  }

  const onClickToGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate(`/group`)
  }

  const onClickToGroupSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate(`/group/settings/${groupSeq}`)
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
              borderRadius: '0px',
              mb: '2px',
            }}
            variant="text"
            color="success"
            onClick={onClickToGroupTodo}
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
            onClick={(e: any) => e.prebentDefault()}
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
                  userAllDateAnalysis={groupAllDateAnalysis}
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
                    두콩 랭킹
                  </Box>
                  <UserRanking rankingList={rankingList} />
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
                  <UserTimeCountAnalysis userTimeAnalysis={groupTimeAnalysis} />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  )
}

export default GroupAnalysisContainer
