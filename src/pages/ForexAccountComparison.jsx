// File: ForexAccountComparison.jsx
import React, { useState } from "react";
import styles from "./css/ForexAccountComparison.module.css";
import { Link } from "react-router-dom";
import ForexAccounts from "../animcomponents/ForexAccounts";

const ACCOUNT_DATA = [
  { icon: "🤖", name: "Demo", min: "Free", spreads: "Realistic", commission: "No", best: "Beginners" },
  { icon: "💼", name: "Standard", min: "$100+", spreads: "Normal", commission: "No/Low", best: "Intermediate" },
  { icon: "🥇", name: "Mini/Micro/Cent", min: "$10+", spreads: "Slightly higher", commission: "No/Low", best: "Small capital" },
  { icon: "⚡", name: "ECN", min: "$200+", spreads: "Ultra-low", commission: "Yes", best: "Professionals" },
  { icon: "🚀", name: "STP", min: "$100+", spreads: "Moderate", commission: "No/Low", best: "Fast execution" },
  { icon: "🌙", name: "Islamic (Swap-Free)", min: "Varies", spreads: "Normal/Low", commission: "Fixed fee", best: "Muslim traders" },
  { icon: "💎", name: "VIP / Premium", min: "$10,000+", spreads: "Tightest", commission: "Performance", best: "High-volume traders" },
  { icon: "📈", name: "Managed (PAMM)", min: "$500+", spreads: "Varies", commission: "Performance fee", best: "Investors" },
];

export default function ForexAccountComparison() {
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Beginner", "Professional", "Low Deposit"];

  const filtered = ACCOUNT_DATA.filter((a) => {
    if (filter === "All") return true;
    if (filter === "Beginner") return ["Demo", "Mini/Micro/Cent"].includes(a.name);
    if (filter === "Professional") return ["ECN", "VIP / Premium", "STP"].some((t) => a.name.includes(t) || t.includes(a.name));
    if (filter === "Low Deposit") return a.min.includes("$") && parseInt(a.min.replace(/[^0-9]/g, "") || "0") < 200;
    return true;
  });

  return (
    <>
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <div className={styles.logo}>📊</div>
            <h2 className={styles.title}>Forex Account Comparison</h2>
          </div>

          <nav className={styles.filterRow} aria-label="account filters">
            {filters.map((f) => (
              <button
                key={f}
                className={f === filter ? `${styles.filterBtn} ${styles.active}` : styles.filterBtn}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </nav>
        </header>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Account Type</th>
                <th>Minimum Deposit</th>
                <th>Spreads</th>
                <th>Commission</th>
                <th>Best For</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? styles.rowEven : ""}>
                  <td className={styles.typeCell}>
                    <span className={styles.icon}>{row.icon}</span>
                    <div>
                      <div className={styles.name}>{row.name}</div>
                      <div className={styles.meta}>{row.spreads} • {row.commission}</div>
                    </div>
                  </td>
                  <td>{row.min}</td>
                  <td>{row.spreads}</td>
                  <td>{row.commission}</td>
                  <td className={styles.best}>{row.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className={styles.footer}>
          <Link to="/compare" className={styles.primaryBtn}>Compare & Open Account</Link>
          <Link to="/learn-more" className={styles.link}>Learn more about account types</Link>
        </footer>
      </div>
    </div>
    <ForexAccounts />
    </>
  );
}