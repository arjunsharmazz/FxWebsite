import React, { useState } from "react";
import styles from "./css/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import img from "../assets/forex-trading-giving-up.png";

// Icons
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Education2 from "../animcomponents/Education2";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPolicyRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

  const validateFields = () => {
    const errs = {};
    const trimmedEmail = email.trim();
    if (!trimmedEmail) errs.email = "Email is required.";
    else if (!emailRegex.test(trimmedEmail)) errs.email = "Please enter a valid email address.";
    if (!password) errs.password = "Password is required.";
    else if (/\s/.test(password)) errs.password = "Password must not contain spaces.";
    else if (!passwordPolicyRegex.test(password)) errs.password =
      "Password must be at least 8 characters, include upper & lower case letters, a number and a special character.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const passwordStrength = (pwd) => {
    if (!pwd) return "empty";
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^\w\s]/.test(pwd)) score++;
    if (score <= 2) return "weak";
    if (score === 3 || score === 4) return "medium";
    return "strong";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateFields()) return;

    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // IMPORTANT: use the context login(token) so the context can validate/fetch user
        if (typeof login === "function") {
          try {
            // if login() is async (as in improved context), await it
            await login(data.token);
          } catch (err) {
            // fallback: store token locally if context login fails
            localStorage.setItem("token", data.token);
          }
        } else {
          // fallback for older context: just store the token and call login()
          localStorage.setItem("token", data.token);
          try { login(); } catch (e) {}
        }

        navigate("/");
      } else {
        setError(data.message || "Invalid credentials ❌");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error, please try again ⚠️");
    } finally {
      setLoading(false);
    }
  };

  const pwdStrength = passwordStrength(password);

  return (
    <>
      <Education2 name="Login" />
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

          <div className={styles.divider}><span>or</span></div>

          <form className={styles.form} onSubmit={handleLogin} noValidate>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, email: "" }));
                }}
                required
                aria-invalid={!!fieldErrors.email}
                aria-describedby="email-error"
              />
            </div>
            {fieldErrors.email && (
              <p id="email-error" style={{ color: "red", marginTop: 6 }}>
                {fieldErrors.email}
              </p>
            )}

            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, password: "" }));
                }}
                required
                aria-invalid={!!fieldErrors.password}
                aria-describedby="password-error password-strength"
              />
            </div>
            {fieldErrors.password ? (
              <p id="password-error" style={{ color: "red", marginTop: 6 }}>
                {fieldErrors.password}
              </p>
            ) : (
              password && (
                <p id="password-strength" style={{ marginTop: 6, textTransform: "capitalize" }}>
                  Password strength: {pwdStrength}
                </p>
              )
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" className={styles.primaryBtn} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className={styles.links}>
              <a href="#">Forgot password?</a>
              <span>Don’t have an account? <Link to="/signup">Sign Up</Link></span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
