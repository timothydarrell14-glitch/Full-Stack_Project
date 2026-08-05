import { readAuthToken } from './session'

const API_BASE_URL = 'https://full-stack-project-3-m5k7.onrender.com'

export const apiRequest = async (path, options = {}) => {
  const { method = 'GET', body, token } = options
  const authToken = token || readAuthToken()
  const endpoint = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`

  let response

  try {
    response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
  } catch (networkError) {
    const error = new Error(
      `Unable to reach API at ${API_BASE_URL}. Make sure the server is running and CORS allows this origin.`,
    )
    error.status = 0
    error.cause = networkError
    throw error
  }

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = payload?.message || 'Request failed'
    const error = new Error(message)
    error.status = response.status
    error.payload = payload
    error.endpoint = endpoint
    throw error
  }

  return payload
}
