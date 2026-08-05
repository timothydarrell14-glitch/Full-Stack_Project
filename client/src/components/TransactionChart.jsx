import { useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import '../styles/TransactionChart.css'

const formatCompact = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(Number(value || 0))

const formatFull = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0))

const tooltipStyle = {
  background: '#0d1017',
  border: '1px solid #1e2535',
  borderRadius: 6,
  color: '#e7edf9',
  fontSize: 12,
}

function TransactionChart({ transactions }) {
  const chartData = useMemo(() => {
    if (!transactions.length) return []

    const maxDay = Math.max(...transactions.map((t) => t.day))

    // accumulate income and expenses per day
    const byDay = {}
    for (let d = 1; d <= maxDay; d++) {
      byDay[d] = { income: 0, expenses: 0 }
    }
    for (const t of transactions) {
      if (t.amount >= 0) {
        byDay[t.day].income += t.amount
      } else {
        byDay[t.day].expenses += Math.abs(t.amount)
      }
    }

    // build cumulative running totals across the month
    let cumIncome = 0
    let cumExpenses = 0

    return Object.entries(byDay).map(([day, { income, expenses }]) => {
      cumIncome += income
      cumExpenses += expenses
      return {
        day: Number(day),
        Income: Math.round(cumIncome * 100) / 100,
        Expenses: Math.round(cumExpenses * 100) / 100,
        Savings: 0,
      }
    })
  }, [transactions])

  if (!chartData.length) {
    return <div className="chart-empty">No transactions available for the latest month.</div>
  }

  return (
    <div className="chart-container">
      <p className="chart-subtitle">Cumulative income, expenses, and savings across the month</p>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 10, right: 24, left: 8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#1a2030" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fill: '#6f7790', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(d) => `Day ${d}`}
            interval="preserveStartEnd"
          />
          <YAxis
            tickFormatter={formatCompact}
            tick={{ fill: '#6f7790', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={72}
          />
          <Tooltip
            formatter={(value, name) => [formatFull(value), name]}
            contentStyle={tooltipStyle}
            labelStyle={{ color: '#8e96ab', marginBottom: 4 }}
            labelFormatter={(d) => `Day ${d}`}
            cursor={{ stroke: '#2a3450', strokeWidth: 1 }}
          />
          <Legend
            wrapperStyle={{ color: '#d7e0ef', fontSize: 12, paddingTop: 14 }}
            iconType="circle"
          />
          <Line
            type="monotone"
            dataKey="Income"
            stroke="#4f9cf9"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: '#4f9cf9' }}
          />
          <Line
            type="monotone"
            dataKey="Expenses"
            stroke="#4ecb8b"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: '#4ecb8b' }}
          />
          <Line
            type="monotone"
            dataKey="Savings"
            stroke="#f97c4f"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: '#f97c4f' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TransactionChart
