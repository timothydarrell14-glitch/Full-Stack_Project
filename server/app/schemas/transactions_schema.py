from marshmallow import fields

from app.extensions import ma
from app.models.transactions import Transaction
from app.schemas.tags_schema import TagSchema


class TransactionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Transaction
        load_instance = True

    tags = fields.Nested(TagSchema, many=True, dump_only=True)
    tag_ids = fields.List(fields.Integer(), load_only=True, required=False)

transaction_schema = TransactionSchema()
transactions_schema = TransactionSchema(many=True)