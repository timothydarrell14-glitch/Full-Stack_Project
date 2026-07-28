from extensions import db

transactions_category = db.Table(
    'transactions_category',
    db.Column('transaction_id', db.Integer, db.ForeignKey('transactions_id'), primary_key=True),
    db.Column('tags_id', db.Integer, db.ForeignKey('tags_id'), primary_key=True)
)