import { Navigate, useLocation } from 'react-router-dom'
import { hasAuthToken } from '../api/session'

function ProtectedRoute({ children }) {
  const location = useLocation()

  if (!hasAuthToken()) {
    return <Navigate to="/authentication/login" replace state={{ from: location.pathname }} />
  }

  return children
}

export default ProtectedRoute
