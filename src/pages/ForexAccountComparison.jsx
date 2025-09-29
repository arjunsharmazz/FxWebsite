
import React, { useState, useMemo } from "react";
import styles from "./css/ForexAccountComparison.module.css";
import { Link } from "react-router-dom";
import ForexAccounts from "../animcomponents/ForexAccounts";
import Education2 from "../animcomponents/Education2";
import ACCOUNT_DATA from "../dummydata/Acoountdata.js"
export default function ForexAccountComparison() {
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Beginner", "Professional", "Low Deposit"];

  const filtered = useMemo(() => {
    if (filter === "All") return ACCOUNT_DATA;
    if (filter === "Beginner") return ACCOUNT_DATA.filter((a) => ["Demo", "Mini/Micro/Cent"].includes(a.name));
    if (filter === "Professional") return ACCOUNT_DATA.filter((a) => ["ECN", "VIP / Premium", "STP"].some((t) => a.name.includes(t) || t.includes(a.name)));
    if (filter === "Low Deposit") return ACCOUNT_DATA.filter((a) => a.min.includes("$") && parseInt(a.min.replace(/[^0-9]/g, "") || "0") < 200);
    return ACCOUNT_DATA;
  }, [filter]);

  return (
    <>
      <Education2 name ="Comparison"/>
      <section className={styles.wrapper} aria-labelledby="acc-compare-title">
        <div className={styles.card} role="region" aria-label="Forex account comparison card">
          <header className={styles.header}>
            <div className={styles.titleBlock}>
              <div className={styles.logo} aria-hidden>📊</div>
              <div>
                <h2 id="acc-compare-title" className={styles.title}>Forex Account Comparison</h2>
                <p className={styles.subtitle}>Fast overview — choose the right account for your trading style</p>
              </div>
            </div>

            <nav className={styles.filterRow} aria-label="account filters">
              {filters.map((f) => (
                <button
                  key={f}
                  className={`${styles.filterBtn} ${f === filter ? styles.active : ""}`}
                  onClick={() => setFilter(f)}
                  aria-pressed={f === filter}
                >
                  {f}
                </button>
              ))}
            </nav>
          </header>

          <div className={styles.tableWrap}>
            <table className={styles.table} role="table">
              <thead>
                <tr>
                  <th scope="col">Account Type</th>
                  <th scope="col">Minimum Deposit</th>
                  <th scope="col">Spreads</th>
                  <th scope="col">Commission</th>
                  <th scope="col">Best For</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr key={row.name} className={`${styles.row} ${i % 2 === 0 ? styles.rowEven : ""}`} tabIndex={0}>
                    <td className={styles.typeCell}>
                      <span className={styles.icon} aria-hidden>{row.icon}</span>
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
      </section>

      <ForexAccounts />
    </>
  );
}

