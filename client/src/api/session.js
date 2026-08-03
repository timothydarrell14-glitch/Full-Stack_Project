const AUTH_TOKEN_KEY = 'executive-auth-token'

export const getAuthToken = () => window.localStorage.getItem(AUTH_TOKEN_KEY)

export const saveAuthToken = (token, remember = true) => {
  if (!token) {
    return
  }

  if (remember) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token)
  } else {
    window.sessionStorage.setItem(AUTH_TOKEN_KEY, token)
  }
}

export const clearAuthToken = () => {
  window.localStorage.removeItem(AUTH_TOKEN_KEY)
  window.sessionStorage.removeItem(AUTH_TOKEN_KEY)
}

export const hasAuthToken = () => Boolean(getAuthToken() || window.sessionStorage.getItem(AUTH_TOKEN_KEY))

export const readAuthToken = () => getAuthToken() || window.sessionStorage.getItem(AUTH_TOKEN_KEY)
