import styled from 'styled-components'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { lighten, darken } from 'polished'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../modules'
import { useLocation, useNavigate } from 'react-router-dom'
import EditUserForm from '../components/user/EditUserForm'
import { UserData } from '../api/user'
import { setUserInfoAsync } from '../modules/user'
import { memo, useEffect, useState } from 'react'
import UserTierModal from '../components/user/UserTierModal'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { createGroupAsync, searchAllGroupAsync } from '../modules/group'
import { Group, GroupCreateData } from '../api/group'
import GroupCreateForm from '../components/group/GroupCreateForm'

const LogoImage = styled.img`
  height: 90px;
  cursor: pointer;
`

function NavBarContainer() {
  const userInfo = useSelector((state: RootState) => state.user.userInfo.data)
  const userTimer = useSelector((state: RootState) => state.user.userTimer)
  const groups = useSelector((state: RootState) => state.group.groups.data)
  const [isOpenEditUserForm, setIsOpenEditUserForm] = useState(false)
  const [isOpenTierModal, setIsOpenTierModal] = useState(false)
  const [isOpenCreateGroupForm, setIsOpenCreateGroupForm] = useState(false)
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

  useEffect(() => {
    searchAllGroup()
  }, [])

  const searchAllGroup = () => {
    dispatch(searchAllGroupAsync.request(null))
  }

  const onCreateGroupSubmit = (groupCreateData: GroupCreateData) => {
    dispatch(createGroupAsync.request(groupCreateData))
    setIsOpenCreateGroupForm(false)
  }

  const openGroupCreateForm = () => {
    setIsOpenCreateGroupForm(true)
  }

  const closeCreateGroupForm = () => {
    setIsOpenCreateGroupForm(false)
  }

  const moveGroupTodo = (groupSeq: number) => {
    navigate(`/group/todo/${groupSeq}`)
  }

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

  const onClickToRanking = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate('/ranking')
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

  const openTierModal = () => {
    setIsOpenTierModal(true)
  }

  const closeTierModal = () => {
    setIsOpenTierModal(false)
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
      <Box sx={{ px: '8px' }}>
        <Accordion
          sx={{
            pl: '30px',
            pr: '26px',
            backgroundColor: (theme) => theme.colors.navBg,
            boxShadow: 0,
          }}
        >
          <AccordionSummary
            sx={{ px: '0px' }}
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  width: '35px',
                  height: '35px',
                  color: (theme) => theme.colors.greenText,
                }}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '25px',
                color: (theme) => theme.colors.greenText,
              }}
            >
              GROUP
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              p: '0px 0px 0px 2px',
            }}
          >
            <Box
              sx={{
                overflow: 'overlay',
                maxHeight: '26vh',
                '@media (max-height: 800px)': {
                  maxHeight: '22vh',
                },
                p: '2px 10px 2px 2px',
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
              {groups &&
                groups.map((group: Group, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center',
                      height: '42px',
                      boxShadow: 2,
                      p: '5px 15px',
                      mb: '1vh',
                      fontSize: '20px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      '&:hover': {
                        background: (theme) =>
                          `${darken(0.05, theme.colors.navBg)}`,
                      },
                      '&:active': {
                        background: (theme) =>
                          `${darken(0.1, theme.colors.navBg)}`,
                      },
                    }}
                    onClick={() => {
                      moveGroupTodo(group.teamSeq)
                    }}
                  >
                    {group.name}
                  </Box>
                ))}
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '30px',
                boxShadow: 2,
                p: '5px 15px 5px 0px',
                m: '2px 10px 1vh 2px',
                fontSize: '16px',
                borderRadius: '10px',
                cursor: 'pointer',
                '&:hover': {
                  background: (theme) => `${darken(0.05, theme.colors.navBg)}`,
                },
                '&:active': {
                  background: (theme) => `${darken(0.1, theme.colors.navBg)}`,
                },
              }}
              onClick={openGroupCreateForm}
            >
              + 그룹 생성
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: '3vh',
          height: '40px',
          fontSize: '16px',
          cursor: 'pointer',
          '&:hover': {
            background: (theme) => `${darken(0.1, theme.colors.navBg)}`,
          },
          '&:active': {
            background: (theme) => `${darken(0.25, theme.colors.navBg)}`,
          },
          '@media (max-height: 800px)': {
            mt: '0.5vh',
          },
        }}
        onClick={(e: any) => onClickToRanking(e)}
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
        }}
      >
        <Box sx={{ width: '50px', alignSelf: 'top' }}>
          <Avatar
            sx={{ width: 40, height: 40, boxShadow: 2, mr: '10px' }}
            alt="User"
            src={
              userInfo && userInfo.image
                ? userInfo.image
                : '/images/Profile_Default.png'
            }
          />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ display: 'inline-block', alignSelf: 'top' }}>
            <Box
              sx={{
                display: 'inline',
                cursor: 'pointer',
                '&:hover': {
                  color: (theme) => `${lighten(0.1, theme.colors.greenText)}`,
                },
                '&:active': {
                  color: (theme) => `${darken(0.1, theme.colors.greenText)}`,
                },
              }}
              onClick={(e: any) => onClickProfile(e)}
            >{`${userInfo ? userInfo.name : ''}님`}</Box>
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
                  cursor: 'pointer',
                  '&:hover': {
                    background: `${darken(0.1, '#f4fce3')}`,
                  },
                  '&:active': {
                    background: `${darken(0.25, '#f4fce3')}`,
                  },
                }}
                onClick={openTierModal}
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
      <UserTierModal
        isOpenTierModal={isOpenTierModal}
        closeTierModal={closeTierModal}
      />
      <GroupCreateForm
        isOpenGroupCreateForm={isOpenCreateGroupForm}
        closeGroupCreateForm={closeCreateGroupForm}
        onCreateGroupSubmit={onCreateGroupSubmit}
      />
    </>
  )
}

export default memo(NavBarContainer)
