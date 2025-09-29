import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./css/LiveConverter.module.css";
import {
  FaArrowRightArrowLeft,
  FaChartLine,
  FaBell,
  FaPaperPlane,
  FaArrowsRotate, 
} from "react-icons/fa6";
import { createChart } from "lightweight-charts";

/**
 * APIs used
 *  - Primary: https://api.exchangerate.host
 *  - Fallback: https://api.frankfurter.app (ECB majors only)
 */

const CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "NZD", "INR", "CNY", "SGD", "HKD", "ZAR",
];

const REFRESH_MS = 15000;


async function safeJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data;
}

async function getLatestRate(base, quote) {
  if (base === quote) return 1;

  // primary
  try {
    const u = `https://api.exchangerate.host/latest?base=${base}&symbols=${quote}`;
    const j = await safeJson(u);
    const r = j?.rates?.[quote];
    if (typeof r === "number") return r;
    throw new Error("No rate from exchangerate.host");
  } catch (e) {
    // fallback (majors only)
    const u2 = `https://api.frankfurter.app/latest?from=${base}&to=${quote}`;
    const j2 = await safeJson(u2);
    const r2 = j2?.rates?.[quote];
    if (typeof r2 === "number") return r2;
    throw new Error("No rate from frankfurter");
  }
}

async function getSeries(base, quote, days = 30) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);
  const endStr = end.toISOString().slice(0, 10);
  const startStr = start.toISOString().slice(0, 10);

  // primary
  try {
    const u = `https://api.exchangerate.host/timeseries?base=${base}&symbols=${quote}&start_date=${startStr}&end_date=${endStr}`;
    const j = await safeJson(u);
    const entries = Object.entries(j?.rates || {});
    if (!entries.length) throw new Error("No timeseries");
    return entries
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, obj]) => ({ time: date, value: obj[quote] }));
  } catch (e) {
    // fallback (majors)
    const u2 = `https://api.frankfurter.app/${startStr}..${endStr}?from=${base}&to=${quote}`;
    const j2 = await safeJson(u2);
    const entries2 = Object.entries(j2?.rates || {});
    if (!entries2.length) throw new Error("No timeseries (fallback)");
    return entries2
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, obj]) => ({ time: date, value: obj[quote] }));
  }
}

