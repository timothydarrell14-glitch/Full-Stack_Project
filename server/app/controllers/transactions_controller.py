from app.extensions import db
from app.models import Transaction
from app.services.paginate import paginate

from flask import request

class TransactionController:
# add
    @classmethod
    def add_transaction(cls, data):
        new_transaction = Transaction(**data)
        db.session.add(new_transaction)
        db.session.commit()
        return new_transaction
# get all
    @classmethod
    def get_all_transactions(cls):
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        return paginate(Transaction, page, per_page)
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
            return transaction
        return None
# get by user
    @classmethod
    def get_transaction_by_user(cls, id):
        return Transaction.query.filter_by(user_id=id).all()