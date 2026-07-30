from app.extensions import db
from app.models.tags import Tag

class TagController:
# add
    @classmethod
    def add(cls, data):
        new_tag = Tag(**data)
        db.session.add(new_tag)
        db.session.commit()
        return new_tag

# get all
    @classmethod
    def get_all(cls):
        return Tag.query.all()
# get 1
    @classmethod
    def get_one(cls, id):
        return Tag.query.get(id)
# delete
    @classmethod
    def delete(cls, tag_id):
        tag = cls.get_one(tag_id=id)
        if tag:
            db.session.delete(tag)
            db.session.commit()
        return None
# update/edit
    @classmethod
    def update(cls, tag_id, data):
        tag= cls.get_one(tag_id=id)
        if tag:
            tag.name= data.get('name', tag.name)