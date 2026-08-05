import os

from flask import Flask
from app.extensions import db, ma, jwt
from flask_migrate import Migrate
from flask_cors import CORS

migrate = Migrate()

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///app.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "jwt_secret_key")

    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    migrate.init_app(app, db)

    # import blueprints
    from app.routes.users import users_bp
    from app.routes.login import login_bp
    from app.routes.signup import signup_bp
    from app.routes.savings import savings_bp
    from app.routes.transactions import transactions_bp
    from app.routes.tags import tags_bp

    # register blueprints app.register_blueprint(bp, url_prefix="")
    app.register_blueprint(users_bp, url_prefix="/users")
    app.register_blueprint(login_bp, url_prefix="/login")
    app.register_blueprint(signup_bp, url_prefix="/signup")
    app.register_blueprint(savings_bp, url_prefix="/savings")
    app.register_blueprint(transactions_bp, url_prefix="/transactions")
    app.register_blueprint(tags_bp, url_prefix="/tags")

    return app


app = create_app()