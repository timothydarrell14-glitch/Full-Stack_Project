import { Link } from 'react-router-dom'
import '../../styles/LogInPage.css'
import '../../styles/SignUpPage.css'

function SignUpPage() {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-form-side">
          <p className="login-brand">EXECUTIVE</p>
          <h1>Create your account</h1>
          <p className="login-subtitle">Set up your profile to access your dashboard securely.</p>

          <form className="login-form signup-form" onSubmit={handleSubmit}>
            <label htmlFor="signup-name">Name</label>
            <input id="signup-name" type="text" placeholder="Enter your name" required />

            <label htmlFor="signup-email">Email</label>
            <input id="signup-email" type="email" placeholder="Enter your email" required />

            <label htmlFor="signup-age">Age</label>
            <input id="signup-age" type="date" required />

            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              placeholder="Create your password"
              required
            />

            <button type="submit" className="submit-button">
              Create account
            </button>
          </form>

          <p className="signup-copy">
            Already have an account? <Link to="/authentication/login">Log in</Link>
          </p>
        </div>

        <aside className="login-visual-side signup-visual-side" aria-hidden="true">
          <div className="visual-note">
            <p className="note-title">new client onboarding</p>
            <p className="note-copy">Secure profile creation in under one minute.</p>
          </div>

          <div className="visual-card signup-info-card">
            <p className="card-metric">4 Steps</p>
            <ol className="signup-steps">
              <li>Identity</li>
              <li>Contact</li>
              <li>Age verification</li>
              <li>Access key setup</li>
            </ol>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default SignUpPage
