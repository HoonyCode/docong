import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import NavBarContainer from '../containers/NavBarContainer'

function NavBarPage() {
  return (
    <Box
      sx={{
        height: '100%',
        minHeight: '820px',
        minWidth: '1500px',
        display: 'flex',
      }}
    >
      <Box sx={{ width: '330px', minWidth: '330px' }}>
        <NavBarContainer />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          height: '100%',
          p: '35px 35px 35px 0',
        }}
      >
        <Box
          sx={{
            height: '100%',
            background: (theme) => theme.colors.pageBg,
            borderRadius: '20px',
            boxShadow: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default NavBarPage
