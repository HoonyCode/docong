import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLoginPage from './pages/auth/UserLoginPage'
import UserSignupPage from './pages/auth/UserSignupPage'
import UserTimerPage from './pages/user/UserTimerPage'

function App() {
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
