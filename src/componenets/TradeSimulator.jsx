import React, { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";
import { motion } from "framer-motion";
import styles from "./css/TradeSimulator.module.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler);

const PAIRS = {
  EURUSD: { base: "EUR", quote: "USD", label: "EUR/USD" },
  GBPUSD: { base: "GBP", quote: "USD", label: "GBP/USD" },
  USDJPY: { base: "USD", quote: "JPY", label: "USD/JPY" },
};

const getFrankfurterPair = (base, quote) => {
  if (base === "USD" && quote === "JPY") return { base: "USD", quote: "JPY" };
  return { base, quote };
};

const TradeSimulator = () => {
  const [asset, setAsset] = useState("EURUSD");
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({ price: 0 });

  const { base, quote, label } = PAIRS[asset];
  const frankfurter = getFrankfurterPair(base, quote);

  // Initial data fetch
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 2);
        const url = `https://api.frankfurter.app/${start
          .toISOString()
          .slice(0, 10)}..${end.toISOString().slice(0, 10)}?from=${
          frankfurter.base
        }&to=${frankfurter.quote}`;
        const res = await fetch(url);
        const json = await res.json();
        const rates = Object.values(json.rates);
        let arr = [];
        let p = rates[rates.length - 1][frankfurter.quote];
        for (let i = 0; i < 60; i++) {
          p += (Math.random() - 0.5) * (p * 0.001);
          arr.push({ t: Date.now() - (60 - i) * 1000, p });
        }
        if (mounted) setSeries(arr);
        if (mounted) setMeta({ price: arr[arr.length - 1].p });
      } catch (e) {
        console.error("History fetch error:", e);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [asset, frankfurter.base, frankfurter.quote]);

  // Poll for live price
  useEffect(() => {
    let active = true;
    const tick = async () => {
      try {
        const url = `https://api.frankfurter.app/latest?from=${frankfurter.base}&to=${frankfurter.quote}`;
        const res = await fetch(url);
        const json = await res.json();
        const price = json.rates[frankfurter.quote];
        if (!active || !price) return;

        setMeta({ price });

        setSeries((prev) => {
          const t = Date.now();
          let p = price + (Math.random() - 0.5) * (price * 0.001);
          const next = [...prev, { t, p }];
          return next.length > 240 ? next.slice(next.length - 240) : next;
        });
      } catch (e) {
        console.error("Live tick error:", e);
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [asset, frankfurter.base, frankfurter.quote]);

  const chartData = useMemo(() => {
    const labels = series.map((d) =>
      new Date(d.t).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
    const prices = series.map((d) => d.p);
    return {
      labels,
      datasets: [
        {
          label: label,
          data: prices,
          borderColor: "#ff1e00ff",
          backgroundColor: "rgba(182, 74, 55, 0.12)",
          tension: 0.35,
          pointRadius: 0,
          fill: true,
        },
      ],
    };
  }, [series, label]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
      scales: {
        x: { ticks: { color: "#9ca3af" }, grid: { color: "#222" } },
        y: {
          ticks: { color: "#9ca3af" },
          grid: { color: "#222" },
          beginAtZero: false,
        },
      },
    }),
    []
  );

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* Left: Live chart */}
        <motion.div
          className={styles.chartCard}
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <div className={styles.chartHeader}>
            <div className={styles.pair}>
              <span className={styles.dot} />
              {label}
            </div>
            <div className={styles.assetSwitch}>
              {Object.keys(PAIRS).map((k) => (
                <button
                  key={k}
                  className={`${styles.switchBtn} ${asset === k ? styles.active : ""}`}
                  onClick={() => setAsset(k)}
                >
                  {PAIRS[k].label}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.chartWrap}>
            {loading && <div className={styles.loader}>Loading chart…</div>}
            <Line data={chartData} options={options} />
          </div>
        </motion.div>

        {/* Right: Info panel */}
        <motion.aside
          className={styles.infoCard}
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h3 className={styles.infoTitle}>Live Forex Overview</h3>
          <div className={styles.row}>
            <span>Current Price</span>
            <strong>{meta.price ? meta.price.toFixed(4) : "-"}</strong>
          </div>
          <div className={styles.row}>
            <span>24h Change</span>
            <strong style={{ color: "#9ca3af" }}>-</strong>
          </div>
          <div className={styles.row}>
            <span>24h Volume</span>
            <strong>-</strong>
          </div>
        </motion.aside>
      </motion.div>
    </section>
  );
};

export default TradeSimulator;
