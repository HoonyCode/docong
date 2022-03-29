import { Avatar, Box, Button } from '@mui/material'
import { UserData } from '../../api/user'

interface UserInfoProps {
  userInfo: UserData | null
  openEditUserForm: () => void
}

function UserInfo({ userInfo, openEditUserForm }: UserInfoProps) {
  return (
    <>
      <Box sx={{ display: 'flex', p: '10px' }}>
        <Box sx={{ width: '60px' }}>
          <Avatar
            sx={{ width: 48, height: 48, boxShadow: 2 }}
            alt="User"
            src="/images/Profile_Default.jpg"
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            alignSelf: 'center',
            fontSize: '32px',
            fontWeight: 'bold',
            color: (theme) => theme.colors.basicText,
            ml: '14px',
          }}
        >
          <div>{userInfo ? userInfo.name : ''}</div>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {userInfo && userInfo.birth && (
          <Button variant="outlined" color="success" onClick={openEditUserForm}>
            정보 수정
          </Button>
        )}
        {userInfo && !userInfo.birth && (
          <Button variant="outlined" color="success" onClick={openEditUserForm}>
            추가 정보 입력
          </Button>
        )}
      </Box>
    </>
  )
}

export default UserInfo
