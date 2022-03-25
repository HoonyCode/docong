import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import NavBarContainer from '../containers/NavBarContainer'

function NavBarPage() {
  return (
    <Box
      sx={{
        height: '100%',
        minHeight: '800px',
        minWidth: '1200px',
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
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default NavBarPage
