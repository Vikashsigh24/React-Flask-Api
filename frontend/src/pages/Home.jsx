import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


export default function Home() {

  const location = useLocation();
  const navigate = useNavigate();
  const [msg, setMsg] = useState(location.state?.logoutMsg || "");

  useEffect(() => {
    if (location.state?.logoutMsg) {
      navigate(".", { replace: true, state: {}});
      setTimeout(() => setMsg(""), 2000);
    }
  }, [location.state]);

  return (
    <div className="container py-5">
      {msg && (
        <div className="alert alert-success py-2 my-2 text-center">
          {msg}
        </div>
      )}
      <h1 className="text-center mb-4">Welcome to Task Manager</h1>
      <p className="text-center mb-4">Simple and secure task app with authentication.</p>

      <div className="row justify-content-center">
        <div className="col-sm-6 col-md-4 mb-3">
          <Link to="/login">
            <div className="card text-center shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title">Login</h5>
                <p className="card-text">Access your tasks securely.</p>
                <button className="btn btn-primary mt-auto">Go</button>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-sm-6 col-md-4 mb-3">
          <Link to="/register">
            <div className="card text-center shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title">Register</h5>
                <p className="card-text">Create your account now.</p>
                <button className="btn btn-success mt-auto">Go</button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
