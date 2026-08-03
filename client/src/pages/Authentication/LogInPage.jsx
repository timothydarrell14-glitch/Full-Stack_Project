import { FaApple, FaGoogle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '../../styles/LogInPage.css'

const metricBars = [26, 42, 64, 86]

function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-form-side">
          
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
            <input id="email" type="email" placeholder="Enter your email" required />

            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter your password" required />

            <div className="form-row">
              <label className="checkbox-row" htmlFor="remember-me">
                <input id="remember-me" type="checkbox" />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-button">
                Forgot password?
              </button>
            </div>

            <button type="submit" className="submit-button">
              Log in
            </button>
          </form>

          <p className="signup-copy">
            Don&apos;t have an account? <Link to="/authentication/signup">Sign up</Link>
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
