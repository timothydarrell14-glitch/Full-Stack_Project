from app.extensions import db

transactions_tags = db.Table(
    'transactions_tags',
    db.Column('transaction_id', db.Integer, db.ForeignKey('transactions.id'), primary_key=True),
    db.Column('tags_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True)
)