import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import UserLoginPage from './pages/auth/UserLoginPage'
import UserSignupPage from './pages/auth/UserSignupPage'
import UserAnalysisPage from './pages/user/UserAnalysisPage'
import UserTimerPage from './pages/user/UserTimerPage'
import UserTodoPage from './pages/user/UserTodoPage'

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
    <Background>
      <Routes>
        <Route path="/" element={<UserLoginPage />} />
        <Route path="/timer" element={<UserTimerPage />} />
        <Route path="/join" element={<UserSignupPage />} />
        <Route path="/user/todo" element={<UserTodoPage />} />
        <Route path="/user/analysis" element={<UserAnalysisPage />} />
      </Routes>
    </Background>
  )
}

export default App
