import React, { useEffect, useState } from "react";
import styles from "./css/TrustSection.module.css";

const Counter = ({ target, duration, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const increment = end / (duration / 16); // approx 60fps
    let current = start;

    const step = () => {
      current += increment;
      if (current < end) {
        setCount(Math.floor(current));
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [target, duration]);

  return (
    <h3 className={styles.number}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </h3>
  );
};

const TrustSection = () => {
  return (
    <section className={styles.trust}>
      <h2 className={styles.heading}>
        Trusted by Thousands of Traders Worldwide
      </h2>

      <div className={styles.stats}>
        <div className={styles.card}>
          <span className={styles.stars}>⭐⭐⭐⭐⭐</span>
          <p className={styles.text}>Rated 4.9/5 by our community</p>
        </div>

        <div className={styles.card}>
          <Counter target={10000} duration={2000} suffix="+" />
          <p className={styles.text}>Active Users</p>
        </div>

        <div className={styles.card}>
          <Counter target={100000} duration={3500} prefix="$" suffix="+" />
          <p className={styles.text}>Daily Trading Volume</p>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
