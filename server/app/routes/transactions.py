from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.controllers.transactions_controller import TransactionController
from app.schemas.transactions_schema import transaction_schema, transactions_schema

transactions_bp = Blueprint('transactions', __name__, url_prefix='/transactions')

## CRUD operations
# Get 1
@transactions_bp.route('/<int:transaction_id>', methods=['GET'])
@jwt_required()
def get_transaction(transaction_id):
    current_user_id = int(get_jwt_identity())
    transaction = TransactionController.get_transaction(transaction_id, current_user_id)
    if transaction is None:
        return jsonify({'message': 'Transaction not found'}), 404
    return jsonify(transaction_schema.dump(transaction)), 200

# Get all
@transactions_bp.route('', methods=['GET'])
@jwt_required()
def get_all_transactions():
    current_user_id = int(get_jwt_identity())
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    result = TransactionController.get_all_transactions(current_user_id, page=page, per_page=per_page)
    return jsonify({
        'transactions': transactions_schema.dump(result['items']),
        'pagination': result['pagination'],
    }), 200


# Create
@transactions_bp.route('', methods=['POST'])
@jwt_required()
def create_transaction():
    current_user_id = int(get_jwt_identity())
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify({'message': 'Request body must be a JSON object'}), 400

    transaction = TransactionController.add_transaction(current_user_id, payload)
    return jsonify(transaction_schema.dump(transaction)), 201

# Update
@transactions_bp.route('/<int:transaction_id>', methods=['PUT'])
@jwt_required()
def update_transaction(transaction_id):
    current_user_id = int(get_jwt_identity())
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify({'message': 'Request body must be a JSON object'}), 400

    transaction = TransactionController.update_transaction(transaction_id, current_user_id, payload)
    if transaction is None:
        return jsonify({'message': 'Transaction not found'}), 404
    return jsonify(transaction_schema.dump(transaction)), 200

# Delete
@transactions_bp.route('/<int:transaction_id>', methods=['DELETE'])
@jwt_required()
def delete_transaction(transaction_id):
    current_user_id = int(get_jwt_identity())
    transaction = TransactionController.delete_transaction(transaction_id, current_user_id)
    if transaction is None:
        return jsonify({'message': 'Transaction not found'}), 404
    return jsonify({'message': 'Transaction deleted successfully'}), 200