from datetime import datetime

from app.extensions import db
from app.models import Transaction
from app.services.paginate import paginate


class TransactionController:
# add
    @classmethod
    def add_transaction(cls, user_id, data):
        payload = dict(data)
        if payload.get('date') and not isinstance(payload['date'], datetime):
            payload['date'] = datetime.strptime(payload['date'], '%Y-%m-%d').date()
        payload['user_id'] = user_id

        new_transaction = Transaction(**payload)
        db.session.add(new_transaction)
        db.session.commit()
        return new_transaction
# get all
    @classmethod
    def get_all_transactions(cls, user_id, page=1, per_page=10):
        query = Transaction.query.filter_by(user_id=user_id)
        return paginate(query, page, per_page)
# get 1
    @classmethod
    def get_transaction(cls, transaction_id, user_id):
        return Transaction.query.filter_by(id=transaction_id, user_id=user_id).first()

    @classmethod
    def delete_transaction(cls, transaction_id, user_id):
        transaction = cls.get_transaction(transaction_id, user_id)
        if transaction:
            db.session.delete(transaction)
            db.session.commit()
            return True
        return None
# update/edit
    @classmethod
    def update_transaction(cls, transaction_id, user_id, data):
        transaction = cls.get_transaction(transaction_id, user_id)
        if transaction:
            payload = dict(data)
            if payload.get('date') and not isinstance(payload['date'], datetime):
                payload['date'] = datetime.strptime(payload['date'], '%Y-%m-%d').date()

            transaction.name = payload.get('name', transaction.name)
            transaction.amount = payload.get('amount', transaction.amount)
            transaction.date = payload.get('date', transaction.date)
            transaction.user_id = user_id
            db.session.commit()
            return transaction
        return None
# get by user
    @classmethod
    def get_transaction_by_user(cls, user_id):
        return Transaction.query.filter_by(user_id=user_id).all()