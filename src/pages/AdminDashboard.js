import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [fairs, setFairs] = useState([]);
  const [fairTitle, setFairTitle] = useState("");
  const [fairDate, setFairDate] = useState("");

  const [selectedFairId, setSelectedFairId] = useState("");
  const [boothName, setBoothName] = useState("");
  const [boothDescription, setBoothDescription] = useState("");
  const [boothRoles, setBoothRoles] = useState("");
  const [boothEligibility, setBoothEligibility] = useState("");

  useEffect(() => {
    const storedFairs = JSON.parse(localStorage.getItem("fairs")) || [];
    setFairs(storedFairs);
  }, []);

  const saveFairs = (updated) => {
    setFairs(updated);
    localStorage.setItem("fairs", JSON.stringify(updated));
  };

  const createFair = () => {
    if (!fairTitle || !fairDate) {
      alert("Enter fair title and date");
      return;
    }

    const newFair = {
      id: Date.now(),
      title: fairTitle,
      date: fairDate,
      booths: [],
    };

    saveFairs([...fairs, newFair]);
    setFairTitle("");
    setFairDate("");
  };

  const addBooth = () => {
    if (
      !boothName ||
      !boothDescription ||
      !boothRoles ||
      !boothEligibility ||
      !selectedFairId
    ) {
      alert("Fill all booth details and select fair");
      return;
    }

    const updated = fairs.map((fair) => {
      if (fair.id === parseInt(selectedFairId)) {
        return {
          ...fair,
          booths: [
            ...fair.booths,
            {
              id: Date.now(),
              name: boothName,
              description: boothDescription,
              roles: boothRoles,
              eligibility: boothEligibility,
              resumes: [],
            },
          ],
        };
      }
      return fair;
    });

    saveFairs(updated);

    setBoothName("");
    setBoothDescription("");
    setBoothRoles("");
    setBoothEligibility("");
  };

  const updateStatus = (fairId, boothId, index, newStatus) => {
    const updatedFairs = fairs.map((fair) => {
      if (fair.id === fairId) {
        return {
          ...fair,
          booths: fair.booths.map((booth) => {
            if (booth.id === boothId) {
              const updatedResumes = [...booth.resumes];
              updatedResumes[index] = {
                ...updatedResumes[index],
                status: newStatus,
              };

              return { ...booth, resumes: updatedResumes };
            }
            return booth;
          }),
        };
      }
      return fair;
    });

    saveFairs(updatedFairs);
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h2>Admin Dashboard</h2>

        {/* Create Fair */}
        <div style={cardStyle}>
          <h3>Create Career Fair</h3>
          <input
            placeholder="Fair Title"
            value={fairTitle}
            onChange={(e) => setFairTitle(e.target.value)}
            style={inputStyle}
          />
          <input
            type="date"
            value={fairDate}
            onChange={(e) => setFairDate(e.target.value)}
            style={inputStyle}
          />
          <button onClick={createFair}>Create Fair</button>
        </div>

        {/* Add Booth */}
        <div style={cardStyle}>
          <h3>Add Company Booth</h3>

          <select
            value={selectedFairId}
            onChange={(e) => setSelectedFairId(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Fair</option>
            {fairs.map((fair) => (
              <option key={fair.id} value={fair.id}>
                {fair.title}
              </option>
            ))}
          </select>

          <input
            placeholder="Company Name"
            value={boothName}
            onChange={(e) => setBoothName(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Company Description"
            value={boothDescription}
            onChange={(e) => setBoothDescription(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Hiring Roles"
            value={boothRoles}
            onChange={(e) => setBoothRoles(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Eligibility Criteria"
            value={boothEligibility}
            onChange={(e) => setBoothEligibility(e.target.value)}
            style={inputStyle}
          />

          <button onClick={addBooth}>Add Booth</button>
        </div>

        {/* Resume Applications */}
        <div style={cardStyle}>
          <h3>Resume Applications</h3>

          {fairs.map((fair) => (
            <div key={fair.id} style={{ marginBottom: "20px" }}>
              <h4>{fair.title}</h4>

              {fair.booths.map((booth) => (
                <div key={booth.id} style={{ marginLeft: "20px" }}>
                  <strong>{booth.name}</strong>

                  {booth.resumes && booth.resumes.length > 0 ? (
                    booth.resumes.map((resume, index) => (
                      <div key={index} style={{ marginLeft: "20px" }}>
                        <a
                          href={resume.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {resume.name}
                        </a>

                        <select
                          value={resume.status}
                          onChange={(e) =>
                            updateStatus(
                              fair.id,
                              booth.id,
                              index,
                              e.target.value
                            )
                          }
                          style={{ marginLeft: "10px" }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    ))
                  ) : (
                    <p style={{ marginLeft: "20px" }}>
                      No resumes submitted.
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "30px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

export default AdminDashboard;