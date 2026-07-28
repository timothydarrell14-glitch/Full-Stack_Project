from flask import Flask, jsonify, request
from app.extensions import db, ma, jwt
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

app = Flask(__name__)

# Configure db, secret key

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'jwt_secret_key'

# Initialise db, ma, jwt
db.init_app(app)
ma.init_app(app)
jwt.init_app(app)

# Initialise migrate

migrate = Migrate (app,db)

if __name__ == "__main__":
    app.run(debug=True)