import React, { useState, useEffect } from "react";
import "./ChatBot.css";

function ChatBot({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // Initial empathetic welcome
    setMessages([
      {
        from: "bot",
        text: "👋 Hello! Welcome to MyShop Support.",
      },
      {
        from: "bot",
        text:
          "I’m really sorry you’re facing an issue 😔. Don’t worry, I’m here to help you.",
      },
      {
        from: "bot",
        text:
          "Please tell me briefly, what problem are you facing?",
      },
    ]);
  }, []);

  const addMessage = (msg) =>
    setMessages((prev) => [...prev, msg]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    addMessage({ from: "user", text: userText });
    setInput("");

    /* STEP FLOW */
    if (step === 0) {
      // After problem description
      addMessage({
        from: "bot",
        text:
          "Thank you for explaining your issue 🙏. I understand how frustrating this can be.",
      });
      addMessage({
        from: "bot",
        text:
          "📞 Please share your mobile number so our support team can contact you.",
      });
      setStep(1);
    } 
    else if (step === 1) {
      // Validate phone number
      if (!/^[6-9]\d{9}$/.test(userText)) {
        addMessage({
          from: "bot",
          text:
            "❌ That doesn’t look like a valid Indian mobile number. Please enter a 10-digit number starting with 6-9.",
        });
        return;
      }

      setPhone(userText);

      addMessage({
        from: "bot",
        text:
          "✅ Thank you! Your number has been received safely.",
      });
      addMessage({
        from: "bot",
        text:
          "📞 Our customer support executive will call you shortly on this number.",
      });
      addMessage({
        from: "bot",
        text:
          "Please explain your problem clearly during the call, and we’ll make sure it gets resolved as soon as possible 😊",
      });
      addMessage({
        from: "bot",
        text:
          "Is there anything else I can help you with right now?",
      });

      setStep(2);
    } 
    else {
      addMessage({
        from: "bot",
        text:
          "🙏 Thank you for reaching out to MyShop Support. We truly appreciate your patience.",
      });
      addMessage({
        from: "bot",
        text:
          "Have a great day ahead 🌸",
      });
    }
  };

  return (
    <div className="chatbot-overlay">
      <div className="chatbot-box">
        <div className="chatbot-header">
          <span>💬 MyShop Support</span>
          <button onClick={onClose}>✖</button>
        </div>

        <div className="chatbot-messages">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.from}`}>
              {m.text}
            </div>
          ))}
        </div>

        <div className="chatbot-input">
          <input
            type={step === 1 ? "tel" : "text"}
            placeholder={
              step === 1
                ? "Enter your mobile number"
                : "Type your message..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
