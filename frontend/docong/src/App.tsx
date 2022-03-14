import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLoginPage from './pages/user/UserLoginPage'
import UserSignupPage from './pages/user/UserSignupPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/join" element={<UserSignupPage />} />
      </Routes>
    </>
  )
}

export default App
