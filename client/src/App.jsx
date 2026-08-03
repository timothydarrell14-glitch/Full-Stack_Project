import LogInPage from './pages/Authentication/LogInPage'
import SignUpPage from './pages/Authentication/SignUpPage'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import OverviewPage from './pages/Dashboard/OverviewPage'
import ExpensesPage from './pages/Dashboard/ExpensesPage'
import SavingsPage from './pages/Dashboard/SavingsPage'
import SettingsPage from './pages/Dashboard/SettingsPage'
import ProtectedRoute from './components/ProtectedRoute'
import { hasAuthToken } from './api/session'

function App() {
  const isLoggedIn = hasAuthToken()

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isLoggedIn ? '/dashboard' : '/authentication/login'} replace />}
      />
      <Route path="/authentication/login" element={<LogInPage />} />
      <Route path="/authentication/signup" element={<SignUpPage />} />

      <Route
        path="/dashboard"
        element={(
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )}
      >
        <Route index element={<OverviewPage />} />
        <Route path="expenses" element={<ExpensesPage />} />
        <Route path="savings" element={<SavingsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? '/dashboard' : '/authentication/login'} replace />}
      />
    </Routes>

  )
}
export default App

