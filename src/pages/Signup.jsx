import React, { useState } from "react";
import styles from "./css/Login.module.css"; 
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/forex-trading-giving-up.png";

// Icons
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Education2 from "../animcomponents/Education2";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({}); // { name: '', email: '', password: '', confirmPassword: '' }
  const [loading, setLoading] = useState(false);

  // Email regex: solid basic validation (no leading/trailing spaces, normal email format)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password policy:
  // - min 8 chars
  // - at least one lowercase
  // - at least one uppercase
  // - at least one digit
  // - at least one special char
  // - no spaces
  const passwordPolicyRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

  const validateFields = () => {
    const errs = {};

    if (!name || !name.trim()) {
      errs.name = "Full name is required.";
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errs.email = "Email is required.";
    } else if (!emailRegex.test(trimmedEmail)) {
      errs.email = "Please enter a valid email address.";
    }

    if (!password) {
      errs.password = "Password is required.";
    } else if (/\s/.test(password)) {
      errs.password = "Password must not contain spaces.";
    } else if (!passwordPolicyRegex.test(password)) {
      errs.password =
        "Password must be at least 8 characters, include upper & lower case letters, a number and a special character.";
    }

    if (!confirmPassword) {
      errs.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }

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

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // client-side validation first
    const ok = validateFields();
    if (!ok) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password,
          }),
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

  const pwdStrength = passwordStrength(password);

  return (
    <>
      <Education2 name="Signup" />
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

          <form className={styles.form} onSubmit={handleSignup} noValidate>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, name: "" }));
                }}
                required
                aria-invalid={!!fieldErrors.name}
                aria-describedby="name-error"
              />
            </div>
            {fieldErrors.name && (
              <p id="name-error" style={{ color: "red", marginTop: 6 }}>
                {fieldErrors.name}
              </p>
            )}

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
                <p
                  id="password-strength"
                  style={{ marginTop: 6, textTransform: "capitalize" }}
                >
                  Password strength: {pwdStrength}
                </p>
              )
            )}

            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
                required
                aria-invalid={!!fieldErrors.confirmPassword}
                aria-describedby="confirm-password-error"
              />
            </div>
            {fieldErrors.confirmPassword && (
              <p
                id="confirm-password-error"
                style={{ color: "red', marginTop: 6" }}
              >
                {fieldErrors.confirmPassword}
              </p>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" className={styles.primaryBtn} disabled={loading}>
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
    </>
  );
}
