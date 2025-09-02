import React from "react";
import styles from "./css/QuickAccess.module.css";

const QuickAccess = () => {
  return (
    <section className={styles.quickAccess}>
      <h2 className={styles.heading}>Quick Access</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.title}>Start Demo Trading</h3>
          <p className={styles.text}>
            Experience the platform with a free demo account.
          </p>
          <button className={styles.btn}>Start Demo</button>
        </div>
        <div className={styles.card}>
          <h3 className={styles.title}>Top Strategies</h3>
          <p className={styles.text}>
            Learn from expert insights and proven trading strategies.
          </p>
          <button className={styles.btn}>Explore</button>
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
