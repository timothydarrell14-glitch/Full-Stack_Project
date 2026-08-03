import { apiRequest } from './client'

export const loginUser = (credentials) => apiRequest('/login', { method: 'POST', body: credentials })

export const createUser = (payload) => apiRequest('/signup', { method: 'POST', body: payload })

