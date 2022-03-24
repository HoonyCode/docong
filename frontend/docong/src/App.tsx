import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import UserLoginPage from './pages/auth/UserLoginPage'
import UserSignupPage from './pages/auth/UserSignupPage'
import UserAnalysisPage from './pages/user/UserAnalysisPage'
import UserTimerPage from './pages/user/UserTimerPage'
import UserTodoPage from './pages/user/UserTodoPage'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import NavBarPage from './pages/NavBarPage'

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      lightGreen: string
      Green: string
      lightYellow: string
      Yellow: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors?: {
      lightGreen?: string
      Green: string
      lightYellow: string
      Yellow: string
    }
  }
}

const theme = createTheme({
  colors: {
    lightGreen: '#b2f2bb',
    Green: '#69db7c',
    lightYellow: '#ffec99',
    Yellow: '#ffd43b',
  },
})

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const Background = styled.div`
    height: 100%;
    background: white;
  `

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      if (location.pathname === '/' || location.pathname === '/join') {
        navigate('/timer')
      }
    } else if (location.pathname !== '/' && location.pathname !== '/join') {
      navigate('/')
      alert('docong 은 로그인 후 이용 가능합니다.')
    }
  }, [location, dispatch, navigate])

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Routes>
          <Route path="/" element={<UserLoginPage />} />
          <Route path="/join" element={<UserSignupPage />} />
          <Route path="/*" element={<NavBarPage />}>
            <Route path="timer" element={<UserTimerPage />} />
            <Route path="user/todo" element={<UserTodoPage />} />
            <Route path="user/analysis" element={<UserAnalysisPage />} />
          </Route>
        </Routes>
      </Background>
    </ThemeProvider>
  )
}

export default App
