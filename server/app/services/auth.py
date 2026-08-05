
from flask_jwt_extended import create_access_token
from flask import jsonify

from app.models.users import User

class AuthService:
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

    # @classmethod
    # def authenticate_admin(cls, email, password):
    #     user = User.query.filter_by(email=email, role='admin').first()
    #     if user and user.check_password(password):
    #         token = create_access_token(identity=str(user.id), additional_claims={
    #             'email': user.email,
    #             'id': user.id,
    #             'role': user.role
    #         })
    #         return jsonify({'message': 'Admin login successful', 'token': token}), 200
    #     return jsonify({'message': 'Invalid email or password or not an admin'}), 401