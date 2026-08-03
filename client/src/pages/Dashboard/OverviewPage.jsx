import { RiLineChartLine } from 'react-icons/ri'
import DashboardActions from '../../components/DashboardActions'
import TransactionChart from '../../components/TransactionChart'
import TransactionRows from '../../components/TransactionRows'
import { useDashboardData } from './useDashboardData'
import { showConfirmAlert, showErrorAlert, showSuccessAlert } from '../../api/alerts'

const formatMoney = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(amount || 0))

function OverviewPage() {
  const {
    tags,
    allTransactions,
    recentMonthTransactions,
    metrics,
    isLoading,
    error,
    addTransaction,
    addTag,
    removeTransaction,
  } = useDashboardData()

  const nowTime = new Date().toUTCString().split(' ')[4]

  const handleDeleteTransaction = async (transactionId) => {
    const decision = await showConfirmAlert(
      'Delete transaction?',
      'This action cannot be undone.',
      'Delete',
    )

    if (!decision.isConfirmed) {
      return
    }

    try {
      await removeTransaction(transactionId)
      await showSuccessAlert('Deleted', 'Transaction removed successfully.')
    } catch (deleteError) {
      await showErrorAlert('Delete failed', deleteError.message || 'Unable to delete transaction.')
    }
  }

  return (
    <section className="overview-page">
      <header className="overview-header">
        <div>
          <h1 className="overview-title">SYSTEM OVERVIEW</h1>
          <p className="overview-subtitle">REAL-TIME WEALTH & CASH FLOW TELEMETRY</p>
        </div>
        <div className="overview-status">
          <span className="status-label">STATUS: ONLINE</span>
          <time className="status-time">{nowTime} UTC</time>
        </div>
      </header>

      <section className="metrics-grid" aria-label="Summary metrics">
        <article className="metric-card">
          <div className="metric-meta-row">
            <p className="metric-label">TOTAL NET FLOW</p>
            <span className="metric-icon">
              <RiLineChartLine aria-hidden="true" />
            </span>
          </div>
          <p className="metric-value">{formatMoney(metrics.totalNetWorth)}</p>
          <p className="metric-trend">Across all loaded transactions</p>
        </article>

        <article className="metric-card metric-income">
          <p className="metric-label">LATEST MONTH INBOUND</p>
          <p className="metric-value">{formatMoney(metrics.inboundTotal)}</p>
          <p className="metric-trend">Positive cash flow entries</p>
        </article>

        <article className="metric-card metric-expense">
          <p className="metric-label">LATEST MONTH BURN</p>
          <p className="metric-value">{formatMoney(metrics.burnRate)}</p>
          <p className="metric-trend">Negative cash flow entries</p>
        </article>

        <article className="metric-card">
          <p className="metric-label">TRANSACTION COUNT</p>
          <p className="metric-value">{metrics.transactionCount}</p>
          <p className="metric-trend">Loaded records</p>
        </article>
      </section>

      <section className="dashboard-panel chart-panel" aria-label="Transaction chart and rows">
        <header className="panel-header">
          <h2>MOST RECENT MONTH TRANSACTIONS</h2>
          <div className="chart-legend">
            <span className="legend-item">
              <i className="legend-swatch income" aria-hidden="true" />Amount trend
            </span>
          </div>
        </header>

        {isLoading ? <p className="panel-state-message">Loading transaction data...</p> : null}
        {!isLoading && error ? <p className="panel-state-message has-error">{error}</p> : null}

        {!isLoading && !error ? (
          <>
            <TransactionChart transactions={recentMonthTransactions} />
            <TransactionRows transactions={allTransactions} onDelete={handleDeleteTransaction} />
          </>
        ) : null}
      </section>

      <DashboardActions tags={tags} onAddTag={addTag} onAddTransaction={addTransaction} />
    </section>
  )
}

export default OverviewPage