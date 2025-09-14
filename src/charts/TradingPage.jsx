import React from "react";
import { motion } from "framer-motion";
import Chart from "./Chart";
import styles from "./TradingPage.module.css";

export default function TradingPage() {
  return (
    <div className={styles.container}>
      {/* Left Sidebar */}
      <motion.div 
        className={styles.sidebar}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <ul>
          <li>📊 Trades</li>
          <li>🌍 Market</li>
          <li>📅 Events</li>
          <li>❓ Help</li>
        </ul>
      </motion.div>

      {/* Main Chart */}
      <div className={styles.chartSection}>
        <Chart />
      </div>

      {/* Right Panel */}
      <motion.div 
        className={styles.panel}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <div className={styles.field}>
          <label>Amount, $</label>
          <input type="number" defaultValue="100" />
        </div>
        <div className={styles.field}>
          <label>Duration</label>
          <input type="text" defaultValue="1 min" />
        </div>
        
        <div className={styles.buttons}>
          <motion.button 
            className={styles.buy}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
          >
            Buy ↑
          </motion.button>
          <motion.button 
            className={styles.sell}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
          >
            Sell ↓
          </motion.button>
        </div>
        <div className={styles.profit}>Profit: $8.40</div>
      </motion.div>
    </div>
  );
}
