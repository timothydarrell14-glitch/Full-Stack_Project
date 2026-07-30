from app.extensions import db
from app.models import User

# from werkzeug.security import generate_password_hash, check_password_hash

class UserController:
# add
    @classmethod
    def add_user(cls, data):
        new_user = User(**data)
        db.session.add(new_user)
        db.session.commit()
        return new_user
# get all
    @classmethod
    def get_all_users(cls):
        return User.query.all()
# get 1
    @classmethod
    def get_user(cls, id):
        return User.query.get(id)
# delete
    @classmethod
    def delete(cls, id):
        user = cls.get_user(id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return True
        return None
# update/edit
    @classmethod
    def update(cls, id, data):
        user = cls.get_user(id)

        ##***age change + password change***##
        if user:
            user.name = data.get('name', user.name)
            user.email = data.get('email', user.email)

# authenticate user
# set password
# check password