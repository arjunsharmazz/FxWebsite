import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,  
  CategoryScale,
  LinearScale,  
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./css/LiveChartSection.module.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LiveChartSection = () => {
  const [prices, setPrices] = useState([20000, 21000, 20500, 22000, 21500, 22500, 23000]);
  const [labels] = useState(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);

  // Fake live update (har 3s me random price change)
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => [...prev.slice(1), prev[prev.length - 1] + (Math.random() * 200 - 100)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "BTC/USDT",
        data: prices,
        borderColor: "#00ff99",
        backgroundColor: "rgba(0, 255, 153, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#fff" } },
    },
    scales: {
      x: { ticks: { color: "#aaa" }, grid: { color: "#333" } },
      y: { ticks: { color: "#aaa" }, grid: { color: "#333" } },
    },
  };

  return (
    <section className={styles.chartSection}>
      <div className={styles.content}>
        <h2>📈 Live Market Updates</h2>
        <p>Track real-time price movements of Bitcoin and other assets.</p>
      </div>
      <div className={styles.chartWrapper}>
        <Line data={data} options={options} />
      </div>
    </section>
  );
};

export default LiveChartSection;
