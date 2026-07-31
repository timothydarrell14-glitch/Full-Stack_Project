from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask import jsonify

from app.models.users import User
from app.extensions import db

class AuthService:

# register new_user
    @classmethod
    def register_user(cls):
        pass

# authenticate user
    @classmethod
    def authenticate_user(cls, email, password):
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            token = create_access_token(identity=str(user.id), additional_claims={
                'email': user.email,
                'id': user.id
            })
            return jsonify({'message': 'Login successful', 'token': token}), 200
        return jsonify({'message': 'Invalid email or password'}), 401

# set password
    @classmethod
    def set_password(cls, user, password):
        hashed_password = generate_password_hash(password)
        user.password = hashed_password
        db.session.commit()

# check password
    @classmethod
    def check_password(cls, user, password):
        return check_password_hash(user.password, password)