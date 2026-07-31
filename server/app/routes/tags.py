from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from app.controllers.tags_controller import TagsController
from app.schemas.tags_schema import TagSchema

tags_bp = Blueprint('tags', __name__, url_prefix='/tags')

## CRUD operations
# Get 1
@tags_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_tag(id):
    tag = TagsController.get_tag(id)
    if tag is None:
        return jsonify({'message': 'Tag not found'}), 404
    return jsonify(TagSchema().dump(tag)), 200

# Get all
@tags_bp.route('', methods=['GET'])
@jwt_required()
def get_all_tags():
    tags = TagsController.get_all_tags()
    return jsonify(TagSchema(many=True).dump(tags)), 200

# Post
@tags_bp.route('', methods=['POST'])
@jwt_required()
def add_tag():
    new_tag = TagsController.add_tag(request.json)
    return jsonify(TagSchema().dump(new_tag)), 201

# Update
@tags_bp.route('/<int:tag_id>', methods=['PUT'])
@jwt_required()
def update_tag(tag_id):
    updated_tag = TagsController.update_tag(tag_id, request.json)
    if updated_tag is None:
        return jsonify({'message': 'Tag not found'}), 404
    return jsonify(TagSchema().dump(updated_tag)), 200

# Delete
@tags_bp.route('/<int:tag_id>', methods=['DELETE'])
@jwt_required()
def delete_tag(tag_id):
    deleted_tag = TagsController.delete_tag(tag_id)
    if deleted_tag is None:
        return jsonify({'message': 'Tag not found'}), 404
    return jsonify({'message': 'Tag deleted'}), 200