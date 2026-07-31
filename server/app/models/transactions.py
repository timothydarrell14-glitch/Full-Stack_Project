from app.extensions import db
from app.models.associations import transactions_tags

from marshmallow import EXCLUDE


class Transaction(db.Model):
    __tablename__ = "transactions"

    unknown = EXCLUDE

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)
    tags = db.relationship('Tag', secondary=transactions_tags, back_populates='transactions', lazy=True)
    user = db.relationship('User', back_populates='transactions', lazy=True)

    # validate tags and user
