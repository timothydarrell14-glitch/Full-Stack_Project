from app.extensions import db
from app.models import User
from app.schemas.users_schema import UserCreateSchema, UserSchema
from app.services.paginate import paginate


class UserController:
# add
    @classmethod
    def add_user(cls, data):
        payload = UserCreateSchema().load(data or {})
        new_user = User(
            name=payload.name,
            email=payload.email,
            age=payload.age,
        )
        new_user.set_password(payload.password)
        db.session.add(new_user)
        db.session.commit()
        return new_user
# get all
    @classmethod
    def get_all_users(cls, page=1, per_page=10):
        return paginate(User, page, per_page)
# get 1
    @classmethod
    def get_user(cls, user_id):
        return User.query.get(user_id)

    @classmethod
    def delete_user(cls, user_id):
        user = cls.get_user(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return True
        return None
# update/edit
    @classmethod
    def update_user(cls, user_id, data):
        user = cls.get_user(user_id)
        if not user:
            return None

        payload = UserSchema(partial=True).load(data or {})
        if hasattr(payload, 'name'):
            user.name = payload.name
        if hasattr(payload, 'email'):
            user.email = payload.email
        if hasattr(payload, 'age'):
            user.age = payload.age
        if hasattr(payload, 'password') and payload.password:
            user.set_password(payload.password)

        db.session.commit()
        return user