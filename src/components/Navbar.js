import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];
    setNotificationCount(notifications.length);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        marginBottom: "30px",
      }}
    >
      <h3
        style={{ margin: 0, color: "#007bff", cursor: "pointer" }}
        onClick={() =>
          role === "admin"
            ? navigate("/admin")
            : navigate("/student")
        }
      >
        Virtual Career Fair
      </h3>

      <div>
        {role === "student" && (
          <>
            <button
              onClick={() => navigate("/student")}
              style={navButtonStyle}
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/profile")}
              style={navButtonStyle}
            >
              My Profile
            </button>

            <button
              onClick={() => navigate("/profile")}
              style={{
                ...navButtonStyle,
                position: "relative",
              }}
            >
              Notifications
              {notificationCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "3px 7px",
                    fontSize: "10px",
                  }}
                >
                  {notificationCount}
                </span>
              )}
            </button>
          </>
        )}

        <button
          onClick={handleLogout}
          style={{
            ...navButtonStyle,
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const navButtonStyle = {
  marginRight: "10px",
  padding: "8px 15px",
  borderRadius: "5px",
  border: "1px solid #007bff",
  backgroundColor: "white",
  color: "#007bff",
  cursor: "pointer",
};

export default Navbar;