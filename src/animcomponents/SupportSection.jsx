// SupportSection.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./css/SupportSection.module.css";
import Education2 from "./Education2";

export default function SupportSection() {
  const messages = [
    {
      id: 1,
      author: "Client",
      avatarLetter: "C",
      time: "09:12",
      text: "I’m having trouble understanding how leverage works in Forex trading.",
    },
    {
      id: 2,
      author: "Forex Support",
      avatarLetter: "F",
      time: "09:13",
      text:
        "Leverage allows you to control a larger position with a smaller amount of capital. For example, 1:100 leverage means $1000 margin lets you control $100,000 in the market.",
    },
    {
      id: 3,
      author: "Client",
      avatarLetter: "C",
      time: "09:14",
      text: "Got it! And is there a risk of losing more than I deposit?",
    },
    {
      id: 4,
      author: "Forex Support",
      avatarLetter: "F",
      time: "09:15",
      text:
        "Great question. With negative balance protection, you cannot lose more than your deposit. Your account will automatically stop out before going negative.",
    },
  ];

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let i = 0;
    const revealInterval = 1000;
    const t = setInterval(() => {
      i += 1;
      setVisibleCount(i);
      if (i >= messages.length) clearInterval(t);
    }, revealInterval);
    return () => clearInterval(t);
  }, []);

  return (
    <section className={styles.wrapper}>
      <Education2 name="Support" />
      <div className={styles.grid}>
        <div className={styles.chatColumn}>
          <div className={styles.bubbleStack}>
            {messages.map((m, idx) => (
              <ChatBubble
                key={m.id}
                author={m.author}
                avatarLetter={m.avatarLetter}
                time={m.time}
                text={m.text}
                visible={idx < visibleCount}
                index={idx}
              />
            ))}
          </div>
        </div>

        <motion.div
          className={styles.copyColumn}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className={styles.headline}>
            <span className={styles.accent}>24/7</span> support
          </h3>
          <p className={styles.sub}>29 seconds average response time</p>
        </motion.div>
      </div>
    </section>
  );
}

function ChatBubble({ author, avatarLetter, time, text, visible, index }) {
  return (
    <motion.div
      className={`${styles.bubbleWrap} ${visible ? styles.visible : ""}`}
      initial={{ opacity: 0, x: -20 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.3 }}
    >
      <div className={styles.avatar}>{avatarLetter}</div>
      <div className={styles.bubble}>
        <div className={styles.meta}>
          <div className={styles.author}>{author}</div>
          <div className={styles.time}>{time}</div>
        </div>
        <div className={styles.text}>{text}</div>
        <svg
          className={styles.tail}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M0 0 L24 0 L0 24 Z"
            fill="#ffffff"
            stroke="#e6e7ea"
            strokeWidth="0.6"
            transform="translate(0,6) rotate(45 12 12)"
          />
        </svg>
      </div>
    </motion.div>
  );
}
