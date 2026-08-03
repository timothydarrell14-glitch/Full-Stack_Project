import { useContext } from 'react'
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri'
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
      <span className="appearance-icon" aria-hidden="true">
        {isDark ? <RiSunLine /> : <RiMoonClearLine />}
      </span>
      <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
    </button>
  )
}

export default AppearanceButton
