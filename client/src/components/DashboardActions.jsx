import { useMemo, useState } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import { showConfirmAlert, showErrorAlert, showSuccessAlert } from '../api/alerts'
import '../styles/DashboardActions.css'

const initialTransaction = {
  name: '',
  amount: '',
  date: '',
}

function DashboardActions({ tags, onAddTag, onDeleteTag, onAddTransaction }) {
  const [tagName, setTagName] = useState('')
  const [transactionForm, setTransactionForm] = useState(initialTransaction)
  const [selectedTagIds, setSelectedTagIds] = useState([])
  const [isSaving, setIsSaving] = useState(false)

  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const handleTagSubmit = async (event) => {
    event.preventDefault()
    if (!tagName.trim()) {
      return
    }

    setIsSaving(true)
    try {
      await onAddTag(tagName.trim())
      setTagName('')
      await showSuccessAlert('Tag added', 'The new label tag was created successfully.')
    } catch (error) {
      await showErrorAlert('Failed to add tag', error.message || 'Try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteTag = async (tagId) => {
    const decision = await showConfirmAlert(
      'Delete tag?',
      'This will remove the tag from all transactions.',
      'Delete',
    )
    if (!decision.isConfirmed) {
      return
    }
    try {
      await onDeleteTag(tagId)
      setSelectedTagIds((current) => current.filter((id) => id !== tagId))
    } catch (error) {
      await showErrorAlert('Failed to delete tag', error.message || 'Try again.')
    }
  }

  const toggleTransactionTag = (tagId) => {
    setSelectedTagIds((current) =>
      current.includes(tagId) ? current.filter((id) => id !== tagId) : [...current, tagId],
    )
  }

  const handleTransactionSubmit = async (event) => {
    event.preventDefault()

    setIsSaving(true)
    try {
      await onAddTransaction({
        name: transactionForm.name.trim(),
        amount: Number(transactionForm.amount),
        date: transactionForm.date || today,
        ...(selectedTagIds.length ? { tag_ids: selectedTagIds } : {}),
      })
      setTransactionForm(initialTransaction)
      setSelectedTagIds([])
      await showSuccessAlert('Transaction added', 'The transaction has been saved.')
    } catch (error) {
      await showErrorAlert('Failed to add transaction', error.message || 'Try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="dashboard-actions-panel" aria-label="Quick actions">
      <header className="panel-header">
        <h2>DATA ACTIONS</h2>
      </header>

      <div className="dashboard-actions-grid">
        <form className="action-form" onSubmit={handleTagSubmit}>
          <p className="action-title">ADD TAG</p>
          <input
            type="text"
            value={tagName}
            onChange={(event) => setTagName(event.target.value)}
            placeholder="e.g. Subscription"
            maxLength={100}
            required
          />
          <button type="submit" disabled={isSaving}>
            Add Label Tag
          </button>

          {tags.length > 0 ? (
            <div className="tag-chips-list" aria-label="Existing tags">
              {tags.map((tag) => (
                <span key={tag.id} className="tag-chip">
                  {tag.name}
                  <button
                    type="button"
                    className="tag-chip-delete"
                    onClick={() => handleDeleteTag(tag.id)}
                    aria-label={`Delete tag ${tag.name}`}
                  >
                    <RiCloseLine />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="action-meta">No tags yet.</p>
          )}
        </form>

        <form className="action-form" onSubmit={handleTransactionSubmit}>
          <p className="action-title">ADD TRANSACTION</p>
          <input
            type="text"
            value={transactionForm.name}
            onChange={(event) =>
              setTransactionForm((current) => ({ ...current, name: event.target.value }))
            }
            placeholder="Description"
            required
          />
          <input
            type="number"
            step="0.01"
            value={transactionForm.amount}
            onChange={(event) =>
              setTransactionForm((current) => ({ ...current, amount: event.target.value }))
            }
            placeholder="Amount"
            required
          />
          <label className="action-input-label" htmlFor="txn-date">Date</label>
          <input
            id="txn-date"
            type="date"
            value={transactionForm.date}
            placeholder={today}
            onChange={(event) =>
              setTransactionForm((current) => ({ ...current, date: event.target.value }))
            }
          />

          {tags.length > 0 && (
            <>
              <p className="action-input-label">Tags</p>
              <div className="tag-chips-list" aria-label="Select tags for this transaction">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    className={`tag-chip-toggle ${selectedTagIds.includes(tag.id) ? 'is-selected' : ''}`}
                    onClick={() => toggleTransactionTag(tag.id)}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </>
          )}

          <button type="submit" disabled={isSaving}>
            Add Transaction
          </button>
        </form>
      </div>
    </section>
  )
}

export default DashboardActions
