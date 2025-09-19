import React, { useState } from "react";
import styles from "./css/Login.module.css"; // reuse CSS
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/forex-trading-giving-up.png";

// Icons
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match ❌");
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful ✅ Please login.");
        navigate("/login");
      } else {
        setError(data.message || "Signup failed ❌");
      }
    } catch (err) {
      setError("Server error, please try again ⚠️");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.leftPane}>
        <img src={img} alt="Signup Illustration" />
      </div>

      <div className={styles.card}>
        <h1>
          Create your <span className={styles.accent}>PayKuberFX</span> account
        </h1>
        <p>Join us and start your trading journey today.</p>

        <div className={styles.socialLogin}>
          <button className={styles.socialBtn}>
            <FcGoogle size={20} />
            Sign up with Google
          </button>
          <button className={styles.socialBtn} style={{ color: "#1877F2" }}>
            <FaFacebook size={20} />
            Sign up with Facebook
          </button>
        </div>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <form className={styles.form} onSubmit={handleSignup}>
          <div className={styles.inputGroup}>
            {/* <FaUser className={styles.inputIcon} /> */}
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            {/* <FaEnvelope className={styles.inputIcon} /> */}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            {/* <FaLock className={styles.inputIcon} /> */}
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            {/* <FaLock className={styles.inputIcon} /> */}
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button
            type="submit"
            className={styles.primaryBtn}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <div className={styles.links}>
            <span>
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
