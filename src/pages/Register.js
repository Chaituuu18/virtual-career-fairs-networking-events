import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleRegister = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (user) => user.email === email
    );

    if (existingUser) {
      alert("User already exists");
      return;
    }

    const newUser = {
      email,
      password,
      role,
    };

    localStorage.setItem(
      "users",
      JSON.stringify([...users, newUser])
    );

    alert("Registration successful!");
    navigate("/");
  };

  return (
    <div style={containerStyle}>
      <h2>Register</h2>

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

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={inputStyle}
      >
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={handleRegister} style={buttonStyle}>
        Register
      </button>
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

export default Register;