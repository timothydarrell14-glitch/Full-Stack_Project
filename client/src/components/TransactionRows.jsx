import { useState } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import '../styles/TransactionRows.css'

const PAGE_SIZE = 10

const asCurrency = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(amount || 0))

function TransactionRows({ transactions, tags, onDelete, onAttachTag, onDetachTag }) {
  const [selectedTagByTransaction, setSelectedTagByTransaction] = useState({})
  const [savingTransactionId, setSavingTransactionId] = useState(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  if (!transactions.length) {
    return <p className="transactions-empty">No transaction records available.</p>
  }

  const visible = transactions.slice(0, visibleCount)
  const hasMore = visibleCount < transactions.length

  const handleAddTag = async (transactionId) => {
    const selectedTagId = selectedTagByTransaction[transactionId]
    if (!selectedTagId) {
      return
    }

    setSavingTransactionId(transactionId)
    try {
      await onAttachTag(transactionId, Number(selectedTagId))
      setSelectedTagByTransaction((current) => ({ ...current, [transactionId]: '' }))
    } finally {
      setSavingTransactionId(null)
    }
  }

  return (
    <div className="transactions-table" role="table" aria-label="Transactions table">
      <div className="transactions-head" role="rowgroup">
        <p role="columnheader">DATE</p>
        <p role="columnheader">DESCRIPTION</p>
        <p role="columnheader">AMOUNT</p>
        <p role="columnheader">TAGS</p>
        <p role="columnheader">ACTIONS</p>
      </div>

      <div className="transactions-body" role="rowgroup">
        {visible.map((transaction) => (
          <div className="transactions-row" role="row" key={transaction.id}>
            <p role="cell">{transaction.displayDate}</p>
            <div role="cell">
              <p className="transaction-name">{transaction.name}</p>
              <p className="transaction-tags">
                {transaction.tags.length
                  ? transaction.tags.map((tag) => tag.name).join(' · ')
                  : 'No tags'}
              </p>
            </div>
            <p role="cell" className="transaction-amount">
              {asCurrency(transaction.amount)}
            </p>

            <div role="cell" className="transaction-tags-cell">
              <div className="transaction-tag-chips">
                {transaction.tags.length ? (
                  transaction.tags.map((tag) => (
                    <span key={tag.id} className="transaction-tag-chip">
                      {tag.name}
                      <button
                        type="button"
                        className="transaction-tag-remove"
                        onClick={() => onDetachTag(transaction.id, tag.id)}
                        aria-label={`Remove tag ${tag.name}`}
                      >
                        <RiCloseLine />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="no-tags-label">No tags</span>
                )}
              </div>
              <span className="tag-edit-controls">
                <select
                  value={selectedTagByTransaction[transaction.id] || ''}
                  onChange={(event) =>
                    setSelectedTagByTransaction((current) => ({
                      ...current,
                      [transaction.id]: event.target.value,
                    }))
                  }
                >
                  <option value="">Select tag</option>
                  {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="row-action-button"
                  onClick={() => handleAddTag(transaction.id)}
                  disabled={!selectedTagByTransaction[transaction.id] || savingTransactionId === transaction.id}
                >
                  {savingTransactionId === transaction.id ? 'Saving...' : 'Add tag'}
                </button>
              </span>
            </div>

            <p role="cell">
              <button
                type="button"
                className="row-action-button"
                onClick={() => onDelete(transaction.id)}
              >
                Delete
              </button>
            </p>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="load-more-row">
          <button
            type="button"
            className="load-more-button"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          >
            Load more ({transactions.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  )
}

export default TransactionRows
