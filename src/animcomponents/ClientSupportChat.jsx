// ClientSupportChat.jsx
import React, { useState, useRef, useEffect } from "react";
import styles from "./css/ClientSupportChat.module.css";

export default function ClientSupportChat() {
  const [messages, setMessages] = useState([
    { id: 1, from: "agent", text: "Hello! How can I help you with your Forex account today?", time: "09:00" },
    { id: 2, from: "client", text: "I want to know why my margin call happened.", time: "09:01" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    // auto-scroll to bottom when messages change
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  function sendMessage() {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      from: "client",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((m) => [...m, newMsg]);
    setInput("");

    // simulate agent typing + response
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          from: "agent",
          text: "A margin call happens when your equity falls below the required margin. You can reduce position size or add funds to avoid it.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setTyping(false);
    }, 1200);
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Client Support</div>
        <div className={styles.status}>Online • Forex Support</div>
      </div>

      <div className={styles.messageList} ref={listRef}>
        {messages.map((m) => (
          <div key={m.id} className={`${styles.message} ${m.from === 'client' ? styles.client : styles.agent}`}>
            <div className={styles.bubble}>{m.text}</div>
            <div className={styles.msgTime}>{m.time}</div>
          </div>
        ))}

        {typing && (
          <div className={`${styles.message} ${styles.agent}`}>
            <div className={styles.bubble}>
              <div className={styles.typingDots}>
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.inputRow}>
        <textarea
          className={styles.textarea}
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          rows={1}
        />
        <button className={styles.sendBtn} onClick={sendMessage} aria-label="Send">Send</button>
      </div>
    </div>
  );
}


