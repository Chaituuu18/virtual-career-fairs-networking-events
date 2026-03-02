import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function StudentProfile() {
  const [notifications, setNotifications] = useState([]);
  const [registeredFairs, setRegisteredFairs] = useState([]);

  useEffect(() => {
    setNotifications(
      JSON.parse(localStorage.getItem("notifications")) || []
    );
    setRegisteredFairs(
      JSON.parse(localStorage.getItem("registeredFairs")) || []
    );
  }, []);

  return (
    <>
      <Navbar />
      <div style={container}>
        <h2 style={{ marginBottom: "40px", fontSize: "32px" }}>
          My Profile
        </h2>

        <div style={luxuryCard}>
          <h3>Notifications</h3>
          {notifications.length === 0 ? (
            <p>No new notifications.</p>
          ) : (
            notifications.map((n, i) => (
              <div key={i} style={{ marginBottom: "15px" }}>
                <p>{n.message}</p>
                <small>{n.time}</small>
              </div>
            ))
          )}
        </div>

        <div style={luxuryCard}>
          <h3>Registered Career Fairs</h3>
          {registeredFairs.length === 0 ? (
            <p>No registrations yet.</p>
          ) : (
            registeredFairs.map((fair, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <p>Fair ID: {fair}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

const container = {
  padding: "60px",
  position: "relative",
  zIndex: 1,
};

const luxuryCard = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
  padding: "35px",
  marginBottom: "40px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
  border: "1px solid rgba(255,255,255,0.2)",
  transition: "all 0.3s ease",
};

export default StudentProfile;