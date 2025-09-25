import React, { useState } from "react";
import styles from "./css/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import img from "../assets/forex-trading-giving-up.png";

// Icons
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLock, FaUser } from "react-icons/fa";
import Education2 from "../animcomponents/Education2";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        login();
        navigate("/");
      } else {
        setError(data.message || "Invalid credentials ❌");
      }
    } catch (err) {
      setError("Server error, please try again ⚠️");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Education2 name = "Login"/>
    <div className={styles.loginPage}>
      <div className={styles.leftPane}>
        <img src={img} alt="Trading illustration" />
      </div>

      <div className={styles.card}>
        <h1>
          Welcome to <span className={styles.accent}>PayKuberFX</span>
        </h1>
        <p>Sign in to continue your trading journey.</p>

        <div className={styles.socialLogin}>
          <button className={styles.socialBtn}>
            <FcGoogle size={20} />
            Sign in with Google
          </button>
          <button className={styles.socialBtn} style={{ color: "#1877F2" }}>
            <FaFacebook size={20} />
            Sign in with Facebook
          </button>
        </div>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            {/* <FaUser className={styles.inputIcon} /> */}
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

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className={styles.primaryBtn} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className={styles.links}>
            <a href="#">Forgot password?</a>
            <span>
              Don’t have an account? <Link to="/signup">Sign Up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
