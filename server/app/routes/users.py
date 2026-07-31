from flask import Blueprint, request, jsonify

from app.controllers.users_controller import UserController
from app.schemas.users_schema import user_schema, users_schema

users_bp = Blueprint('users', __name__, url_prefix='/users')

### CRUD operations
# Get 1
@users_bp.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = UserController.get_user(id)
    if user is None:
        return jsonify({'message': 'User not found'}), 404
    return jsonify(user_schema.dump(user)), 200

# Get all
@users_bp.route('/users', methods=['GET'])
def get_all_users():
    users = UserController.get_all_users()
    return jsonify(users_schema.dump(users)), 200

# Create
@users_bp.route('/users', methods=['POST'])
def create_user():
    user = UserController.add_user(request.json)
    return jsonify(user_schema.dump(user)), 201

# Update
@users_bp.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = UserController.update_user(id, request.json)
    if user is None:
        return jsonify({'message': 'User not found'}), 404
    return jsonify(user_schema.dump(user)), 200

# Delete
@users_bp.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = UserController.delete_user(id)
    if user is None:
        return jsonify({'message': 'User not found'}), 404
    return jsonify({'message': 'User deleted successfully'}), 200