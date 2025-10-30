import os

class Config:
    SECRET_KEY = "secret_key_here"
    JWT_SECRET_KEY = "jwt_secret_here"

    SQLALCHEMY_DATABASE_URI = "mysql://root:1234@localhost/comment_management"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
