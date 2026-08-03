import '../styles/TransactionChart.css'

const toCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
    value,
  )

function TransactionChart({ transactions }) {
  if (!transactions.length) {
    return <div className="chart-empty">No transactions available for the latest month.</div>
  }

  const width = 100
  const height = 44
  const maxAmount = Math.max(...transactions.map((transaction) => transaction.absAmount), 1)
  const step = transactions.length > 1 ? width / (transactions.length - 1) : width

  const points = transactions
    .map((transaction, index) => {
      const x = index * step
      const y = height - (transaction.absAmount / maxAmount) * height
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div>
      <div className="chart-value-range" aria-hidden="true">
        <span>{toCurrency(maxAmount)}</span>
        <span>{toCurrency(maxAmount / 2)}</span>
        <span>$0</span>
      </div>
      <div className="chart-viewport" role="img" aria-label="Most recent month transaction trend">
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="trend-lines">
          <polyline className="trend-income" points={points} />
        </svg>
      </div>
      <div className="chart-x-axis" aria-hidden="true">
        {transactions.map((transaction) => (
          <span key={transaction.id}>{transaction.displayDate}</span>
        ))}
      </div>
    </div>
  )
}

export default TransactionChart
