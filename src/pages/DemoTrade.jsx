// src/pages/DemoTrade.jsx
import React, { useRef, useEffect, useState } from "react";
import styles from "./css/DemoTrade.module.css";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

const PAIRS = [
  { label: "EUR/USD", symbol: "OANDA:EUR_USD" },
  { label: "GBP/USD", symbol: "OANDA:GBP_USD" },
  { label: "USD/JPY", symbol: "OANDA:USD_JPY" },
  { label: "AUD/USD", symbol: "OANDA:AUD_USD" },
  { label: "USD/CHF", symbol: "OANDA:USD_CHF" },
];

export default function DemoTrade() {
  const canvasRef = useRef(null);
  const [balance, setBalance] = useState(10000);
  const [lot, setLot] = useState(0.1);
  const [position, setPosition] = useState(null);
  const [history, setHistory] = useState([]);
  const [prices, setPrices] = useState([]);
  const [pair, setPair] = useState(PAIRS[0].symbol);
  const priceRef = useRef(0);
  const animRef = useRef(null);
  const wsRef = useRef(null);

  // WebSocket
  useEffect(() => {
    if (!pair) return;
    if (wsRef.current) wsRef.current.close();

    const socket = new WebSocket(
      "wss://ws.finnhub.io?token=d2vaq71r01qq994iv2e0d2vaq71r01qq994iv2eg"
    );
    wsRef.current = socket;

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "subscribe", symbol: pair }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "trade" && data.data?.length > 0) {
        const tick = data.data[0];
        const newPrice = tick.p;
        priceRef.current = newPrice;
        setPrices((prev) => {
          const arr = [...prev, newPrice];
          return arr.length > 120 ? arr.slice(-120) : arr;
        });
      }
    };

    return () => socket.close();
  }, [pair]);

  // Chart Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // Background
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, "#0e0e11");
      gradient.addColorStop(1, "#1a1a21");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      for (let y = 0; y < h; y += h / 5) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Price line
      if (prices.length > 1) {
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        ctx.beginPath();
        prices.forEach((p, i) => {
          const x = (i / (prices.length - 1)) * w;
          const y = h - ((p - min) / (max - min || 1)) * h;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = "#75381cff";
        ctx.shadowColor = "rgba(226, 20, 20, 0.7)";
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Price label
      ctx.fillStyle = "#fff";
      ctx.font = "14px 'Orbitron', sans-serif";
      if (priceRef.current) {
        ctx.fillText(`${pair} ${priceRef.current.toFixed(5)}`, 12, 22);
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [pair, prices]);

  // Trade actions
  const handleBuy = () => {
    const price = priceRef.current;
    if (!price) return;
    if (position?.type === "buy") {
      const pnl = (price - position.price) * 100000 * position.lots;
      setBalance((prev) => prev + pnl);
      setHistory((h) => [
        { type: "Close Buy", price, pnl, time: new Date().toLocaleTimeString() },
        ...h,
      ]);
      setPosition(null);
    } else {
      setPosition({ type: "buy", price, lots: lot });
      setHistory((h) => [
        { type: "Open Buy", price, time: new Date().toLocaleTimeString() },
        ...h,
      ]);
    }
  };

  const handleSell = () => {
    const price = priceRef.current;
    if (!price) return;
    if (position?.type === "sell") {
      const pnl = (position.price - price) * 100000 * position.lots;
      setBalance((prev) => prev + pnl);
      setHistory((h) => [
        { type: "Close Sell", price, pnl, time: new Date().toLocaleTimeString() },
        ...h,
      ]);
      setPosition(null);
    } else {
      setPosition({ type: "sell", price, lots: lot });
      setHistory((h) => [
        { type: "Open Sell", price, time: new Date().toLocaleTimeString() },
        ...h,
      ]);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.header}>
            <h2 style={{ color: "blue" }}>Status : : It is still a work in progress</h2>
          <h1> Demo Trading</h1>
          <div className={styles.balance}>
            Balance: <span>${balance.toFixed(2)}</span>
          </div>
        </div>

        <div className={styles.dropdown}>
          <label>Select Pair</label>
          <select value={pair} onChange={(e) => setPair(e.target.value)}>
            {PAIRS.map((p) => (
              <option key={p.symbol} value={p.symbol}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.chartBox}>
          <canvas ref={canvasRef} className={styles.chart}></canvas>
        </div>

        <div className={styles.priceRow}>
          <span>
            Current Price:{" "}
            <b>{priceRef.current ? priceRef.current.toFixed(5) : "--"}</b>
          </span>
          <span>
            Position:{" "}
            {position ? (
              <b>
                {position.type.toUpperCase()} {position.lots} lots @{" "}
                {position.price.toFixed(5)}
              </b>
            ) : (
              "None"
            )}
          </span>
        </div>
      </div>

      <aside className={styles.panel}>
        <div className={styles.tradeBox}>
          <label>Lot Size</label>
          <input
            type="number"
            value={lot}
            step="0.01"
            min="0.01"
            onChange={(e) => setLot(Number(e.target.value))}
          />
          <div className={styles.actions}>
            <button className={styles.buy} onClick={handleBuy}>
              <ArrowUpCircle size={18} />{" "}
              {position?.type === "buy" ? "Close Buy" : "Buy"}
            </button>
            <button className={styles.sell} onClick={handleSell}>
              <ArrowDownCircle size={18} />{" "}
              {position?.type === "sell" ? "Close Sell" : "Sell"}
            </button>
          </div>
        </div>

        <div className={styles.history}>
          <h4>📜 Trade History</h4>
          {history.length === 0 && (
            <div className={styles.empty}>No trades yet</div>
          )}
          {history.map((h, i) => (
            <div key={i} className={styles.histItem}>
              <div>
                <b>{h.type}</b> @ {h.price.toFixed(5)}
              </div>
              <div className={styles.details}>
                {h.pnl !== undefined && (
                  <span className={h.pnl >= 0 ? styles.profit : styles.loss}>
                    {h.pnl >= 0 ? "+" : ""}
                    {h.pnl.toFixed(2)}
                  </span>
                )}
                <span>{h.time}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
