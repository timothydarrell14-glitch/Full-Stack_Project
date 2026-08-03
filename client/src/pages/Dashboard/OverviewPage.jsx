import { RiEyeLine } from 'react-icons/ri'

const metricCards = [
  {
    label: 'TOTAL NET WORTH',
    value: '$12,450,890.00',
    trend: '+2.4% (30D)',
    variant: 'neutral',
    icon: <RiEyeLine aria-hidden="true" />,
  },
  {
    label: 'LIQUID RESERVES',
    value: '$840,200.50',
    trend: '14.2% of Total',
    variant: 'muted',
  },
  {
    label: '30D INBOUND',
    value: '+$45,200.00',
    trend: 'Velocity: High',
    variant: 'income',
  },
  {
    label: '30D BURN RATE',
    value: '-$12,450.00',
    trend: '↓ -5% vs Prev',
    variant: 'expense',
  },
]

const accountNodes = [
  { name: 'CHASE SAPPHIRE RES', subtext: '****4592', amount: '-$4,250.00' },
  { name: 'SCHWAB BROKERAGE', subtext: '****8812', amount: '$810,400.00' },
  { name: 'WF CHECKING MAIN', subtext: '****1104', amount: '$25,550.50' },
  { name: 'KRAKEN COLD', subtext: 'CRYPTO', amount: '$120,500.00' },
]

const ledgerRows = [
  { date: '10/24', desc: 'STRIPE+PAYOUT', amount: '+$14,500.00', state: 'income' },
  { date: '10/24', desc: 'EQUINOX HOLDINGS', amount: '-$350.00', state: 'expense' },
  { date: '10/23', desc: 'UBER EATS', amount: '-$45.20', state: 'expense' },
  { date: '10/22', desc: 'AWS EMEA', amount: '-$1,240.00', state: 'expense' },
  { date: '10/22', desc: 'TRANSFER PENDING', amount: '+$5,000.00', state: 'pending' },
]

function OverviewPage() {
  return (
    <section className="overview-page">
      <header className="overview-header">
        <div>
          <h1 className="overview-title">SYSTEM OVERVIEW</h1>
          <p className="overview-subtitle">REAL-TIME WEALTH & CASH FLOW TELEMETRY</p>
        </div>
        <div className="overview-status">
          <span className="status-label">STATUS: ONLINE</span>
          <time className="status-time">07:14:07 UTC</time>
        </div>
      </header>

      <section className="metrics-grid" aria-label="KPI cards">
        {metricCards.map((metric) => (
          <article key={metric.label} className={`metric-card metric-${metric.variant}`}>
            <div className="metric-meta-row">
              <p className="metric-label">{metric.label}</p>
              {metric.icon ? <span className="metric-icon">{metric.icon}</span> : null}
            </div>
            <p className="metric-value">{metric.value}</p>
            <p className="metric-trend">{metric.trend}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-panel chart-panel" aria-label="Cash flow chart">
        <header className="panel-header">
          <h2>CASH FLOW VELOCITY (30D)</h2>
          <div className="chart-legend">
            <span className="legend-item">
              <i className="legend-swatch income" aria-hidden="true" />Income
            </span>
            <span className="legend-item">
              <i className="legend-swatch expense" aria-hidden="true" />Expense
            </span>
          </div>
        </header>

        <div className="chart-viewport" role="img" aria-label="Income and expense trend lines">
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="trend-lines" aria-hidden="true">
            <polyline
              className="trend-income"
              points="0,30 10,28 18,32 28,20 38,24 48,16 58,18 68,10 78,12 88,8 100,4"
            />
            <polyline
              className="trend-expense"
              points="0,35 10,33 18,36 28,34 38,37 48,32 58,33 68,30 78,31 88,28 100,26"
            />
          </svg>
        </div>
      </section>

      <section className="overview-lower-grid" aria-label="Accounts and ledger sections">
        <article className="dashboard-panel">
          <header className="panel-header">
            <h2>ACTIVE NODES (ACCOUNTS)</h2>
            <button type="button" className="panel-action-link">
              [ADD NODE]
            </button>
          </header>

          <ul className="accounts-list">
            {accountNodes.map((account) => (
              <li key={account.name} className="account-row">
                <div>
                  <p className="account-name">{account.name}</p>
                  <p className="account-subtext">{account.subtext}</p>
                </div>
                <p className="account-amount">{account.amount}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="dashboard-panel">
          <header className="panel-header">
            <h2>LEDGER STREAM</h2>
            <button type="button" className="panel-action-link">
              [VIEW ALL]
            </button>
          </header>

          <div className="ledger-table" role="table" aria-label="Ledger entries">
            <div className="ledger-head" role="rowgroup">
              <p role="columnheader">DATE</p>
              <p role="columnheader">DESC</p>
              <p role="columnheader">AMT</p>
            </div>

            <div className="ledger-body" role="rowgroup">
              {ledgerRows.map((entry) => (
                <div key={`${entry.date}-${entry.desc}`} className="ledger-row" role="row">
                  <p role="cell">{entry.date}</p>
                  <p role="cell" className="ledger-description">
                    {entry.desc}
                  </p>
                  <p role="cell" className={`ledger-amount ${entry.state}`}>
                    {entry.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </section>
  )
}

export default OverviewPage