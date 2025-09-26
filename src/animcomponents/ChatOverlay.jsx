import React from "react";
import ClientSupportChat from "./ClientSupportChat.jsx";
import styles from "./css/ChatOverlay.module.css";

export default function ChatOverlay({ onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.drawer}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button onClick={onClose} className={styles.closeBtn}>
          ×
        </button>
        <ClientSupportChat />
      </div>
    </div>
  );
}
