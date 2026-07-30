from app.extensions import db
from app.models.savings import Saving

class SavingsController:

# get all
    @classmethod
    def get_all_savings(cls):
        return Saving.query.all()

# get 1
    @classmethod
    def get_saving(cls, id):
        return Saving.query.get(id)
# update
    @classmethod
    def update_saving(cls, saving_id, data):
        saving = cls.get_saving(saving_id=id)
        if saving:
            saving.title = data.get('title', saving.title)
            saving.goal = data.get('goal', saving.goal)
            saving.goal_date = data.get('goal_date', saving.start_date)
            saving.start_date = data.get('start_date', saving.start_date)
            db.session.commit()
            return saving
        return None
        
# add
    @classmethod
    def add_saving(cls, data):
        new_savings = Saving(**data)
        db.session.add(new_savings)
        db.session.commit()
# delete
    @classmethod
    def delete_saving(cls, saving_id):
        saving = cls.get_saving(saving_id=id)
        if saving:
            db.session.delete(saving)
            db.session.commit()
            return True
        return False

# get all savings for a user
    @classmethod
    def savings_for_user(cls, user_id):
        return Saving.query.filter_by(user_id=user_id).all()