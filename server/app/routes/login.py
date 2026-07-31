from flask import Blueprint, jsonify, request

from app.controllers.users_controller import UserController

login_bp = Blueprint('login', __name__, url_prefix='/login')

@login_bp.route('/', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    return UserController.authenticate_user(email, password)