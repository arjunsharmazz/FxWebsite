import React from "react";
import styles from "./css/Login.module.css"; // same CSS reuse

export default function Signup() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.card}>
        <h1>
          Create your <span className={styles.accent}>PayKuberFX</span> account
        </h1>
        <p>Join us and start your trading journey today.</p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <input type="text" placeholder="Enter your full name" />
          </div>
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className={styles.inputGroup}>
            <input type="password" placeholder="Enter your password" />
          </div>
          <div className={styles.inputGroup}>
            <input type="password" placeholder="Confirm your password" />
          </div>

          <button type="submit" className={styles.primaryBtn}>
            Sign Up
          </button>

          <div className={styles.links}>
            <span>
              Already have an account? <a href="/login">Login</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
