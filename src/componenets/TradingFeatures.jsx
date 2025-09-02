import React from "react";
import styles from "./css/TradingFeatures.module.css";
import { TrendingUp, BookOpen, Headphones, Lightbulb } from "lucide-react";

export default function TradingFeatures() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>On your way</h2>
        <p>to confident trading</p>
      </div>

      <div className={styles.grid}>
        {/* Card 1 */}
        <div className={styles.card}>
          <Headphones className={styles.icon} />
          <h3>24/7 Support</h3>
          <p>in your language anytime you need</p>
        </div>

        {/* Card 2 */}
        <div className={styles.card}>
          <TrendingUp className={styles.icon} />
          <h3>Trading Signals</h3>
          <p>help you notice profitable trends</p>
        </div>

        {/* Card 3 */}
        <div className={styles.card}>
          <Lightbulb className={styles.icon} />
          <h3>Ready-to-use strategies</h3>
          <p>Test and apply instantly</p>
        </div>

        {/* Card 4 */}
        <div className={styles.card}>
          <BookOpen className={styles.icon} />
          <h3>Learning Materials</h3>
          <p>Guides, courses & YouTube tutorials</p>
        </div>
      </div>
    </section>
  );
}
