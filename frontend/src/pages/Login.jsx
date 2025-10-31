import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const location = useLocation();
  const navigate = useNavigate();
  const [msg, setMsg] = useState(location.state?.registrationMsg || "");

  useEffect(() => {
    if(location.state?.registrationMsg){
      navigate(".", { replace: true, state: {}});
      setTimeout(() => setMsg(""), 2000);
    }
  }, [location.state]);

  const handleSubmit = async(e) => {
  e.preventDefault();
  try {
    const { data } = await API.post("/login", {
      email: form.email,    
      password: form.password
    });

    localStorage.setItem("token", data.token);
    navigate("/dashboard", {
      state: { loginMsg: "Login Successful" }
    });
  } catch (err) {
    setMsg("Login failed. Please check your credentials.");
    setTimeout(() => setMsg(""), 2000);
    console.log(err.response?.data);
  }
};


  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      {msg && (
        <div className="alert alert-success py-2 my-2 text-center">
          {msg}
        </div>
      )}
      <form onSubmit={handleSubmit} className="border p-4 shadow rounded">
        <h2 className="mb-4 text-center">Login</h2>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  )
}
