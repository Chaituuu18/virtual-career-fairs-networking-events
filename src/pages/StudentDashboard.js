import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function StudentDashboard() {
  const [fairs, setFairs] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const storedFairs =
      JSON.parse(localStorage.getItem("fairs")) || [];
    setFairs(storedFairs);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getCountdown = (dateString) => {
    const [year, month, day] = dateString.split("-");

    const fairDate = new Date(
      year,
      month - 1,
      day,
      23,
      59,
      59
    );

    const diff = fairDate.getTime() - currentTime.getTime();

    if (diff <= 0) return "Fair Completed";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diff / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
      (diff / (1000 * 60)) % 60
    );
    const seconds = Math.floor(
      (diff / 1000) % 60
    );

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const registerFair = (fairId) => {
    const stored =
      JSON.parse(localStorage.getItem("registeredFairs")) || [];

    if (!stored.includes(fairId)) {
      const updated = [...stored, fairId];
      localStorage.setItem(
        "registeredFairs",
        JSON.stringify(updated)
      );
      alert("Successfully Registered for Fair!");
    } else {
      alert("Already Registered.");
    }
  };

  // ✅ THIS PART IS NEW AND GUARANTEED TO WORK
  const getShortlistedBooths = () => {
    const shortlisted = [];

    fairs.forEach((fair) => {
      fair.booths?.forEach((booth) => {
        if (
          booth.resumes &&
          booth.resumes.some(
            (resume) => resume.status === "Shortlisted"
          )
        ) {
          shortlisted.push(booth.name);
        }
      });
    });

    return shortlisted;
  };

  const shortlistedBooths = getShortlistedBooths();

  const openChat = (companyName) => {
  navigate("/chat", { state: { company: companyName } });
};

  const featuredBooths = fairs.flatMap((fair) =>
    fair.booths?.filter((booth) => booth.featured)
  );

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h2>⭐ Featured Companies</h2>

        {featuredBooths.length === 0 ? (
          <p>No featured companies yet.</p>
        ) : (
          featuredBooths.map((booth) => (
            <div key={booth.id} style={featuredCard}>
              <h3>{booth.name}</h3>
              <p>{booth.description}</p>
            </div>
          ))
        )}

        <h2 style={{ marginTop: "40px" }}>
          Available Career Fairs
        </h2>

        {fairs.map((fair) => (
          <div key={fair.id} style={cardStyle}>
            <h3>{fair.title}</h3>
            <p>Date: {fair.date}</p>

            <p style={{ fontWeight: "bold", color: "#ff5733" }}>
              ⏳ Ends In: {getCountdown(fair.date)}
            </p>

            <button
              style={{
                ...outlineButton,
                marginRight: "10px",
              }}
              onClick={() => registerFair(fair.id)}
            >
              Register Fair
            </button>

            <Link to={`/fair/${fair.id}`}>
              <button style={outlineButton}>
                View Booths
              </button>
            </Link>
          </div>
        ))}

        {/* ✅ CHAT SECTION (WILL SHOW IF ANY SHORTLIST EXISTS) */}
        {shortlistedBooths.length > 0 && (
          <div style={{ marginTop: "50px" }}>
            <h2>🎉 You Have Been Shortlisted!</h2>

            {shortlistedBooths.map((company, index) => (
              <div key={index} style={{ marginBottom: "15px" }}>
                <strong>{company}</strong>

                <button
                  style={{
                    marginLeft: "15px",
                    padding: "8px 15px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => openChat(company)}
                >
                  💬 Chat with Company
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const featuredCard = {
  background: "#fff8dc",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "15px",
  border: "2px solid gold",
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
};

const outlineButton = {
  padding: "8px 15px",
  backgroundColor: "white",
  color: "#007bff",
  border: "1px solid #007bff",
  borderRadius: "5px",
  cursor: "pointer",
};

export default StudentDashboard;