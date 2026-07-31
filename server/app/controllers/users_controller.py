from app.extensions import db
from app.models import User
from app.services.paginate import paginate

from flask import request

class UserController:
# add
    @classmethod
    def add_user(cls, data):
        new_user = User(**data)
        new_user.set_password(data['password'])
        db.session.add(new_user)
        db.session.commit()
        return new_user
# get all
    @classmethod
    def get_all_users(cls):
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        return paginate(User, page, per_page)
# get 1
    @classmethod
    def get_user(cls, id):
        return User.query.get(id)
# delete
    @classmethod
    def delete_user(cls, id):
        user = cls.get_user(id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return True
        return None
# update/edit
    @classmethod
    def update_user(cls, id, data):
        user = cls.get_user(id)
        ##***age change + password change***##
        if user:
            user.name = data.get('name', user.name)
            user.email = data.get('email', user.email)
            db.session.commit()
            return user
        return None