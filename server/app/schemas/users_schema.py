from marshmallow import EXCLUDE, fields

from app.extensions import ma
from app.models.users import User


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        unknown = EXCLUDE

    id = fields.Integer(dump_only=True)
    password = fields.String(load_only=True, required=False)


class UserCreateSchema(UserSchema):
    password = fields.String(load_only=True, required=True)


user_schema = UserSchema()
users_schema = UserSchema(many=True)