/* ---------- component ---------- */
export default function LiveConverter() {
  const [tab, setTab] = useState("convert");
  const [amount, setAmount] = useState(1);
  const [base, setBase] = useState("USD");
  const [quote, setQuote] = useState("EUR");

  const [rate, setRate] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // chart refs
  const chartRef = useRef(null);
  const chartApi = useRef(null);
  const areaSeries = useRef(null);

  const converted = useMemo(() => {
    if (rate == null) return "";
    const v = Number(amount || 0) * rate;
    return v.toLocaleString(undefined, { maximumFractionDigits: 6 });
  }, [amount, rate]);

  const inverseRate = useMemo(() => {
    if (rate == null) return null;
    return 1 / rate;
  }, [rate]);

  // init chart once
  useEffect(() => {
    if (!chartRef.current) return;
    const el = chartRef.current;
    const chart = createChart(el, {
      width: el.clientWidth,
      height: 220,
      layout: { backgroundColor: "transparent", textColor: "#E5E7EB" },
      rightPriceScale: { borderColor: "rgba(255,255,255,0.08)" },
      timeScale: { borderColor: "rgba(255,255,255,0.08)", timeVisible: false, secondsVisible: false },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.06)" },
        horzLines: { color: "rgba(255,255,255,0.06)" },
      },
    });
    const series = chart.addAreaSeries({
      lineColor: "#60A5FA",
      topColor: "rgba(96,165,250,0.35)",
      bottomColor: "rgba(96,165,250,0.05)",
    });
    chartApi.current = chart;
    areaSeries.current = series;

    const onResize = () => chart.applyOptions({ width: el.clientWidth });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      chart.remove();
    };
  }, []);

  // fetch latest + chart whenever pair changes; also poll
  useEffect(() => {
    let timer;
    let cancelled = false;

    const load = async () => {
      if (cancelled) return;
      setErr("");
      try {
        setLoading(true);

        const r = await getLatestRate(base, quote);
        if (cancelled) return;
        setRate(r);
        setLastUpdated(new Date().toLocaleTimeString());

        const pts = await getSeries(base, quote, 30);
        if (cancelled) return;
        if (areaSeries.current) {
          areaSeries.current.setData(pts);
          chartApi.current?.timeScale().fitContent();
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setErr("Failed to load rates. Try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    timer = setInterval(load, REFRESH_MS);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [base, quote]);

  const swap = () => {
    setBase(quote);
    setQuote(base);
  };

  return (
    <section className={styles.wrap}>
      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === "convert" ? styles.active : ""}`}
          onClick={() => setTab("convert")}
        >
          <span className={styles.tabIcon}><FaArrowsRotate /></span>
          Convert
        </button>
        <button
          className={`${styles.tab} ${tab === "send" ? styles.active : ""}`}
          onClick={() => setTab("send")}
          title="Demo tab"
        >
          <span className={styles.tabIcon}><FaPaperPlane /></span>
          Send
        </button>
        <button
          className={`${styles.tab} ${tab === "charts" ? styles.active : ""}`}
          onClick={() => setTab("charts")}
        >
          <span className={styles.tabIcon}><FaChartLine /></span>
          Charts
        </button>
        <button
          className={`${styles.tab} ${tab === "alerts" ? styles.active : ""}`}
          onClick={() => setTab("alerts")}
          title="Demo tab"
        >
          <span className={styles.tabIcon}><FaBell /></span>
          Alerts
        </button>
      </div>

      {/* Main card */}
      <div className={styles.card}>
        {/* Row 1 – amount */}
        <div className={styles.row}>
          <div className={styles.block}>
            <label className={styles.label}>Amount</label>
            <input
              type="number"
              min="0"
              className={styles.amount}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className={styles.block}>
            <label className={styles.label}>From</label>
            <div className={styles.selectWrap}>
              <select
                className={styles.select}
                value={base}
                onChange={(e) => setBase(e.target.value)}
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <button className={styles.swap} onClick={swap} aria-label="Swap">
            <FaArrowRightArrowLeft />
          </button>

          <div className={styles.block}>
            <label className={styles.label}>To</label>
            <div className={styles.selectWrap}>
              <select
                className={styles.select}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Row 2 – result */}
        <div className={styles.resultRow}>
          <div className={styles.resultBox}>
            <div className={styles.resultTop}>
              <span className={styles.resultAmount}>
                {amount || 0} {base}
              </span>
              <span className={styles.equals}>=</span>
              <span className={styles.resultAmountAccent}>
                {converted || "—"} {quote}
              </span>
            </div>

            <div className={styles.rateLine}>
              {loading ? (
                <span className={styles.muted}>Updating…</span>
              ) : err ? (
                <span className={styles.error}>{err}</span>
              ) : rate != null ? (
                <>
                  <span>1 {base} = <strong>{rate.toFixed(6)}</strong> {quote}</span>
                  <span className={styles.sep}>•</span>
                  <span>1 {quote} = <strong>{inverseRate.toFixed(6)}</strong> {base}</span>
                  <span className={styles.sep}>•</span>
                  <span className={styles.muted}>Updated {lastUpdated}</span>
                </>
              ) : (
                <span className={styles.muted}>—</span>
              )}
            </div>
          </div>

          <button className={styles.cta}>
            Convert
          </button>
        </div>

        {/* Row 3 – chart */}
        {tab === "charts" && (
          <div className={styles.chartWrap}>
            <div ref={chartRef} className={styles.chart} />
            <div className={styles.caption}>
              30-day trend • {base}/{quote}
            </div>
          </div>
        )}
      </div>

      <p className={styles.note}>
        Uses mid-market rates for information only. You won’t receive this rate when sending money.
      </p>
    </section>
  );
}
