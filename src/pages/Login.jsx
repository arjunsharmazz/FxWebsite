import React from "react";
import styles from "./css/Login.module.css";

export default function Login() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.card}>
        <h1>
          Welcome to <span className={styles.accent}>PayKuberFX</span>
        </h1>
        <p>Sign in to continue your trading journey.</p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className={styles.inputGroup}>
            <input type="password" placeholder="Enter your password" />
          </div>

          <button type="submit" className={styles.primaryBtn}>
            Login
          </button>

          <div className={styles.links}>
            <a href="#">Forgot password?</a>
            <span>
              Don’t have an account? <a href="/signup">Sign Up</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
