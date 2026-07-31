from app.extensions import ma
from app.models.tags import Tag

class TagSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tag
        load_instance = True

tag_schema = TagSchema()
tags_schema = TagSchema(many=True)