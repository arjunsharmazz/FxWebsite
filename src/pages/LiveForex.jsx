import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export default function LiveForex() {
  const [base, setBase] = useState("usd");
  const [rates, setRates] = useState({});
  const [filter, setFilter] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState("eur");
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const mountedRef = useRef(true);

  // spread simulation
  const getBidAsk = useCallback((rate) => {
    const spread = rate * 0.0005;
    const bid = rate - spread / 2;
    const ask = rate + spread / 2;
    return { bid: bid.toFixed(4), ask: ask.toFixed(4) };
  }, []);

  // fetch rates
  const fetchRates = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base.toLowerCase()}.json`
      );
      if (!res.ok) throw new Error("Failed to fetch rates.");
      const data = await res.json();
      const current = data?.[base.toLowerCase()] ?? {};
      setRates(current);

      // update history efficiently
      setHistory((prev) => {
        const next = { ...prev };
        Object.entries(current).forEach(([sym, val]) => {
          const arr = next[sym] ? [...next[sym], Number(val)] : [Number(val)];
          next[sym] = arr.slice(-60); // keep last 60
        });
        return next;
      });
    } catch (err) {
      console.error("fetchRates error:", err);
    } finally {
      setLoading(false);
    }
  }, [base]);

  // polling
  useEffect(() => {
    mountedRef.current = true;
    fetchRates();
    const id = setInterval(() => {
      if (mountedRef.current) fetchRates();
    }, 6000); // ⬅️ thoda bada interval, smoother
    return () => {
      mountedRef.current = false;
      clearInterval(id);
    };
  }, [fetchRates]);

  const isMajor = useCallback((symbol) => {
    const majors = ["EURUSD", "GBPUSD", "USDJPY", "USDCHF", "AUDUSD", "USDCAD", "NZDUSD"];
    return majors.includes(symbol);
  }, []);

  // filtered + memoized list
  const allPairs = useMemo(() => {
    return Object.entries(rates || {})
      .map(([sym, val]) => {
        const { bid, ask } = getBidAsk(Number(val));
        const historyArr = history[sym] || [];
        const prevVal = historyArr[historyArr.length - 2] || val;
        const change = ((val - prevVal) / prevVal) * 100;

        return {
          symbol: sym.toUpperCase(),
          rate: Number(val),
          bid,
          ask,
          change: change.toFixed(2),
          isFavorite: favorites.includes(sym.toUpperCase()),
        };
      })
      .filter((s) => {
        const isFiltered =
          filter === "all" ||
          (filter === "major" && isMajor(s.symbol)) ||
          (filter === "exotics" && !isMajor(s.symbol));
        const isSearched = s.symbol.includes(searchFilter.toUpperCase());
        const isFavorited = showFavoritesOnly ? s.isFavorite : true;
        return isFiltered && isSearched && isFavorited;
      })
      .sort((a, b) => a.symbol.localeCompare(b.symbol));
  }, [rates, filter, showFavoritesOnly, favorites, searchFilter, history, getBidAsk, isMajor]);

  useEffect(() => {
    if (!selected && allPairs.length) {
      setSelected(allPairs[0].symbol.toLowerCase());
    }
  }, [allPairs, selected]);

  const toggleFavorite = useCallback((symbol) => {
    setFavorites((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  }, []);

  const selLower = (selected || "").toLowerCase();
  const selHistory = history[selLower] || [];

  // chart dataset only for selected
  const chartData = useMemo(() => {
    return {
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
  }, [selHistory, base, selected]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 300 }, // smoother animations
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

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.header}>
          <h2 style={{ color: "blue" }}>Status : : It is still a work in progress</h2>
          <h1>LIVE FOREX MARKET</h1>
          <div className={styles.headerActions}>
            <button
              className={`${styles.favOnly} ${showFavoritesOnly ? styles.active : ""}`}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
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
          {/* LEFT PANEL */}
          <div className={styles.left}>
            <div className={styles.panelHeader}>
              <div className={styles.filterBtns}>
                <button
                  className={filter === "all" ? styles.active : ""}
                  onClick={() => setFilter("all")}
                >
                  All Instruments
                </button>
                <button
                  className={filter === "major" ? styles.active : ""}
                  onClick={() => setFilter("major")}
                >
                  Major Pairs
                </button>
                <button
                  className={filter === "exotics" ? styles.active : ""}
                  onClick={() => setFilter("exotics")}
                >
                  Exotics
                </button>
              </div>
            </div>
            <div className={styles.searchWrap}>
              <input
                className={styles.search}
                placeholder="Search currency (e.g., EUR)"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
            </div>

            <div className={styles.list}>
              {loading && <div className={styles.loadingMessage}>Loading...</div>}
              {!loading && allPairs.length === 0 && (
                <div className={styles.empty}>No pairs found</div>
              )}
              {!loading &&
                allPairs.map((item) => (
                  <div
                    key={item.symbol}
                    className={`${styles.pair} ${
                      selected === item.symbol.toLowerCase() ? styles.selectedPair : ""
                    }`}
                    onClick={() => setSelected(item.symbol.toLowerCase())}
                  >
                    <div className={styles.pairLeft}>
                      <div className={styles.pairSymbol}>{item.symbol}</div>
                    </div>
                    <div className={styles.pairRight}>
                      <div className={styles.bid}>{item.bid}</div>
                      <div className={styles.ask}>{item.ask}</div>
                      <div
                        className={`${styles.change} ${
                          item.change > 0 ? styles.positiveChange : styles.negativeChange
                        }`}
                      >
                        {item.change}%
                      </div>
                      <button
                        className={`${styles.star} ${item.isFavorite ? styles.starOn : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.symbol);
                        }}
                        aria-label="favorite"
                      >
                        {item.isFavorite ? "★" : "☆"}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* RIGHT PANEL */}
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
              </div>
              <div className={styles.largeChart}>
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
            <div className={styles.bottomGrid}>
              <div className={styles.sideCard}>
                <h4>Overview</h4>
                <div className={styles.overviewRows}>
                  <div className={styles.ovRow}>
                    <div>24h Low</div>
                    <div>
                      {selHistory.length > 0 ? Math.min(...selHistory).toFixed(4) : "—"}
                    </div>
                  </div>
                  <div className={styles.ovRow}>
                    <div>24h High</div>
                    <div>
                      {selHistory.length > 0 ? Math.max(...selHistory).toFixed(4) : "—"}
                    </div>
                  </div>
                  <div className={styles.ovRow}>
                    <div>Change</div>
                    <div
                      className={
                        selHistory.length > 1 &&
                        (selHistory[selHistory.length - 1] - selHistory[0]) / selHistory[0] * 100 > 0
                          ? styles.positiveChange
                          : styles.negativeChange
                      }
                    >
                      {selHistory.length > 1
                        ? (
                            ((selHistory[selHistory.length - 1] - selHistory[0]) /
                              selHistory[0]) *
                            100
                          ).toFixed(2) + "%"
                        : "—"}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.sideCard}>
                <h4>Favorites</h4>
                <div className={styles.favList}>
                  {favorites.length === 0 && (
                    <div className={styles.emptySmall}>No favorites</div>
                  )}
                  {favorites.map((f) => (
                    <div key={f} className={styles.favItem}>
                      {f}{" "}
                      <span className={styles.favRate}>
                        {rates?.[f.toLowerCase()]
                          ? Number(rates[f.toLowerCase()]).toFixed(4)
                          : "—"}
                      </span>
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
