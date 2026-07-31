from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from app.controllers.savings_controller import SavingsController
from app.schemas.savings_schema import SavingSchema

savings_bp = Blueprint('savings', __name__, url_prefix='/savings')

## CRUD operations

# Get 1
@savings_bp.route('/<int:saving_id>', methods=['GET'])
@jwt_required()
def get_saving(saving_id):
    saving = SavingsController.get_saving(saving_id)
    if saving is None:
        return jsonify({'message': 'Saving not found'}), 404
    return jsonify(SavingSchema().dump(saving)), 200

# Get all by user
@savings_bp.route('', methods=['GET'])
@jwt_required()
def get_all_savings():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    result = SavingsController.get_all_savings(page=page, per_page=per_page)
    return jsonify({
        'savings': SavingSchema(many=True).dump(result['items']),
        'pagination': result['pagination'],
    }), 200


# Post
@savings_bp.route('', methods=['POST'])
@jwt_required()
def add_saving():
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify({'message': 'Request body must be a JSON object'}), 400

    new_saving = SavingsController.add_saving(payload)
    return jsonify(SavingSchema().dump(new_saving)), 201

# Update
@savings_bp.route('/<int:saving_id>', methods=['PUT'])
@jwt_required()
def update_saving(saving_id):
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify({'message': 'Request body must be a JSON object'}), 400

    updated_saving = SavingsController.update_saving(saving_id, payload)
    if updated_saving is None:
        return jsonify({'message': 'Saving not found'}), 404
    return jsonify(SavingSchema().dump(updated_saving)), 200

# Delete
@savings_bp.route('/<int:saving_id>', methods=['DELETE'])
@jwt_required()
def delete_saving(saving_id):
    deleted_saving = SavingsController.delete_saving(saving_id)
    if deleted_saving is None:
        return jsonify({'message': 'Saving not found'}), 404
    return jsonify({'message': 'Saving deleted'}), 200