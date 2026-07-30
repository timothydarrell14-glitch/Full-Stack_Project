from app.extensions import db
from app.models import Transaction

class TransactionController:
# add
    @classmethod
    def add_transactions(cls, data):
        new_transaction = Transaction(**data)
        db.session.add(new_transaction)
        db.session.commit()
        return new_transaction
# get all
    @classmethod
    def get_all_transactions(cls):
        return Transaction.query.all()
# get 1
    @classmethod
    def get_transaction(cls, id):
        return Transaction.query.get(id)
# delete
    @classmethod
    def delete_transaction(cls, id):
        transaction = cls.get_transaction(id)
        if transaction:
            db.session.delete(transaction)
            db.session.commit()
            return True
        return None
# update/edit
    @classmethod
    def update_transaction(cls, id, data):
        transaction = cls.get_transaction(id)
        if transaction:
            transaction.amount = data.get('amount', transaction.amount)
            transaction.date = data.get('date', transaction.date)
            transaction.tag = data.get('tag', transaction.tag)
            db.session.commit()
        return None
# get by user
    @classmethod
    def get_transaction_by_user(cls, id):
        return Transaction.query.filter_by(user_id=id).all()