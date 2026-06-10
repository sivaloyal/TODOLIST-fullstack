import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        {
          username,
          password,
        }
      );

      localStorage.setItem(
        "username",
        response.data.username
      );

      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Credentials");
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <div className="logo">
        <h1>TaskFlow</h1>
        <p>Deep Work Mode</p>
      </div>

      <div className="login-card">
        <h2>Welcome Back</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;