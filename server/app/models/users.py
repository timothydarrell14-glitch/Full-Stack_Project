from app.extensions import db
import re

from werkzeug.security import generate_password_hash, check_password_hash
from marshmallow import EXCLUDE
from sqlalchemy.orm import validates


EMAIL_PATTERN = re.compile(r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')


class User(db.Model):
    __tablename__ = 'users'

    unknown = EXCLUDE

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    age = db.Column(db.Integer)
    password = db.Column(db.String(120), nullable=False)
    savings = db.relationship('Saving', back_populates='user', lazy=True)
    transactions = db.relationship('Transaction', back_populates='user', lazy=True)
    role = db.Column(db.String, nullable=False, default='client')

    # set password
    def set_password(self, password):
        self.password = generate_password_hash(password)

# check password
    def check_password(self, password):
        return check_password_hash(self.password, password)

    @validates('email')
    def validate_email(self, key, email):
        if not isinstance(email, str) or not email.strip():
            raise ValueError('Email is required')

        normalized_email = email.strip().lower()
        if not EMAIL_PATTERN.fullmatch(normalized_email):
            raise ValueError('Invalid email format')

        return normalized_email