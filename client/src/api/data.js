import { apiRequest } from './client'

export const getTransactions = ({ page = 1, perPage = 100 } = {}) =>
	apiRequest('/transactions', {
		method: 'GET',
		params: { page, per_page: perPage },
	})

export const createTransaction = (payload) =>
	apiRequest('/transactions', {
		method: 'POST',
		body: payload,
	})

export const updateTransaction = (transactionId, payload) =>
	apiRequest(`/transactions/${transactionId}`, {
		method: 'PUT',
		body: payload,
	})

export const deleteTransaction = (transactionId) =>
	apiRequest(`/transactions/${transactionId}`, {
		method: 'DELETE',
	})

export const getTags = () =>
	apiRequest('/tags', {
		method: 'GET',
	})

export const createTag = (payload) =>
	apiRequest('/tags', {
		method: 'POST',
		body: payload,
	})

export const updateTag = (tagId, payload) =>
	apiRequest(`/tags/${tagId}`, {
		method: 'PUT',
		body: payload,
	})

export const deleteTag = (tagId) =>
	apiRequest(`/tags/${tagId}`, {
		method: 'DELETE',
	})

// transactions