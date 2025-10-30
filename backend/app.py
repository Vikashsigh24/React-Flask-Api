from flask import Flask
from config import Config
from extensions import db, bcrypt, jwt
from routes.auth import auth_bp
from routes.tasks import tasks_bp
from flask_cors import CORS
from models.user import User
from models.task import Task

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# CORS(app, resources={r"/*": {"origins": "http://localhost:# 5173"}})

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)

with app.app_context():
    db.create_all()  # Auto create tables

@app.route("/")
def index():
    return {"msg": "Backend is running"}

app.register_blueprint(auth_bp)
app.register_blueprint(tasks_bp)

@app.route("/")
def home():
    return {"message": "Flask + SQLAlchemy Backend Running"}

if __name__ == "__main__":
    app.run(debug=True)
