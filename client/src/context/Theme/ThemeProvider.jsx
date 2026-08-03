import { useEffect, useMemo, useState } from 'react'
import ThemeContext from './ThemeContext'

const THEME_STORAGE_KEY = 'appearance-theme'

const getInitialTheme = () => {
	const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
	if (storedTheme === 'light' || storedTheme === 'dark') {
		return storedTheme
	}

	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(getInitialTheme)

	useEffect(() => {
		window.localStorage.setItem(THEME_STORAGE_KEY, theme)
		document.body.classList.remove('theme-dark', 'theme-light')
		document.body.classList.add(`theme-${theme}`)
	}, [theme])

	const value = useMemo(
		() => ({
			theme,
			isDark: theme === 'dark',
			setTheme,
			toggleTheme: () => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark')),
		}),
		[theme],
	)

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
