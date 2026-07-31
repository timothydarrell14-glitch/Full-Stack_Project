from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from app.controllers.transactions_controller import TransactionController
from app.schemas.transactions_schema import transaction_schema, transactions_schema

transactions_bp = Blueprint('transactions', __name__, url_prefix='/transactions')

## CRUD operations
# Get 1
@transactions_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_transaction(id):
    transaction = TransactionController.get_transaction(id)
    if transaction is None:
        return jsonify({'message': 'Transaction not found'}), 404
    return jsonify(transaction_schema.dump(transaction)), 200

# Get all
@transactions_bp.route('/', methods=['GET'])
@jwt_required()
def get_all_transactions():
    transactions = TransactionController.get_all_transactions()
    return jsonify(transactions_schema.dump(transactions)), 200

# Create
@transactions_bp.route('/', methods=['POST'])
@jwt_required()
def create_transaction():
    transaction = TransactionController.add_transaction(request.json)
    return jsonify(transaction_schema.dump(transaction)), 201

# Update
@transactions_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_transaction(id):
    transaction = TransactionController.update_transaction(id, request.json)
    if transaction is None:
        return jsonify({'message': 'Transaction not found'}), 404
    return jsonify(transaction_schema.dump(transaction)), 200

# Delete
@transactions_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_transaction(id):
    transaction = TransactionController.delete_transaction(id)
    if transaction is None:
        return jsonify({'message': 'Transaction not found'}), 404
    return jsonify({'message': 'Transaction deleted successfully'}), 200