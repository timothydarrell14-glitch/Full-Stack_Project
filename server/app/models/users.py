from app.extensions import db

from werkzeug.security import generate_password_hash, check_password_hash
from marshmallow import EXCLUDE


class User(db.Model):
    __tablename__ = 'users'

    unknown = EXCLUDE

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    age = db.Column(db.Integer)
    password = db.Column(db.String(120), nullable=False, unique=True)
    savings = db.relationship('Saving', back_populates='user', lazy=True)
    transactions = db.relationship('Transaction', back_populates='user', lazy=True)

    # email validation

    # set password
    def set_password(self, password):
        self.password = generate_password_hash(password)

# check password
    def check_password(self, password):
        return check_password_hash(self.password, password)