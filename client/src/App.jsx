import LogInPage from './pages/Authentication/LogInPage'
import SignUpPage from './pages/Authentication/SignUpPage'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/authentication/login" replace />} />
      <Route path="/authentication/login" element={<LogInPage />} />
      <Route path="/authentication/signup" element={<SignUpPage />} />
    </Routes>

  )
}
export default App

