import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("role", user.role);

    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/student");
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />

      <button onClick={handleLogin} style={buttonStyle}>
        Login
      </button>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

const containerStyle = {
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  maxWidth: "400px",
  margin: "auto",
  marginTop: "100px",
  gap: "10px",
};

const inputStyle = {
  padding: "10px",
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  cursor: "pointer",
};

export default Login;