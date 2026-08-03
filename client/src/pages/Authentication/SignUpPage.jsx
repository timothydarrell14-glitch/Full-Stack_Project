import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppearanceButton from '../../components/AppearanceButton'
import { createUser } from '../../api/user'
import { showErrorAlert, showSuccessAlert } from '../../api/alerts'
import '../../styles/LogInPage.css'
import '../../styles/SignUpPage.css'

function SignUpPage() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsSubmitting(true)

    try {
      await createUser({
        name: formValues.name,
        email: formValues.email,
        age: Number(formValues.age),
        password: formValues.password,
      })
      await showSuccessAlert('Registered successfully', 'Your account has been created.')
      navigate('/authentication/login', { replace: true })
    } catch (error) {
      await showErrorAlert('Registration failed', error.message || 'Unable to create account.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-form-side">
          <AppearanceButton />
          <p className="login-brand">EXECUTIVE</p>
          <h1>Create your account</h1>
          <p className="login-subtitle">Set up your profile to access your dashboard securely.</p>

          <form className="login-form signup-form" onSubmit={handleSubmit}>
            <label htmlFor="signup-name">Name</label>
            <input
              id="signup-name"
              type="text"
              placeholder="Enter your name"
              value={formValues.name}
              onChange={(event) =>
                setFormValues((current) => ({ ...current, name: event.target.value }))
              }
              required
            />

            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              value={formValues.email}
              onChange={(event) =>
                setFormValues((current) => ({ ...current, email: event.target.value }))
              }
              required
            />

            <label htmlFor="signup-age">Age</label>
            <input
              id="signup-age"
              type="number"
              min="1"
              placeholder="Enter your age"
              value={formValues.age}
              onChange={(event) =>
                setFormValues((current) => ({ ...current, age: event.target.value }))
              }
              required
            />

            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              placeholder="Create your password"
              value={formValues.password}
              onChange={(event) =>
                setFormValues((current) => ({ ...current, password: event.target.value }))
              }
              required
            />

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create account'}
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
