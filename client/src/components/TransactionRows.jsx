import '../styles/TransactionRows.css'

const asCurrency = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(amount || 0))

function TransactionRows({ transactions, onDelete }) {
  if (!transactions.length) {
    return <p className="transactions-empty">No transaction records available.</p>
  }

  return (
    <div className="transactions-table" role="table" aria-label="Transactions table">
      <div className="transactions-head" role="rowgroup">
        <p role="columnheader">DATE</p>
        <p role="columnheader">DESCRIPTION</p>
        <p role="columnheader">AMOUNT</p>
        <p role="columnheader">ACTION</p>
      </div>

      <div className="transactions-body" role="rowgroup">
        {transactions.map((transaction) => (
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
    </div>
  )
}

export default TransactionRows
