from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy

ma = Marshmallow()
db = SQLAlchemy()
jwt = JWTManager()