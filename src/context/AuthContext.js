// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // optional if you want user info
  const [initializing, setInitializing] = useState(true);

  // helper: fetch /me to validate token and get user
  const fetchMe = useCallback(
    async (tok) => {
      try {
        const t = tok || localStorage.getItem("token");
        if (!t) {
          setUser(null);
          setToken(null);
          return false;
        }

        const res = await fetch(`${process.env.REACT_APP_API_URL}api/auth/me`, {
          headers: { Authorization: `Bearer ${t}` },
        });

        if (res.status === 401) {
          // invalid/expired token
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
          return false;
        }

        if (!res.ok) throw new Error("Failed to validate token");

        const data = await res.json();
        setUser(data.user || null);
        setToken(t);
        return true;
      } catch (err) {
        console.error("fetchMe error:", err);
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        return false;
      }
    },
    []
  );

  // login: save token, validate and set user
  const login = useCallback(
    async (newToken) => {
      if (!newToken) return;
      localStorage.setItem("token", newToken);
      const ok = await fetchMe(newToken);
      // optionally navigate after login
      if (ok) {
        // remain on current page or navigate("/") // your choice
      }
    },
    [fetchMe]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/"); // send to home or login as you prefer
  }, [navigate]);

  // on mount: initialize from localStorage and validate token
  useEffect(() => {
    (async () => {
      const existing = localStorage.getItem("token");
      if (existing) {
        await fetchMe(existing);
      }
      setInitializing(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoggedIn: !!user,
        login,   // call login(token) after successful server login
        logout,
        initializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
