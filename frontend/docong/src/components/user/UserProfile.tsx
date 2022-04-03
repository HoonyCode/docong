import { Avatar, Box, Button } from '@mui/material'
import { memo } from 'react'
import { UserInfo } from '../../api/user'

interface UserProfileProps {
  userInfo: UserInfo | null
  openEditUserForm: () => void
}

function UserProfile({ userInfo, openEditUserForm }: UserProfileProps) {
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

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box sx={{ display: 'flex', p: '10px', height: '100px' }}>
        <Box sx={{ width: '60px', alignSelf: 'center' }}>
          <Avatar
            sx={{ width: 48, height: 48, boxShadow: 2 }}
            alt="User"
            src="/images/Profile_Default.jpg"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            alignSelf: 'center',
            fontSize: '32px',
            fontWeight: 'bold',
            color: (theme) => theme.colors.basicText,
            ml: '4px',
          }}
        >
          <div>{userInfo ? userInfo.name : ''}</div>
          <Box
            sx={{
              display: 'flex',
              alignSelf: 'center',
              p: '4px',
              ml: '12px',
              borderRadius: '8px',
              background: '#f4fce3',
            }}
          >
            <Avatar
              sx={{
                height: '40px',
                width: 'auto',
                alignSelf: 'center',
                mr: '5px',
              }}
              variant="square"
              src={
                userInfo && userInfo.tier
                  ? `/images/tier_${tierList.indexOf(userInfo.tier) + 1}.png`
                  : '/images/tier_1.png'
              }
            />
            <Box
              sx={{
                fontSize: '26px',
                color: (theme) => theme.colors.greenText,
                alignSelf: 'center',
              }}
            >
              {userInfo && userInfo.tier ? userInfo.tier : '한콩'}
            </Box>
          </Box>
          {userInfo && userInfo.birth && (
            <Button
              sx={{ height: '32px', alignSelf: 'center', ml: '1vw' }}
              variant="outlined"
              color="success"
              onClick={openEditUserForm}
            >
              정보 수정
            </Button>
          )}
          {userInfo && !userInfo.birth && (
            <Button
              sx={{ height: '32px', alignSelf: 'center', ml: '1vw' }}
              variant="outlined"
              color="success"
              onClick={openEditUserForm}
            >
              추가 정보 입력
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default memo(UserProfile)
