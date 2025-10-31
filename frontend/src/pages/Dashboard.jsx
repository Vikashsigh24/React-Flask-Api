import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [searchErrorMsg, setSearchErrorMsg] = useState("");
  const [msg, setMsg] = useState("");

  const loadTasks = async () => {
    const token = localStorage.getItem("token");

    try {
      const { data } = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(data.reverse());

      if (data.length === 0) {
        setErrorMsg("No tasks added");
      } else {
        setErrorMsg("");
      }
    } catch (err) {
      setSearchErrorMsg("Error fetching tasks");
      console.error(err.response?.data || err.message);
    }
  };

  const fetchTasks = async (value) => {
    const token = localStorage.getItem("token");
    setSearch(value);

    try {
      const { data } = await API.get(`/tasks?search=${value}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(data.reverse());

      if (data.length === 0) {
        setErrorMsg("No tasks found");
      } else {
        setErrorMsg("");
      }

    } catch (err) {
      setErrorMsg("Error fetching tasks");
      console.error(err.response?.data || err.message);
    }

  }


  const addTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await API.post("/tasks", task, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTask({ title: "", description: "" });
      setMsg("Task added successfully");
      setTimeout(() => setMsg(""), 2000);
      loadTasks();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Save updated task
  const saveTask = async (id) => {
    await API.put(`/tasks/${id}`, editData);
    setEditId(null);
    setMsg("Task updated successfully");
    setTimeout(() => setMsg(""), 2000);
    loadTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    setMsg("Task deleted successfully");
    setTimeout(() => setMsg(""), 2000);
    loadTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/", {
      state: { logoutMsg: "Logged out successfully" }
    });

  };

  useEffect(() => {
    loadTasks();
    if (location.state?.loginMsg) {
      setMsg(location.state.loginMsg);
      navigate(".", { replace: true, state: {} });
      setTimeout(() => setMsg(""), 2000);
    }

  }, [location.state]);

  return (
    <div className="container mt-5">
      {msg && (
        <div className="alert alert-success py-2 my-2 text-center">
          {msg}
        </div>
      )}
      <input
        className="form-control"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => fetchTasks(e.target.value)}
      />
      {searchErrorMsg && (
        <div className="alert alert-warning py-2 my-2">
          {searchErrorMsg}
        </div>
      )}
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

      <div className="card p-4" style={{ minHeight: "150px" }}>
        <h4>My Tasks</h4>
        {errorMsg && (
          <div className="alert alert-warning py-2 my-2">
            {errorMsg}
          </div>
        )}
        <ul className="list-group">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="list-group-item d-flex align-items-center"
              style={{ minHeight: "55px" }}
            >
              {editId === t.id ? (
                <div className="d-flex gap-2 flex-grow-1 align-items-center">
                  <input
                    className="form-control"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  />
                  <input
                    className="form-control"
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  />

                  <div className="d-flex gap-2 ms-auto">
                    <button className="btn btn-success btn-sm" onClick={() => saveTask(t.id)}>
                      Save
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditId(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="d-flex flex-grow-1 align-items-left">
                  <span className="text-break" style={{ maxWidth: "70%" }}>
                    {t.id}.  {t.title} - {t.description}
                  </span>

                  <div className="d-flex gap-2 ms-auto ps-3">
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
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
