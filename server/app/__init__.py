import os

from flask import Flask, jsonify
from app.extensions import db, ma, jwt
from flask_migrate import Migrate
from flask_cors import CORS

migrate = Migrate()

def create_app():
    app = Flask(__name__)
    CORS(app,
        origins=os.environ.get("FRONTEND_URL"),
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

    uri = os.environ.get("DATABASE_URL")
    if uri and uri.startswith("postgres://"):
        uri = uri.replace("postgres://", "postgresql://", 1)


    app.config["SQLALCHEMY_DATABASE_URI"] = uri or "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "jwt_secret_key")

    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    # import blueprints
    from app.routes.users import users_bp
    from app.routes.login import login_bp
    from app.routes.signup import signup_bp
    from app.routes.savings import savings_bp
    from app.routes.transactions import transactions_bp
    from app.routes.tags import tags_bp

    # register blueprints
    app.register_blueprint(users_bp)
    app.register_blueprint(login_bp)
    app.register_blueprint(signup_bp)
    app.register_blueprint(savings_bp)
    app.register_blueprint(transactions_bp)
    app.register_blueprint(tags_bp)

    @app.route('/')
    def home():
        return jsonify({'message': 'Welcome to EXECUTIVE'}), 200

    return app


app = create_app()