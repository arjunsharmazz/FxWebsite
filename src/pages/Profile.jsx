import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/Profile.module.css"; // optional, CSS below
import { useAuth } from "../context/AuthContext"; // safe to import — will be used if available

export default function Profile() {
  const navigate = useNavigate();
  const auth = useAuth(); // may be undefined if no provider, so guard its usage
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // not logged in -> redirect to login
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.REACT_APP_API_URL}api/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          // invalid token -> remove & go to login
          localStorage.removeItem("token");
          // if auth context exists, call its logout (it may also handle redirects)
          if (auth && typeof auth.logout === "function") {
            auth.logout();
          } else {
            navigate("/login");
          }
          return;
        }

        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Failed to fetch profile");
        } else {
          setUser(data.user);
        }
      } catch (err) {
        setError("Server error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleLogout = () => {
    // remove token from storage
    localStorage.removeItem("token");
    // if you have an auth context with logout, prefer that (it may clear more state)
    if (auth && typeof auth.logout === "function") {
      auth.logout();
      return;
    }
    // otherwise navigate to login (or home) — choose login for clarity
    navigate("/login");
  };

  if (loading) {
    return <div className={styles.container}>Loading profile...</div>;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <h2>Account</h2>
            <p className={styles.subtitle}>Your account details</p>
          </div>

          {/* Logout button (minimal) */}
          <div>
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#fff",
                padding: "8px 12px",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div className={styles.topRow}>
          <div className={styles.avatar}>
            {user.name ? user.name.split(" ").map(n => n[0]).slice(0,2).join("").toUpperCase() : "U"}
          </div>

          <div className={styles.infoCol}>
            <div className={styles.name}>{user.name || "-"}</div>
            <div className={styles.email}>{user.email || "-"}</div>
          </div>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Name</span>
          <span className={styles.value}>{user.name || "-"}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>{user.email || "-"}</span>
        </div>
        {/* optional: show createdAt */}
        {user.createdAt && (
          <div className={styles.row}>
            <span className={styles.label}>Member since</span>
            <span className={styles.value}>
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
