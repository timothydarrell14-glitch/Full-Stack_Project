from app.extensions import db

class Transaction(db.Model):
    __tablename__ = "transactions"

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(120), nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey('users.id'))
    amount=db.Column(db.Float, nullable=False)
    date=db.Column(db.Date, nullable=False)
    tag_id=db.Column(db.Integer, db.ForeignKey('tags.id'))
