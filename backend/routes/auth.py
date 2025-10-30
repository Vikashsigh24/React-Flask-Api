from flask import Blueprint, jsonify, request
from models.user import User
from extensions import db, bcrypt
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"msg": "User already exists"}), 400
    
    user = User(name=data["name"], email=data["email"])
    user.set_password(data["password"])

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "User registered"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(email=data["email"]).first()

    if not user or not user.check_password(data["password"]):
        return jsonify({"msg": "Invalid credentials"}), 401
    
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"token": access_token})
