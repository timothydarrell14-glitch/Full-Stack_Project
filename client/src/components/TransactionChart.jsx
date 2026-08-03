import '../styles/TransactionChart.css'

const toCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(
    Number(value || 0),
  )

function TransactionChart({ transactions }) {
  if (!transactions.length) {
    return <div className="chart-empty">No transactions available for the latest month.</div>
  }

  const width = 100
  const height = 44

  let runningTotal = 0
  const cumulativeSeries = transactions.map((transaction) => {
    runningTotal += transaction.amount
    return {
      id: transaction.id,
      day: transaction.day,
      displayDate: transaction.displayDate,
      total: runningTotal,
    }
  })

  const monthlyTotal = cumulativeSeries[cumulativeSeries.length - 1]?.total || 0
  const maxValue = Math.max(0, ...cumulativeSeries.map((point) => point.total))
  const minValue = Math.min(0, ...cumulativeSeries.map((point) => point.total))
  const valueRange = Math.max(maxValue - minValue, 1)
  const step = transactions.length > 1 ? width / (transactions.length - 1) : width

  const points = cumulativeSeries
    .map((point, index) => {
      const x = index * step
      const y = height - ((point.total - minValue) / valueRange) * height
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div>
      <p className="chart-month-total">Month total: {toCurrency(monthlyTotal)}</p>
      <div className="chart-value-range" aria-hidden="true">
        <span>{toCurrency(maxValue)}</span>
        <span>{toCurrency((maxValue + minValue) / 2)}</span>
        <span>{toCurrency(minValue)}</span>
      </div>
      <div className="chart-viewport" role="img" aria-label="Most recent month cumulative transaction totals">
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="trend-lines">
          <polyline className="trend-income" points={points} />
        </svg>
      </div>
      <div className="chart-x-axis" aria-hidden="true">
        {cumulativeSeries.map((point) => (
          <span key={point.id}>D{point.day}</span>
        ))}
      </div>
    </div>
  )
}

export default TransactionChart
