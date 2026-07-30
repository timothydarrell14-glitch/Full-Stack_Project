from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

ma = Marshmallow()
db = SQLAlchemy()
jwt = JWTManager()
cors = CORS()