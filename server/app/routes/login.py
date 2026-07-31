from flask import Blueprint, jsonify, request

from app.controllers.users_controller import UserController
from app.schemas.users_schema import user_schema

login_bp = Blueprint('login', __name__, url_prefix='/login')

@login_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = UserController.get_user_by_email(email)
    if user is None:
        return jsonify({'message': 'User not found'}), 404

    if not user.check_password(password):
        return jsonify({'message': 'Invalid password'}), 401

    return jsonify(user_schema.dump(user)), 200