import { useContext } from 'react'
import ThemeContext from '../context/Theme/ThemeContext'
import '../styles/AppearanceButton.css'

function AppearanceButton() {
  const { isDark, toggleTheme } = useContext(ThemeContext)

  return (
    <button
      type="button"
      className="appearance-button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? 'Light mode' : 'Dark mode'}
    </button>
  )
}

export default AppearanceButton
