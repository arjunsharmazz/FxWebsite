import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./css/Navbar.module.css";
import { useAuth } from "../context/AuthContext";

const links = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Live", path: "/liveforex" },
  { label: "News", path: "/news" },
  { label: "Live2", path: "/liveforex2" },
];

const itemVariants = {
  hidden: { opacity: 0, y: -6 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.25, ease: "easeOut" },
  }),
};

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { pathname } = useLocation();
  const { isLoggedIn } = useAuth();

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className={styles.navbar}>
      {/* Logo */}
      <motion.div
        className={styles.logo}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <Link to="/">PaykuberFx</Link>
      </motion.div>

      {/* Desktop Menu */}
      <nav className={styles.menu}>
        {links.map((l, i) => (
          <motion.div
            key={l.path}
            variants={itemVariants}
            initial="hidden"
            animate="show"
            custom={i}
            whileHover={{ scale: 1.06 }}
          >
            <Link
              to={l.path}
              className={pathname === l.path ? styles.activeLink : ""}
            >
              {l.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      <div className={styles.actions}>
        {isLoggedIn ? (
          // Only show Account (links to /profile)
          <Link to="/profile">
            <button className={styles.loginBtn}>Account</button>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <button className={styles.loginBtn}>Login</button>
            </Link>
            <Link to="/signup">
              <button className={styles.startBtn}>Start Free Trial</button>
            </Link>
          </>
        )}
      </div>

      {/* Hamburger (Mobile) */}
      <button
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        className={`${styles.hamburger} ${isOpen ? styles.active : ""}`}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.path}
                variants={itemVariants}
                initial="hidden"
                animate="show"
                custom={i}
                whileHover={{ scale: 1.04 }}
              >
                <Link
                  to={l.path}
                  className={pathname === l.path ? styles.activeLink : ""}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}

            <div className={styles.mobileActions}>
              {isLoggedIn ? (
                <Link to="/profile">
                  <button className={styles.loginBtn}>Profile</button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <button style={{ border: "2px solid white" }} className={styles.loginBtn}>
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className={styles.startBtn}>Start Free Trial</button>
                  </Link>
                </>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
  