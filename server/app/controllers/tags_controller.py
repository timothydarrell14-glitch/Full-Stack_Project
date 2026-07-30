from app.extensions import db
from app.models.tags import Tag

class TagController:
# add
    @classmethod
    def add_tag(cls, data):
        new_tag = Tag(**data)
        db.session.add(new_tag)
        db.session.commit()
        return new_tag

# get all
    @classmethod
    def get_all_tags(cls):
        return Tag.query.all()
# get 1
    @classmethod
    def get_tag(cls, id):
        return Tag.query.get(id)
# delete
    @classmethod
    def delete_tag(cls, tag_id):
        tag = cls.tag(tag_id=id)
        if tag:
            db.session.delete(tag)
            db.session.commit()
        return None
# update/edit
    @classmethod
    def update_tag(cls, tag_id, data):
        tag= cls.get_tag(tag_id=id)
        if tag:
            tag.name= data.get('name', tag.name)
            db.session.commit()
        return None