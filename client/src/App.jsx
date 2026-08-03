import LogInPage from './pages/Authentication/LogInPage'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import OverviewPage from './pages/Dashboard/OverviewPage'
// import ExpensesPage from './pages/Dashboard/ExpensesPage'
// import SavingsPage from './pages/Dashboard/SavingsPage'
// import SettingsPage from './pages/Dashboard/SettingsPage'
// import Profile from './components/Profile'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LogInPage />} />

      <Route element={<Dashboard />}>
        <Route path="/dashboard" element={<OverviewPage />} />
        {/* <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/savings" element={<SavingsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>

  )
}
export default App
