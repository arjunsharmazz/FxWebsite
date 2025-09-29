
import React, { useMemo, useState } from "react";
import styles from "./css/ForexAccountComparePanel.module.css";
import Education2 from "../animcomponents/Education2";
import ACCOUNT_DATA from "../dummydata/Acoountdata.js"


const parseMin = (min) => {
  const m = min && typeof min === "string" ? parseInt(min.replace(/[^0-9]/g, "") || "0") : 0;
  return isNaN(m) ? 999999 : m; // Free => 0, Varies => large
};

const spreadsRank = (s) => {
  const rank = {
    "Tightest": 1,
    "Ultra-low": 2,
    "Normal/Low": 3,
    "Normal": 3,
    "Moderate": 4,
    "Realistic": 4,
    "Slightly higher": 5,
    "Varies": 3,
  };
  return rank[s] ?? 3;
};

const commissionRank = (c) => {
  const rank = {
    "No": 1,
    "No/Low": 2,
    "Fixed fee": 3,
    "Performance": 4,
    "Performance fee": 4,
    "Yes": 3,
    "": 3,
  };
  return rank[c] ?? 3;
};

export default function ForexAccountComparePanel({ accounts = ACCOUNT_DATA }) {
  const names = accounts.map((a) => a.name);
  const [left, setLeft] = useState(names[0]);
  const [right, setRight] = useState(names[1] || names[0]);

  const leftAcc = useMemo(() => accounts.find((a) => a.name === left) || accounts[0], [left, accounts]);
  const rightAcc = useMemo(() => accounts.find((a) => a.name === right) || accounts[1] || accounts[0], [right, accounts]);

  const comparison = useMemo(() => {
    const leftMin = parseMin(leftAcc.min);
    const rightMin = parseMin(rightAcc.min);
    const minBetter = leftMin < rightMin ? "left" : rightMin < leftMin ? "right" : "equal";

    const leftSp = spreadsRank(leftAcc.spreads);
    const rightSp = spreadsRank(rightAcc.spreads);
    const spreadsBetter = leftSp < rightSp ? "left" : rightSp < leftSp ? "right" : "equal";

    const leftCom = commissionRank(leftAcc.commission);
    const rightCom = commissionRank(rightAcc.commission);
    const commissionBetter = leftCom < rightCom ? "left" : rightCom < leftCom ? "right" : "equal";

    return { minBetter, spreadsBetter, commissionBetter };
  }, [leftAcc, rightAcc]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
               <Education2 name ="Account Comparison"/>
        <h3 className={styles.title}></h3>
        <p className={styles.subtitle}>Side-by-side comparison to help you choose the best forex account.</p>
      </header>

      <div className={styles.selectorRow}>
        <div className={styles.selectWrap}>
          <label className={styles.label}>Compare</label>
          <select value={left} onChange={(e) => setLeft(e.target.value)} className={styles.select} aria-label="Left account">
            {names.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className={styles.vs}>VS</div>

        <div className={styles.selectWrap}>
          <label className={styles.label}>With</label>
          <select value={right} onChange={(e) => setRight(e.target.value)} className={styles.select} aria-label="Right account">
            {names.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.cardsRow}>
        <article className={`${styles.card} ${comparison.minBetter === 'left' || comparison.spreadsBetter === 'left' || comparison.commissionBetter === 'left' ? styles.cardHighlight : ''}`}>
          <div className={styles.cardHead}>
            <div className={styles.icon}>{leftAcc.icon}</div>
            <div>
              <div className={styles.accName}>{leftAcc.name}</div>
              <div className={styles.accBest}>{leftAcc.best}</div>
            </div>
          </div>

          <ul className={styles.features}>
            <li className={comparison.minBetter === 'left' ? styles.better : ''}><strong>Min:</strong> {leftAcc.min}</li>
            <li className={comparison.spreadsBetter === 'left' ? styles.better : ''}><strong>Spreads:</strong> {leftAcc.spreads}</li>
            <li className={comparison.commissionBetter === 'left' ? styles.better : ''}><strong>Commission:</strong> {leftAcc.commission}</li>
            <li><strong>Notes:</strong> {leftAcc.best}</li>
          </ul>
        </article>

        <article className={`${styles.card} ${comparison.minBetter === 'right' || comparison.spreadsBetter === 'right' || comparison.commissionBetter === 'right' ? styles.cardHighlight : ''}`}>
          <div className={styles.cardHead}>
            <div className={styles.icon}>{rightAcc.icon}</div>
            <div>
              <div className={styles.accName}>{rightAcc.name}</div>
              <div className={styles.accBest}>{rightAcc.best}</div>
            </div>
          </div>

          <ul className={styles.features}>
            <li className={comparison.minBetter === 'right' ? styles.better : ''}><strong>Min:</strong> {rightAcc.min}</li>
            <li className={comparison.spreadsBetter === 'right' ? styles.better : ''}><strong>Spreads:</strong> {rightAcc.spreads}</li>
            <li className={comparison.commissionBetter === 'right' ? styles.better : ''}><strong>Commission:</strong> {rightAcc.commission}</li>
            <li><strong>Notes:</strong> {rightAcc.best}</li>
          </ul>
        </article>
      </div>

      <table className={styles.compareTable}>
        <thead>
          <tr>
            <th></th>
            <th>{leftAcc.name}</th>
            <th>{rightAcc.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Minimum Deposit</td>
            <td className={comparison.minBetter === 'left' ? styles.highlightCell : ''}>{leftAcc.min}</td>
            <td className={comparison.minBetter === 'right' ? styles.highlightCell : ''}>{rightAcc.min}</td>
          </tr>

          <tr>
            <td>Spreads</td>
            <td className={comparison.spreadsBetter === 'left' ? styles.highlightCell : ''}>{leftAcc.spreads}</td>
            <td className={comparison.spreadsBetter === 'right' ? styles.highlightCell : ''}>{rightAcc.spreads}</td>
          </tr>

          <tr>
            <td>Commission</td>
            <td className={comparison.commissionBetter === 'left' ? styles.highlightCell : ''}>{leftAcc.commission}</td>
            <td className={comparison.commissionBetter === 'right' ? styles.highlightCell : ''}>{rightAcc.commission}</td>
          </tr>

          <tr>
            <td>Best For</td>
            <td>{leftAcc.best}</td>
            <td>{rightAcc.best}</td>
          </tr>
        </tbody>
      </table>

      <div className={styles.actions}>
        <button className={styles.primary}>Open {comparison.minBetter === 'left' ? leftAcc.name : rightAcc.name} Account</button>
        <button className={styles.secondary}>Compare More</button>
      </div>
    </div>
  );
}

