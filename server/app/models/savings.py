from app.extensions import db

from marshmallow import EXCLUDE


class Saving(db.Model):
    __tablename__ = 'saving_goals'

    unknown = EXCLUDE

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    goal = db.Column(db.Integer)
    amount = db.Column(db.Integer)
    goal_date = db.Column(db.Date)
    start_date = db.Column(db.Date)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='savings', lazy=True)