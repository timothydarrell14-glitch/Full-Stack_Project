# from flask import Flask
# from flask_cors import CORS
# from flask_migrate import Migrate

# from app.extensions import db, ma, jwt

# migrate = Migrate()


# def create_app():
#     app = Flask(__name__)

#     app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
#     app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
#     app.config["JWT_SECRET_KEY"] = "jwt_secret_key"

#     db.init_app(app)
#     ma.init_app(app)
#     jwt.init_app(app)
#     CORS(app)
#     migrate.init_app(app, db)

#     return app


# app = create_app()