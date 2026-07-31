from app.extensions import db

from marshmallow import EXCLUDE

class Tag(db.Model):
    __tablename__ = 'tags'

    unknown = EXCLUDE

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    transactions = db.relationship('Transaction', back_populates='tag')