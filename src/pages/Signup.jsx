import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./css/Signup.module.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", form);
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupCard}>
        {/* Heading */}
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>
          Join PaykuberFx and start your trading journey today
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.signupBtn}>
            Sign Up
          </button>
        </form>

        {/* Extra Links */}
        <div className={styles.divider}>
          <span>or</span>
        </div>

        <div className={styles.loginLink}>
          <p>Already have an account?</p>
          <Link to="/login">
            <button className={styles.loginBtn}>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
