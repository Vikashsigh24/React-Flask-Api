import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });

 const loadTasks = async () => {
  const token = localStorage.getItem("token"); 

  try {
    const { data } = await API.get("/tasks", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setTasks(data);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};


  const addTask = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  try {
    await API.post("/tasks", task, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTask({ title: "", description: "" });
    loadTasks();
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};

   // Save updated task
  const saveTask = async (id) => {
    await API.put(`/tasks/${id}`, editData);
    setEditId(null);
    loadTasks();
  };

    // Delete task
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    loadTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => { loadTasks(); }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </div>

      <div className="card p-4 mb-4">
        <h4>Add Task</h4>
        <form onSubmit={addTask} className="d-flex flex-column gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={task.description}
            onChange={(e) =>
              setTask({ ...task, description: e.target.value })
            }
            required
          />
          <button type="submit" className="btn btn-primary mt-2">
            Add
          </button>
        </form>
      </div>

      <div className="card p-4">
        <h4>My Tasks</h4>
        <ul className="list-group">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {editId === t.id ? (
                <div className="d-flex gap-2 flex-grow-1">
                  <input
                    className="form-control"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                  />
                  <input
                    className="form-control"
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                  />
                  <button
                    className="btn btn-success"
                    onClick={() => saveTask(t.id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setEditId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="d-flex gap-2 flex-grow-1 align-items-center">
                  <span>{t.title} - {t.description}</span>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => {
                      setEditId(t.id);
                      setEditData({ title: t.title, description: t.description });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTask(t.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
