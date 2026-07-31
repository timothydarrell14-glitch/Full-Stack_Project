from marshmallow import ValidationError
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from app.controllers.users_controller import UserController
from app.schemas.users_schema import user_schema, users_schema

users_bp = Blueprint('users', __name__, url_prefix='/users')

### CRUD operations
# Get 1
@users_bp.route('/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    user = UserController.get_user(user_id)
    if user is None:
        return jsonify({'message': 'User not found'}), 404
    return jsonify(user_schema.dump(user)), 200

# Get all
@users_bp.route('', methods=['GET'])
@jwt_required()
def get_all_users():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    result = UserController.get_all_users(page=page, per_page=per_page)
    return jsonify({
        'users': users_schema.dump(result['items']),
        'pagination': result['pagination'],
    }), 200


# Create
@users_bp.route('', methods=['POST'])
@jwt_required()
def create_user():
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify({'message': 'Request body must be a JSON object'}), 400
    
    try:
            user = UserController.add_user(payload)
    except ValidationError as exc:
            return jsonify({'message': 'Validation failed', 'errors': exc.messages}), 400
    return jsonify(user_schema.dump(user)), 201

# Update
@users_bp.route('/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify({'message': 'Request body must be a JSON object'}), 400

    try:
        user = UserController.update_user(user_id, payload)
    except ValidationError as exc:
        return jsonify({'message': 'Validation failed', 'errors': exc.messages}), 400

    if user is None:
        return jsonify({'message': 'User not found'}), 404
    return jsonify(user_schema.dump(user)), 200

# Delete
@users_bp.route('/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    user = UserController.delete_user(user_id)
    if user is None:
        return jsonify({'message': 'User not found'}), 404
    return jsonify({'message': 'User deleted successfully'}), 200