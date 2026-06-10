import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/register/",
        {
          username,
          email,
          password,
        }
      );

      alert("Registration Successful!");
      navigate("/");
    } catch (error) {
      alert("Registration Failed");
      console.log(error);
    }
  };

  return (
    <div className="register-page">
      <div className="logo">
        <h1>TaskFlow</h1>
        <p>Deep Work Mode</p>
      </div>

      <div className="register-card">
        <h2>Create your account</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>
          Register
        </button>

        <p>
          Already have an account?
          <Link to="/"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;