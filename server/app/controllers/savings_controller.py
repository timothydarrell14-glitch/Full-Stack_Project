from datetime import datetime

from app.extensions import db
from app.models.savings import Saving
from app.services.paginate import paginate


class SavingsController:

# get all
    @classmethod
    def get_all_savings(cls, page=1, per_page=10):
        return paginate(Saving, page, per_page)

# get 1
    @classmethod
    def get_saving(cls, saving_id):
        return Saving.query.get(saving_id)

    @classmethod
    def update_saving(cls, saving_id, data):
        saving = cls.get_saving(saving_id)
        if saving:
            payload = dict(data)
            for field in ['goal_date', 'start_date']:
                value = payload.get(field)
                if value and not isinstance(value, datetime):
                    payload[field] = datetime.strptime(value, '%Y-%m-%d').date()

            saving.title = payload.get('title', saving.title)
            saving.goal = payload.get('goal', saving.goal)
            saving.amount = payload.get('amount', saving.amount)
            saving.goal_date = payload.get('goal_date', saving.goal_date)
            saving.start_date = payload.get('start_date', saving.start_date)
            saving.user_id = payload.get('user_id', saving.user_id)
            db.session.commit()
            return saving
        return None
        
# add
    @classmethod
    def add_saving(cls, data):
        payload = dict(data)
        for field in ['goal_date', 'start_date']:
            value = payload.get(field)
            if value and not isinstance(value, datetime):
                payload[field] = datetime.strptime(value, '%Y-%m-%d').date()

        new_savings = Saving(**payload)
        db.session.add(new_savings)
        db.session.commit()
        return new_savings
# delete
    @classmethod
    def delete_saving(cls, saving_id):
        saving = cls.get_saving(saving_id)
        if saving:
            db.session.delete(saving)
            db.session.commit()
            return True
        return None

# get all savings for a user
    @classmethod
    def savings_for_user(cls, user_id):
        return Saving.query.filter_by(user_id=user_id).all()