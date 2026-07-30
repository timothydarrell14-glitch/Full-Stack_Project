from app.extensions import ma
from app.models.savings import Saving

class SavingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Saving
        load_instance = True

saving_schema = SavingSchema()
savings_schema = SavingSchema(many=True)