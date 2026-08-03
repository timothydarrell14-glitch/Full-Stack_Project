from flask import Blueprint, jsonify, request
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError

from app.controllers.users_controller import UserController
from app.extensions import db
from app.schemas.users_schema import user_schema

signup_bp = Blueprint('signup', __name__, url_prefix='/signup')


@signup_bp.route('', methods=['POST'])
def signup():
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify({'message': 'Request body must be a JSON object'}), 400

    try:
        user = UserController.add_user(payload)
    except (ValidationError, ValueError) as exc:
        errors = exc.messages if hasattr(exc, 'messages') else {'email': [str(exc)]}
        return jsonify({'message': 'Validation failed', 'errors': errors}), 400
    except IntegrityError:
        db.session.rollback()
        return jsonify({'message': 'Email already exists'}), 409

    return jsonify(user_schema.dump(user)), 201
