import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./CurrencyChart.module.css";
import CurrencyHeatmap from "./CurrencyHeatmap";
import Education2 from "../animcomponents/Education2";
import News from "../pages/News";
import NewsletterSection from "../componenets/NewsletterSection";
import CTABanner from "../componenets/CTABanner";
import Loading from "../animcomponents/Loading";

const CurrencyChart = () => {
  const [data, setData] = useState([]);
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("1Y");

  const endDate = new Date().toISOString().split("T")[0];
  const startDates = {
    "1D": "2025-09-16",
    "1M": "2025-08-17",
    "3M": "2025-06-17",
    "1Y": "2024-09-17",
    "5Y": "2020-09-17",
    All: "2000-01-01",
  };

  const fetchData = async () => {
    try {
      // Historical USD → INR data
      const res = await axios.get(
        `https://api.frankfurter.app/${startDates[range]}..${endDate}?from=USD&to=INR`
      );
      const rateData = Object.entries(res.data.rates).map(([date, value]) => ({
        date,
        rate: value.INR,
      }));
      setData(rateData);

      // Latest live rates (USD base)
      const res2 = await axios.get(
        "https://api.frankfurter.app/latest?from=USD&to=INR,EUR,GBP,JPY"
      );
      setRates(res2.data.rates);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching rates:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [range]);

  if (loading) return <Loading/>;

  return (
    <>
    <div className={styles.container}>
      <Education2 name="Live forex"/>

      {/* Cards */}
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <img src="https://flagcdn.com/us.svg" alt="usd" className={styles.flag} />
          <span>USD to INR</span>
          <strong>{rates.INR.toFixed(3)} INR</strong>
          <small>-0.07%</small>
        </div>
        <div className={styles.card}>
          <img src="https://flagcdn.com/eu.svg" alt="eur" className={styles.flag} />
          <span>EUR to INR</span>
          <strong>{(rates.EUR * rates.INR).toFixed(3)} INR</strong>
          <small>-0.32%</small>
        </div>
        <div className={styles.card}>
          <img src="https://flagcdn.com/jp.svg" alt="jpy" className={styles.flag} />
          <span>JPY to INR</span>
          <strong>{(rates.JPY * rates.INR).toFixed(5)} INR</strong>
          <small>-0.23%</small>
        </div>
        <div className={styles.card}>
          <img src="https://flagcdn.com/gb.svg" alt="gbp" className={styles.flag} />
          <span>GBP to INR</span>
          <strong>{(rates.GBP * rates.INR).toFixed(3)} INR</strong>
          <small>-0.17%</small>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <XAxis dataKey="date" hide />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="rate"
            stroke="#eb1c26ff"
            fill="url(#colorRate)"
          />
          <defs>
            <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d44a6dff" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#1976d2" stopOpacity={0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>

      {/* Range buttons */}
      <div className={styles.rangeButtons}>
        {["1D", "1M", "3M", "1Y", "5Y", "All"].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`${styles.rangeBtn} ${range === r ? styles.active : ""}`}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
    <CurrencyHeatmap />
    <News/>
    <NewsletterSection />
    <CTABanner />
    </>
  );
};

export default CurrencyChart;
