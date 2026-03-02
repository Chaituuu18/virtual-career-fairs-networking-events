import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function Chat() {
  const location = useLocation();
  const company = location.state?.company || "Company";

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Hello 👋 Congratulations! You have been shortlisted by ${company}. How can I help you today?`,
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    const aiMessage = {
      sender: "ai",
      text: generateReply(input),
    };

    setMessages([...messages, userMessage, aiMessage]);
    setInput("");
  };

  const generateReply = (text) => {
    const lower = text.toLowerCase();

    if (lower.includes("hello")) {
      return `Good Morning how can i help youuu.`;
    }

    if (lower.includes("intern")) {
      return `The internship process is available for the 4th year students.`;
    }

    if (lower.includes("interview")) {
      return `The interview process at ${company} includes a technical round followed by HR discussion.`;
    }

    if (lower.includes("role")) {
      return `You have been shortlisted for roles aligned with your skills and eligibility.`;
    }

    if (lower.includes("salary")) {
      return `Compensation details will be shared during the final selection stage.`;
    }

    if (lower.includes("bye")) {
      return `okeyyy have a good day byee.`;
    }

    return `Thank you for your interest in ${company}. Our recruitment team will contact you soon.`;
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h2>💬 Chat with {company}</h2>

        <div
          style={{
            height: "400px",
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "15px",
            background: "white",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                textAlign:
                  msg.sender === "user" ? "right" : "left",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  background:
                    msg.sender === "user"
                      ? "#007bff"
                      : "#e5e5ea",
                  color:
                    msg.sender === "user"
                      ? "white"
                      : "black",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: "80%",
            padding: "8px",
            marginRight: "10px",
          }}
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    </>
  );
}

export default Chat;