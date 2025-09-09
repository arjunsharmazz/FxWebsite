import React, { useEffect, useState, useRef } from "react";
import styles from "./css/LiveForex.module.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { color } from "chart.js/helpers";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export default function LiveForex() {
  const [base, setBase] = useState("usd");
  const [rates, setRates] = useState({});
  const [filter, setFilter] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState("eur");
  const [history, setHistory] = useState({}); // { inr: [val1, val2,...], eur: [...], ... }
  const mountedRef = useRef(true);

  // Fetch rates and update history
  const fetchRates = async () => {
    try {
      const res = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base.toLowerCase()}.json`
      );
      const data = await res.json();
      // Ensure proper structure
      const current = data?.[base.toLowerCase()] ?? {};

      // set rates
      setRates(current);

      // update history
      setHistory((prev) => {
        const next = { ...prev };
        Object.entries(current).forEach(([sym, val]) => {
          if (!next[sym]) next[sym] = [];
          // keep last 60 points
          const arr = [...next[sym], Number(val)].slice(-60);
          next[sym] = arr;
        });
        return next;
      });
    } catch (e) {
      console.error("fetchRates error:", e);
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    fetchRates();
    // faster for demo; you can change to 10s / 30s in production
    const id = setInterval(() => {
      if (mountedRef.current) fetchRates();
    }, 4000);

    return () => {
      mountedRef.current = false;
      clearInterval(id);
    };
  }, [base]);

  // prepare list to show
  const list = Object.entries(rates || {})
    .map(([sym, val]) => ({ symbol: sym.toUpperCase(), rate: Number(val) }))
    .filter((s) => (filter ? s.symbol.includes(filter.toUpperCase()) : true))
    .sort((a, b) => a.symbol.localeCompare(b.symbol));

  // Default selected
  useEffect(() => {
    if (!selected && list.length) setSelected(list[0].symbol.toLowerCase());
  }, [list, selected]);

  const toggleFavorite = (symbol) => {
    setFavorites((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  // Chart dataset for selected pair
  const selLower = (selected || "").toLowerCase();
  const selHistory = history[selLower] || [];
  const chartData = {
    labels: selHistory.map((_, i) => i + 1),
    datasets: [
      {
        label: `${base.toUpperCase()}/${(selected || "").toUpperCase()}`,
        data: selHistory,
        fill: true,
        tension: 0.25,
        borderWidth: 2,
        pointRadius: 0,
        borderColor: "rgba(255,80,80,1)",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return "rgba(255,80,80,0.12)";
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(255,80,80,0.18)");
          gradient.addColorStop(1, "rgba(60,10,10,0.02)");
          return gradient;
        },
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#2b0b0b",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: { display: true, grid: { color: "rgba(255,255,255,0.02)" }, ticks: { color: "#ffb3b3" } },
      y: { display: true, grid: { color: "rgba(255,255,255,0.02)" }, ticks: { color: "#ffb3b3" } },
    },
  };

  // mini sparkline data for small cards
  const sparkConfig = (sym) => ({
    labels: (history[sym] || []).map((_, i) => i),
    datasets: [
      {
        data: history[sym] || [],
        borderColor: "rgba(255,70,70,0.9)",
        tension: 0.3,
        borderWidth: 1.4,
        pointRadius: 0,
        fill: true,
        backgroundColor: "rgba(255,70,70,0.12)",
      },
    ],
  });
  const sparkOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: false } },
    elements: { line: { tension: 0.3 } },
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.header}>
          <h2 style={{color:"blue"}}>Status : It is still a work in progress </h2>
          <h1>LIVE FOREX MARKET</h1>
          <div className={styles.headerActions}>
            <button
              className={styles.favOnly}
              onClick={() => {
                // filter to favorites quickly by toggling filter field (UX choice)
                if (filter === "__FAV__") setFilter("");
                else setFilter("__FAV__");
              }}
            >
              Favorites
            </button>
            <input
              className={styles.baseInput}
              value={base.toUpperCase()}
              onChange={(e) => setBase(e.target.value.toLowerCase())}
              placeholder="Base (USD)"
            />
          </div>
        </div>

        <div className={styles.body}>
          {/* LEFT: list */}
          <div className={styles.left}>
            <div className={styles.searchWrap}>
              <input
                className={styles.search}
                placeholder="Search currency (e.g., EUR)"
                value={filter === "__FAV__" ? "" : filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>

            <div className={styles.list}>
              {list.length === 0 && <div className={styles.empty}>No pairs found</div>}

              {list.map((item) => {
                const symLower = item.symbol.toLowerCase();
                const isFav = favorites.includes(item.symbol);
                // if filter toggled to favorites only
                if (filter === "__FAV__" && !isFav) return null;

                return (
                  <div
                    key={item.symbol}
                    className={`${styles.pair} ${selected === symLower ? styles.selectedPair : ""}`}
                    onClick={() => setSelected(symLower)}
                  >
                    <div className={styles.pairLeft}>
                      <div className={styles.pairSymbol}>{item.symbol}</div>
                      <div className={styles.sparkMini}>
                        <Line data={sparkConfig(symLower)} options={sparkOptions} />
                      </div>
                    </div>

                    <div className={styles.pairRight}>
                      <div className={styles.rate}>{item.rate.toFixed(4)}</div>
                      <div
                        className={styles.change}
                        // fake small change color based on last 2 history values
                        style={{
                          color:
                            (history[symLower] && history[symLower].slice(-2)[0] < history[symLower].slice(-1)[0]) ||
                            false
                              ? "#ff7b7b"
                              : "#ff7b7b",
                        }}
                      >
                        {/* We're not calculating actual % change from API; show placeholder */}
                        {(Math.random() * -1).toFixed(2)}%
                      </div>
                      <button
                        className={`${styles.star} ${isFav ? styles.starOn : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.symbol);
                        }}
                        aria-label="favorite"
                      >
                        {isFav ? "★" : "☆"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: large chart + details */}
          <div className={styles.right}>
            <div className={styles.bigCard}>
              <div className={styles.bigHeader}>
                <div>
                  <h3>
                    {base.toUpperCase()}/{(selected || "").toUpperCase()}
                  </h3>
                  <div className={styles.bigSub}>
                    {rates?.[selected] ? Number(rates[selected]).toFixed(6) : "—"}
                  </div>
                </div>
                <div className={styles.bigActions}>
                  <button
                    className={styles.smallBtn}
                    onClick={() => {
                      // quick action: add/remove favorite for selected
                      if (!selected) return;
                      const label = (selected || "").toUpperCase();
                      toggleFavorite(label);
                    }}
                  >
                    {favorites.includes((selected || "").toUpperCase()) ? "Unfav" : "Fav"}
                  </button>
                </div>
              </div>

              <div className={styles.largeChart}>
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>

            {/* below you can place another card (e.g., orderbook, depth, another small chart) */}
            <div className={styles.bottomGrid}>
              <div className={styles.sideCard}>
                <h4>Overview</h4>
                <div className={styles.overviewRows}>
                  <div className={styles.ovRow}>
                    <div>24h Low</div>
                    <div>{(Math.min(...(selHistory || [0])) || "—").toFixed(4)}</div>
                  </div>
                  <div className={styles.ovRow}>
                    <div>24h High</div>
                    <div>{(Math.max(...(selHistory || [0])) || "—").toFixed(4)}</div>
                  </div>
                  <div className={styles.ovRow}>
                    <div>Change</div>
                    <div>{selHistory.length > 1 ? ((selHistory.slice(-1)[0] - selHistory[0]) / selHistory[0] * 100).toFixed(2) + "%" : "—"}</div>
                  </div>
                </div>
              </div>

              <div className={styles.sideCard}>
                <h4>Favorites</h4>
                <div className={styles.favList}>
                  {favorites.length === 0 && <div className={styles.emptySmall}>No favorites</div>}
                  {favorites.map((f) => (
                    <div key={f} className={styles.favItem}>
                      {f} <span className={styles.favRate}>{rates?.[f.toLowerCase()] ? Number(rates[f.toLowerCase()]).toFixed(4) : "—"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
