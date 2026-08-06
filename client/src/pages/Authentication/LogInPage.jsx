import { FaApple, FaGoogle } from 'react-icons/fa'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppearanceButton from '../../components/AppearanceButton'
import { loginUser } from '../../api/user'
import { saveAuthToken } from '../../api/session'
import { showErrorAlert, showSuccessAlert } from '../../api/alerts'
import '../../styles/LogInPage.css'

const metricBars = [26, 42, 64, 86]

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsSubmitting(true)

    try {
      const response = await loginUser({ email, password })
      saveAuthToken(response.token, rememberMe)
      await showSuccessAlert('Login successful', 'Welcome back to Executive.')
      navigate('/dashboard', { replace: true })
    } catch (error) {
      await showErrorAlert('Login failed', error.message || 'Unable to log in. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-form-side">
          <AppearanceButton />
          
          <h1>Welcome to EXECUTIVE</h1>
          <p className="login-subtitle">Please sign in to continue to your command center.</p>

          <div className="social-login-row">
            <button type="button" className="social-button">
              <FaGoogle aria-hidden="true" />
              <span>Log in with Google</span>
            </button>
            <button type="button" className="social-button">
              <FaApple aria-hidden="true" />
              <span>Log in with Apple</span>
            </button>
          </div>

          <p className="separator">or continue with email</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <div className="form-row">
              <label className="checkbox-row" htmlFor="remember-me">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-button">
                Forgot password?
              </button>
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="signup-copy">
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>

        <aside className="login-visual-side" aria-hidden="true">
          <div className="visual-note">
            <p className="note-title">status: online</p>
            <p className="note-copy">Missing key to our success.</p>
          </div>

          <div className="visual-card">
            <div className="card-header">
              <span>Cash flow velocity</span>
              <span>Last month</span>
            </div>
            <p className="card-metric">+84.32%</p>
            <div className="bar-chart">
              {metricBars.map((height) => (
                <span key={height} style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default LoginPage
