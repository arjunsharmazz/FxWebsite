import React from "react";
import { Link } from "react-router-dom";
import styles from "./css/CTABanner.module.css";

const CTABanner = () => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          Ready to <span className={styles.highlight}>Start Trading?</span>
        </h2>
        
        <Link to="/signup" className={styles.link}>
          <button className={styles.btn}>Get Started Now</button>
        </Link>
      </div>
    </section>
  );
};

export default CTABanner;
