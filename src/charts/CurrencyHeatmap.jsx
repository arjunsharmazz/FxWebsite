import React, { useEffect, useState } from "react";
import styles from "./CurrencyHeatmap.module.css";
import Education2 from "../animcomponents/Education2";

const currencies = ["EUR", "USD", "GBP", "JPY", "CHF", "AUD", "CNY", "CAD", "INR"];

// random value generator for demo (API connnneect karunga badd m )
const getRandomChange = () => {
  const num = (Math.random() * 0.6 - 0.3).toFixed(2);
  return num;
};

const CurrencyHeatmap = () => {
  const [matrix, setMatrix] = useState({});

  const generateMatrix = () => {
    const newMatrix = {};
    currencies.forEach((row) => {
      newMatrix[row] = {};
      currencies.forEach((col) => {
        newMatrix[row][col] = row === col ? "—" : getRandomChange();
      });
    });
    setMatrix(newMatrix);
  };

  useEffect(() => {
    generateMatrix();
    const interval = setInterval(generateMatrix, 5000); // every 5 sec m  update
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
         <Education2 name="Heatmaps"/>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            {currencies.map((cur) => (
              <th key={cur}>{cur}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currencies.map((row) => (
            <tr key={row}>
              <td className={styles.rowLabel}>{row}</td>
              {currencies.map((col) => {
                const value = matrix[row]?.[col] || "—";
                let cellClass = styles.neutral;
                if (value !== "—") {
                  const num = parseFloat(value);
                  if (num > 0) cellClass = styles.positive;
                  if (num < 0) cellClass = styles.negative;
                }
                return (
                  <td key={col} className={`${styles.cell} ${cellClass}`}>
                    {value !== "—" ? `${value}%` : "—"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyHeatmap;
