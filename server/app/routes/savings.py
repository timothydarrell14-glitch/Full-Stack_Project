from flask import Blueprint, jsonify, request

from app.extensions import db
from app.controllers.savings_controller import SavingsController
from app.schemas.savings_schema import SavingSchema

savings_bp = Blueprint('savings', __name__, url_prefix='/savings')

## CRUD operations

# Get 1
@savings_bp.route('/savings/<int:id>', methods=['GET'])
def get_saving(id):
    saving = SavingsController.get_saving(id)
    if saving is None:
        return jsonify({'message': 'Saving not found'}), 404
    return jsonify(SavingSchema().dump(saving)), 200

# Get all by user
@savings_bp.route('/savings', methods=['GET'])
def get_all_savings():
    savings = SavingsController.get_all_savings()
    return jsonify(SavingSchema(many=True).dump(savings)), 200

# Post
@savings_bp.route('/savings', methods=['POST'])
def add_saving():
    new_saving = SavingsController.add_saving(request.json)
    return jsonify(SavingSchema().dump(new_saving)), 201

# Update
@savings_bp.route('/savings/<int:saving_id>', methods=['PUT'])
def update_saving(saving_id):
    updated_saving = SavingsController.update_saving(saving_id, request.json)
    if updated_saving is None:
        return jsonify({'message': 'Saving not found'}), 404
    return jsonify(SavingSchema().dump(updated_saving)), 200

# Delete
@savings_bp.route('/savings/<int:saving_id>', methods=['DELETE'])
def delete_saving(saving_id):
    deleted_saving = SavingsController.delete_saving(saving_id)
    if deleted_saving is None:
        return jsonify({'message': 'Saving not found'}), 404
    return jsonify({'message': 'Saving deleted'}), 200