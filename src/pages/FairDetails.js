import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function FairDetails() {
  const { id } = useParams();
  const [fair, setFair] = useState(null);

  useEffect(() => {
    const storedFairs =
      JSON.parse(localStorage.getItem("fairs")) || [];

    const selectedFair = storedFairs.find(
      (fair) => fair.id === parseInt(id)
    );

    setFair(selectedFair);
  }, [id]);

  const submitResume = (boothId, file) => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const fileURL = URL.createObjectURL(file);

    const fairs =
      JSON.parse(localStorage.getItem("fairs")) || [];

    const updated = fairs.map((fairItem) => {
      if (fairItem.id === parseInt(id)) {
        return {
          ...fairItem,
          booths: fairItem.booths.map((booth) => {
            if (booth.id === boothId) {
              return {
                ...booth,
                resumes: [
                  ...booth.resumes,
                  {
                    name: file.name,
                    url: fileURL,
                    status: "Pending",
                  },
                ],
              };
            }
            return booth;
          }),
        };
      }
      return fairItem;
    });

    localStorage.setItem("fairs", JSON.stringify(updated));
    setFair(
      updated.find((f) => f.id === parseInt(id))
    );

    alert("Resume submitted successfully!");
  };

  if (!fair) return null;

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h2>{fair.title}</h2>
        <p>Date: {fair.date}</p>

        {fair.booths.map((booth) => (
          <div
            key={booth.id}
            style={{
              background: "rgba(255,255,255,0.08)",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <h3>{booth.name}</h3>
            <p>{booth.description}</p>
            <p><strong>Roles:</strong> {booth.roles}</p>
            <p><strong>Eligibility:</strong> {booth.eligibility}</p>

            <input
              type="file"
              onChange={(e) =>
                submitResume(booth.id, e.target.files[0])
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default FairDetails;