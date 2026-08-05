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

function TransactionChart({ transactions, income = 0 }) {
  const chartData = useMemo(() => {
    if (!transactions.length) return []

    // group by exact date so cross-month days don't collide
    const byDate = {}
    for (const t of transactions) {
      const key = t.date.toISOString().slice(0, 10)
      if (!byDate[key]) byDate[key] = { displayDate: t.displayDate, expenses: 0 }
      byDate[key].expenses += Math.abs(t.amount)
    }

    const sorted = Object.entries(byDate).sort(([a], [b]) => a.localeCompare(b))

    let cumExpenses = 0
    return sorted.map(([, { displayDate, expenses }]) => {
      cumExpenses += expenses
      return {
        date: displayDate,
        Expenses: Math.round(expenses * 100) / 100,
        ...(income > 0 && {
          Income: income,
          Savings: Math.round((income - cumExpenses) * 100) / 100,
        }),
      }
    })
  }, [transactions, income])

  if (!chartData.length) {
    return <div className="chart-empty">No transactions available.</div>
  }

  const maxDailyExpense = Math.max(...chartData.map((d) => d.Expenses))
  const yTop = income > 0 ? Math.max(income, maxDailyExpense) * 1.1 : maxDailyExpense * 1.2 || 100

  return (
    <div className="chart-container">
      <p className="chart-subtitle">Daily expenses{income > 0 ? ', monthly income ceiling and savings remaining' : ''}</p>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 10, right: 24, left: 8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#1a2030" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: '#6f7790', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tickFormatter={formatCompact}
            tick={{ fill: '#6f7790', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={72}
            domain={[0, yTop]}
          />
          <Tooltip
            formatter={(value, name) => [formatFull(value), name]}
            contentStyle={tooltipStyle}
            labelStyle={{ color: '#8e96ab', marginBottom: 4 }}
            cursor={{ stroke: '#2a3450', strokeWidth: 1 }}
          />
          <Legend
            wrapperStyle={{ color: '#d7e0ef', fontSize: 12, paddingTop: 14 }}
            iconType="circle"
          />
          {income > 0 && (
            <Line
              type="monotone"
              dataKey="Income"
              stroke="#4f9cf9"
              strokeWidth={2}
              strokeDasharray="6 3"
              dot={false}
              activeDot={{ r: 5, fill: '#4f9cf9' }}
            />
          )}
          <Line
            type="monotone"
            dataKey="Expenses"
            stroke="#ff2f66"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: '#ff2f66' }}
          />
          {income > 0 && (
            <Line
              type="monotone"
              dataKey="Savings"
              stroke="#f97c4f"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, fill: '#f97c4f' }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TransactionChart
