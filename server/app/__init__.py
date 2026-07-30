from flask import Flask, jsonify, request
from app.extensions import db, ma, jwt, cors
from flask_migrate import Migrate
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

migrate = Migrate()


def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = "jwt_secret_key"

    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    migrate.init_app(app, db)

    # import blueprints

    # register blueprints app.register_blueprint(bp, url_prefix="")

    return app


app = create_app()