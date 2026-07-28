from app.extensions import db

class Saving(db.Model):
    __tablename__ = 'saving_goals'

    id=db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String(120), nullable=False)
    goal=db.Column(db.Integer)
    goal_date=db.Column(db.Date)
    start_date=db.Column(db.Date)
    user_id=db.Column(db.Integer, db.ForeignKey('users.id'))