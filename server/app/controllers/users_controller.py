from app.extensions import db
from app.models import User

from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask import jsonify

class UserController:
# add
    @classmethod
    def add_user(cls, data):
        new_user = User(**data)
        db.session.add(new_user)
        db.session.commit()
        return new_user
# get all
    @classmethod
    def get_all_users(cls):
        return User.query.all()
# get 1
    @classmethod
    def get_user(cls, id):
        return User.query.get(id)
# delete
    @classmethod
    def delete(cls, id):
        user = cls.get_user(id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return True
        return None
# update/edit
    @classmethod
    def update(cls, id, data):
        user = cls.get_user(id)

        ##***age change + password change***##
        if user:
            user.name = data.get('name', user.name)
            user.email = data.get('email', user.email)

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