from flask import Blueprint, jsonify, request

from app.services.auth import AuthService

login_bp = Blueprint('login', __name__, url_prefix='/login')

@login_bp.route('', methods=['POST'])
def login():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({'message': 'Request body must be a JSON object'}), 400

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    return AuthService.authenticate_user(email, password)
