import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import UserLoginPage from './pages/auth/UserLoginPage'
import UserSignupPage from './pages/auth/UserSignupPage'
import UserTimerPage from './pages/user/UserTimerPage'

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      if (location.pathname === '/login' || location.pathname === '/join') {
        navigate('/')
      }
    } else if (
      location.pathname !== '/login' &&
      location.pathname !== '/join'
    ) {
      navigate('/login')
      alert('docong 은 로그인 후 이용 가능합니다.')
    }
  }, [location, dispatch, navigate])

  return (
    <>
      <Routes>
        <Route path="/" element={<UserTimerPage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/join" element={<UserSignupPage />} />
      </Routes>
    </>
  )
}

export default App
