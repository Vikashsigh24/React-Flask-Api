from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.task import Task
from extensions import db

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route("/tasks", methods=["GET"])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    query = request.args.get("search")

    if query:
        tasks = Task.query.filter(Task.user_id == user_id, Task.title.ilike(f"%{query}%")).all()
    else:
        tasks = Task.query.filter_by(user_id=user_id).all()

    return jsonify([
        {"id": t.id, "title": t.title, "description": t.description}
        for t in tasks
    ])

@tasks_bp.route("/tasks", methods=["GET"])
@jwt_required()
def search_task():
    user_id = get_jwt_identity()
    query = request.args.get("search", "")
    tasks = Task.query.filter(Task.user_id == user_id, Task.title.ilike(f"%{query}%")).all()
    return jsonify([
        {"id": t.id, "title": t.title, "description": t.description}
        for t in tasks])



@tasks_bp.route("/tasks", methods=["POST"])
@jwt_required()
def add_task():
    data = request.json
    user_id = get_jwt_identity()

    task = Task(title=data["title"], description=data.get("description",""), user_id=user_id)
    db.session.add(task)
    db.session.commit()

    return jsonify({"msg": "Task added"}), 201

@tasks_bp.route("/tasks/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_task(id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=id, user_id=user_id).first()

    if not task:
        return jsonify({"msg": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify({"msg": "Task deleted"})


@tasks_bp.route("/tasks/<int:id>", methods=["PUT"])
@jwt_required()
def update_task(id):
    user_id = int(get_jwt_identity())
    task = Task.query.filter_by(id=id, user_id=user_id).first()

    if not task:
        return jsonify({"msg": "Task not found"}), 404

    data = request.get_json()
    title = data.get("title")
    description = data.get("description")

    if title:
        task.title = title
    if description:
        task.description = description

    db.session.commit()

    return jsonify({
        "msg": "Task updated successfully",
        "task": {
            "id": task.id,
            "title": task.title,
            "description": task.description
        }
    }), 200
