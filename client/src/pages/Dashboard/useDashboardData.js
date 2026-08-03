import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createTag,
  createTransaction,
  deleteTransaction,
  getTags,
  getTransactions,
} from '../../api/data'

const getMonthKey = (date) => `${date.getUTCFullYear()}-${date.getUTCMonth()}`

const parseDate = (value) => {
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

const transactionToPoint = (transaction) => {
  const date = parseDate(transaction.date)
  if (!date) {
    return null
  }

  const rawAmount = Number(transaction.amount || 0)

  return {
    id: transaction.id,
    name: transaction.name,
    amount: rawAmount,
    absAmount: Math.abs(rawAmount),
    date,
    day: date.getUTCDate(),
    displayDate: date.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit' }),
    tags: transaction.tags || [],
  }
}

const calculateMetrics = (transactions) => {
  const totalNetWorth = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
  const inbound = transactions.filter((transaction) => transaction.amount >= 0)
  const outbound = transactions.filter((transaction) => transaction.amount < 0)

  const inboundTotal = inbound.reduce((sum, transaction) => sum + transaction.amount, 0)
  const burnRate = outbound.reduce((sum, transaction) => sum + transaction.amount, 0)

  return {
    totalNetWorth,
    inboundTotal,
    burnRate,
    transactionCount: transactions.length,
  }
}

export function useDashboardData() {
  const [transactions, setTransactions] = useState([])
  const [tags, setTags] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true)
    setError('')

    try {
      const [transactionsResponse, tagsResponse] = await Promise.all([
        getTransactions({ page: 1, perPage: 200 }),
        getTags(),
      ])

      const parsedTransactions = (transactionsResponse.transactions || [])
        .map(transactionToPoint)
        .filter(Boolean)
        .sort((a, b) => b.date - a.date)

      setTransactions(parsedTransactions)
      setTags(tagsResponse || [])
    } catch (fetchError) {
      setError(fetchError.message || 'Unable to load dashboard data')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadDashboardData()
  }, [loadDashboardData])

  const recentMonthTransactions = useMemo(() => {
    if (!transactions.length) {
      return []
    }

    const latest = transactions[0]
    const latestMonth = getMonthKey(latest.date)

    return transactions
      .filter((transaction) => getMonthKey(transaction.date) === latestMonth)
      .sort((a, b) => a.day - b.day)
  }, [transactions])

  const metrics = useMemo(() => calculateMetrics(transactions), [transactions])

  const addTransaction = useCallback(async (payload) => {
    const response = await createTransaction(payload)
    const next = transactionToPoint(response)
    if (next) {
      setTransactions((current) => [next, ...current].sort((a, b) => b.date - a.date))
    }
    return response
  }, [])

  const removeTransaction = useCallback(async (transactionId) => {
    await deleteTransaction(transactionId)
    setTransactions((current) => current.filter((transaction) => transaction.id !== transactionId))
  }, [])

  const addTag = useCallback(async (name) => {
    const response = await createTag({ name })
    setTags((current) => [...current, response])
    return response
  }, [])

  return {
    tags,
    allTransactions: transactions,
    recentMonthTransactions,
    metrics,
    isLoading,
    error,
    addTransaction,
    addTag,
    removeTransaction,
    reload: loadDashboardData,
  }
}
