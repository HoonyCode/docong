import styled from 'styled-components'
import { Avatar, Box } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { darken } from 'polished'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../modules'
import { useLocation, useNavigate } from 'react-router-dom'
import EditUserForm from '../components/user/EditUserForm'
import { UserData } from '../api/user'
import { setUserInfoAsync } from '../modules/user'
import { useState } from 'react'

const LogoImage = styled.img`
  height: 90px;
  cursor: pointer;
`

function NavBarContainer() {
  const userInfo = useSelector((state: RootState) => state.user.userInfo.data)
  const userTimer = useSelector((state: RootState) => state.user.userTimer)
  const [isOpenEditUserForm, setIsOpenEditUserForm] = useState(false)
  const location = useLocation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const tierList = [
    '한콩',
    '두콩',
    '세콩',
    '네콩',
    '완두콩',
    '투두콩',
    '쓰리두콩',
    '포두콩',
    '콩나무',
  ]

  const onClickToTimer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (location.pathname !== '/timer') {
      navigate('/timer')
    }
  }

  const onClickToUserTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate('/user/todo')
  }

  const onClickToExtension = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.open(
      'https://chrome.google.com/webstore/detail/docong/bfbkmincjfmfbnhghkbkjgnpocnjpinl'
    )
  }

  const onClickProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate('/user/analysis')
  }

  const onClickLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (userTimer.status === 'play') {
      alert('타이머 진행중에는 로그아웃이 불가능합니다.')
    } else {
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('persist:root')
      navigate('/')
    }
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
          height: '130px',
        }}
      >
        <LogoImage
          alt="Docong Logo"
          src="/images/Docong_Logo.png"
          onClick={(e: any) => onClickToTimer(e)}
        />
      </Box>
      <Box
        sx={[
          {
            display: 'flex',
            justifyContent: 'space-between',
            mt: '6vh',
            mb: '1vh',
            height: '50px',
            fontSize: '25px',
            cursor: 'pointer',
            '&:hover': {
              background: (theme) => `${darken(0.1, theme.colors.navBg)}`,
            },
            '&:active': {
              background: (theme) => `${darken(0.25, theme.colors.navBg)}`,
            },
          },
          location.pathname === '/timer' && {
            background: (theme) => `${darken(0.1, theme.colors.navBg)}`,
          },
        ]}
        onClick={(e: any) => onClickToTimer(e)}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            pl: '40px',
            color: (theme) => theme.colors.greenText,
          }}
        >
          TIMER
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            pr: '40px',
            color: (theme) => theme.colors.greenText,
          }}
        >
          <ArrowForwardIosIcon />
        </Box>
      </Box>
      <Box
        sx={[
          {
            display: 'flex',
            justifyContent: 'space-between',
            mb: '1.5vh',
            height: '50px',
            fontSize: '25px',
            cursor: 'pointer',
            '&:hover': {
              background: (theme) => `${darken(0.1, theme.colors.navBg)}`,
            },
            '&:active': {
              background: (theme) => `${darken(0.25, theme.colors.navBg)}`,
            },
          },
          (location.pathname === '/user/todo' ||
            location.pathname === '/user/analysis') && {
            background: (theme) => `${darken(0.1, theme.colors.navBg)}`,
          },
        ]}
        onClick={(e: any) => onClickToUserTodo(e)}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            pl: '40px',
            color: (theme) => theme.colors.greenText,
          }}
        >
          내 To Do
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            pr: '40px',
            color: (theme) => theme.colors.greenText,
          }}
        >
          <ArrowForwardIosIcon />
        </Box>
      </Box>
      <Box sx={{ px: '40px', pb: '30px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '25px',
            color: (theme) => theme.colors.greenText,
          }}
        >
          GROUP (개발중)
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: '60px',
          height: '40px',
          fontSize: '16px',
          cursor: 'pointer',
          '&:hover': {
            background: (theme) => `${darken(0.1, theme.colors.navBg)}`,
          },
          '&:active': {
            background: (theme) => `${darken(0.25, theme.colors.navBg)}`,
          },
        }}
        onClick={(e: any) => onClickProfile(e)}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            pl: '40px',
            color: (theme) => theme.colors.greenText,
          }}
        >
          두콩 랭킹
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            pr: '40px',
            color: (theme) => theme.colors.greenText,
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: '15px',
          height: '40px',
          fontSize: '16px',
          cursor: 'pointer',
          '&:hover': {
            background: (theme) => `${darken(0.1, theme.colors.navBg)}`,
          },
          '&:active': {
            background: (theme) => `${darken(0.25, theme.colors.navBg)}`,
          },
        }}
        onClick={(e: any) => onClickToExtension(e)}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            pl: '40px',
            color: (theme) => theme.colors.greenText,
          }}
        >
          탭 제어 활용하기
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            pr: '40px',
            color: (theme) => theme.colors.greenText,
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          px: '40px',
          py: '5px',
          fontSize: '28px',
          fontWeight: 'bold',
          color: (theme) => theme.colors.greenText,
          cursor: 'pointer',
          '&:hover': {
            background: (theme) => `${darken(0.1, theme.colors.navBg)}`,
          },
          '&:active': {
            background: (theme) => `${darken(0.25, theme.colors.navBg)}`,
          },
        }}
        onClick={(e: any) => onClickProfile(e)}
      >
        <Box sx={{ width: '50px', alignSelf: 'top' }}>
          <Avatar
            sx={{ width: 40, height: 40, boxShadow: 2, mr: '10px' }}
            alt="User"
            src={
              userInfo && userInfo.image
                ? userInfo.image
                : '/images/Profile_Default.jpg'
            }
          />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ display: 'inline-block', alignSelf: 'top' }}>
            {`${userInfo ? userInfo.name : ''}님`}
            <Box sx={{ display: 'inline-block' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignSelf: 'center',
                  p: '4px',
                  ml: '5px',
                  borderRadius: '8px',
                  background: '#f4fce3',
                  boxShadow: 1,
                }}
              >
                <Avatar
                  sx={{
                    height: '24px',
                    width: 'auto',
                    alignSelf: 'center',
                    mr: '5px',
                  }}
                  variant="square"
                  src={
                    userInfo && userInfo.tier
                      ? `/images/tier_${
                          tierList.indexOf(userInfo.tier) + 1
                        }.png`
                      : '/images/tier_1.png'
                  }
                />
                <Box
                  sx={{
                    fontSize: '20px',
                    color: (theme) => theme.colors.greenText,
                    alignSelf: 'center',
                  }}
                >
                  {userInfo && userInfo.tier ? userInfo.tier : '한콩'}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            ml: '90px',
            height: '25px',
            fontSize: '16px',
            color: (theme) => theme.colors.greenText,
            cursor: 'pointer',
            '&:hover': {
              background: (theme) => `${darken(0.1, theme.colors.navBg)}`,
            },
            '&:active': {
              background: (theme) => `${darken(0.25, theme.colors.navBg)}`,
            },
          }}
          onClick={openEditUserForm}
        >
          {userInfo && userInfo.birth ? '정보수정' : '추가정보 입력'}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            ml: '15px',
            height: '25px',
            fontSize: '16px',
            color: (theme) => theme.colors.greenText,
            cursor: 'pointer',
            '&:hover': {
              background: (theme) => `${darken(0.1, theme.colors.navBg)}`,
            },
            '&:active': {
              background: (theme) => `${darken(0.25, theme.colors.navBg)}`,
            },
          }}
          onClick={(e: any) => onClickLogout(e)}
        >
          로그아웃
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

export default NavBarContainer
