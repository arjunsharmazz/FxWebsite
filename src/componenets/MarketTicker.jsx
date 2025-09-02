// filepath: [MarketTicker.jsx](http://_vscodecontentref_/0)
import React, { useEffect, useState } from "react";
import styles from "./css/MarketTicker.module.css";

const MarketTicker = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const symbols = ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "USD/CHF"];

    const fetchPrices = async () => {
      try {
        const res = await fetch(
          "https://openexchangerates.org/api/latest.json?app_id=e2d4d582545943abb613003de09da1d5&symbols=EUR,GBP,JPY,AUD,CHF"
        );
        const json = await res.json();
        const rates = json.rates;

        const formatted = symbols.map((pair) => {
          const [base, quote] = pair.split("/");

          let price = null;
          if (base === "USD") {
            price = rates[quote];
          } else if (quote === "USD") {
            price = 1 / rates[base];
          }

          let priceStr = "-";
          if (price) {
            priceStr = quote === "JPY" ? price.toFixed(2) : price.toFixed(4);
          }

          return {
            pair,
            price: priceStr,
            change: (Math.random() * 2 - 1).toFixed(2) + "%", // demo change
          };
        });

        setData(formatted);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 15000); // update every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.tickerSection}>
      <h2 className={styles.heading}> Ahead of the Forex Market</h2>
      <p className={styles.subtext}>Live updates on top Forex pairs.</p>
      <div className={styles.tickerWrapper}>
        <div className={styles.ticker}>
          {data.map((item, idx) => (
            <div key={idx} className={styles.tickerItem}>
              <span className={styles.pair}>{item.pair}</span>
              <span className={styles.price}>${item.price}</span>
              <span
                className={`${styles.change} ${item.change.startsWith("-") ? styles.negative : styles.positive
                  }`}
              >
                {item.change}
              </span>
            </div>
          ))}
          {data.map((item, idx) => (
            <div key={`dup-${idx}`} className={styles.tickerItem}>
              <span className={styles.pair}>{item.pair}</span>
              <span className={styles.price}>${item.price}</span>
              <span
                className={`${styles.change} ${item.change.startsWith("-") ? styles.negative : styles.positive
                  }`}
              >
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketTicker;