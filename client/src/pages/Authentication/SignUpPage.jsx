import { Link } from 'react-router-dom'
import '../../styles/SignUpPage.css'

function SignUpPage() {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <main className="signup-page">
      <section className="signup-panel">
        <div className="signup-form-side">
          <p className="signup-brand">EXECUTIVE</p>
          <h1>Create your account</h1>
          <p className="signup-subtitle">Set up your profile to access your dashboard securely.</p>

          <form className="signup-form" onSubmit={handleSubmit}>
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

        <aside className="signup-visual-side" aria-hidden="true">
          <div className="visual-note">
            <p className="note-title">new client onboarding</p>
            <p className="note-copy">Secure profile creation in under one minute.</p>
          </div>

          <div className="visual-card signup-info-card">
            <p className="card-metric">4 Steps</p>
            <ul>
              <li>Identity</li>
              <li>Contact</li>
              <li>Age verification</li>
              <li>Access key setup</li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default SignUpPage
