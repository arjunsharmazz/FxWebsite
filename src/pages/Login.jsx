import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./css/Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        {/* Heading */}
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Sign in to continue your trading journey</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.loginBtn}>
            Login
          </button>
        </form>

        {/* Extra Links */}
        <div className={styles.options}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        {/* Create Account CTA */}
        <div className={styles.createAccount}>
          <p>Don’t have an account?</p>
          <Link to="/signup">
            <button className={styles.signupBtn}>Create Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
