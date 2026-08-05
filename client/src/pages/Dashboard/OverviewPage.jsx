import { RiLineChartLine } from 'react-icons/ri'
import { useEffect, useMemo, useState } from 'react'
import DashboardActions from '../../components/DashboardActions'
import TagFilterBar from '../../components/TagFilterBar'
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
    income,
    setIncome,
    isLoading,
    error,
    addTransaction,
    addTag,
    removeTag,
    attachTagToTransaction,
    detachTagFromTransaction,
    removeTransaction,
  } = useDashboardData()

  const [selectedTagId, setSelectedTagId] = useState('all')

  const [nowTime, setNowTime] = useState(() => new Date().toUTCString().split(' ')[4])

  useEffect(() => {
    const interval = setInterval(() => {
      setNowTime(new Date().toUTCString().split(' ')[4])
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const filteredTransactions = useMemo(() => {
    if (selectedTagId === 'all') {
      return allTransactions
    }

    return allTransactions.filter((transaction) =>
      transaction.tags.some((tag) => tag.id === selectedTagId),
    )
  }, [allTransactions, selectedTagId])

  const filteredRecentMonthTransactions = useMemo(() => {
    if (selectedTagId === 'all') {
      return recentMonthTransactions
    }

    return recentMonthTransactions.filter((transaction) =>
      transaction.tags.some((tag) => tag.id === selectedTagId),
    )
  }, [recentMonthTransactions, selectedTagId])

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

  const handleAttachTag = async (transactionId, tagId) => {
    try {
      await attachTagToTransaction(transactionId, tagId)
      await showSuccessAlert('Tag added', 'Transaction updated with selected tag.')
    } catch (updateError) {
      await showErrorAlert('Tag update failed', updateError.message || 'Unable to update transaction tag.')
    }
  }

  const handleDetachTag = async (transactionId, tagId) => {
    try {
      await detachTagFromTransaction(transactionId, tagId)
    } catch (detachError) {
      await showErrorAlert('Remove tag failed', detachError.message || 'Unable to remove tag.')
    }
  }

  return (
    <section className="overview-page">
      <header className="overview-header">
        <div>
          <h1 className="overview-title">DASHBOARD</h1>
        </div>
        <div className="overview-status">
          <span className="status-label">STATUS: ONLINE</span>
          <time className="status-time">{nowTime} UTC</time>
        </div>
      </header>

      <section className="metrics-grid" aria-label="Summary metrics">
        <article className="metric-card metric-net">
          <div className="metric-meta-row">
            <p className="metric-label">NET FLOW</p>
            <span className="metric-icon">
              <RiLineChartLine aria-hidden="true" />
            </span>
          </div>
          <p className="metric-value">{formatMoney(income - metrics.totalExpenses)}</p>
          <p className="metric-trend">Income minus expenses</p>
        </article>

        <article className="metric-card metric-income">
          <p className="metric-label">TOTAL INCOME</p>
          <p className="metric-value">{formatMoney(income)}</p>
          <p className="metric-trend">Monthly income set</p>
        </article>

        <article className="metric-card metric-expense">
          <p className="metric-label">TOTAL EXPENSES</p>
          <p className="metric-value">{formatMoney(metrics.totalExpenses)}</p>
          <p className="metric-trend">All transactions</p>
        </article>

        <article className="metric-card">
          <p className="metric-label">TOTAL TRANSACTIONS</p>
          <p className="metric-value">{metrics.transactionCount}</p>
          <p className="metric-trend">Loaded records</p>
        </article>
      </section>

      <section className="dashboard-panel chart-panel" aria-label="Transaction chart and rows">
        <header className="panel-header">
          <h2>MOST RECENT MONTH CASH FLOW</h2>
        </header>

        <TagFilterBar
          tags={tags}
          selectedTagId={selectedTagId}
          onSelectTag={setSelectedTagId}
        />

        {isLoading ? <p className="panel-state-message">Loading transaction data...</p> : null}
        {!isLoading && error ? <p className="panel-state-message has-error">{error}</p> : null}

        {!isLoading && !error ? (
          <>
            <TransactionChart transactions={filteredTransactions} income={income} />
            <TransactionRows
              transactions={filteredTransactions}
              tags={tags}
              onDelete={handleDeleteTransaction}
              onAttachTag={handleAttachTag}
              onDetachTag={handleDetachTag}
            />
          </>
        ) : null}
      </section>

      <DashboardActions
        tags={tags}
        onAddTag={addTag}
        onDeleteTag={removeTag}
        onAddTransaction={addTransaction}
        income={income}
        onSetIncome={setIncome}
      />
    </section>
  )
}

export default OverviewPage