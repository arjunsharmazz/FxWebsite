import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { createChart } from "lightweight-charts";
import styles from "./TradingPanel.module.css";
import Education2 from "../animcomponents/Education2";
import LiveConverter from "../animcomponents/LiveConverter";

const PAIR = { base: "EUR", quote: "USD" };
const POLL_INTERVAL_MS = 5000;

export default function TradingPanel() {
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const chartApiRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [lastPrice, setLastPrice] = useState(null);
  const [timeframe] = useState("1m");

  const [amount, setAmount] = useState(100);
  const [multiplier, setMultiplier] = useState(1);
  const [trades, setTrades] = useState([]);
  const [balance, setBalance] = useState(10000);

  const currentCandleRef = useRef(null);

  const toUnix = (dateStr) =>
    Math.floor(new Date(dateStr + "T00:00:00Z").getTime() / 1000);

  // init chart
  useEffect(() => {
    const container = chartRef.current;
    const chart = createChart(container, {
      width: container.clientWidth,
      height: 520,
      layout: { backgroundColor: "#0b0b0d", textColor: "#d1d1d1" },
      grid: { vertLines: { color: "#222" }, horzLines: { color: "#222" } },
      rightPriceScale: { scaleMargins: { top: 0.1, bottom: 0.15 } },
      timeScale: { timeVisible: true, secondsVisible: false },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#53B987",
      downColor: "#E74C3C",
      borderVisible: false,
      wickVisible: true,
      priceScaleId: "",
    });

    chartApiRef.current = chart;
    candleSeriesRef.current = candleSeries;

    const onResize = () => {
      chart.applyOptions({ width: container.clientWidth });
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      chart.remove();
    };
  }, []);

  // fetch historical daily candles
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const end = new Date();
        const start = new Date();
        start.setFullYear(end.getFullYear() - 1);

        const startStr = start.toISOString().split("T")[0];
        const endStr = end.toISOString().split("T")[0];

        const url = `https://api.frankfurter.app/${startStr}..${endStr}?from=${PAIR.base}&to=${PAIR.quote}`;
        const res = await axios.get(url);
        const ratesObj = res.data.rates || {};

        const ohlc = Object.entries(ratesObj).map(([date, obj]) => {
          const close = obj[PAIR.quote];
          const open = close * (1 + (Math.random() - 0.5) * 0.002);
          const high = Math.max(open, close) * (1 + Math.random() * 0.0015);
          const low = Math.min(open, close) * (1 - Math.random() * 0.0015);
          return {
            time: toUnix(date),
            open: parseFloat(open.toFixed(6)),
            high: parseFloat(high.toFixed(6)),
            low: parseFloat(low.toFixed(6)),
            close: parseFloat(close.toFixed(6)),
          };
        });

        ohlc.sort((a, b) => a.time - b.time);

        candleSeriesRef.current.setData(ohlc);

        const last = ohlc[ohlc.length - 1];
        currentCandleRef.current = {
          time: Math.floor(Date.now() / 1000),
          open: last.close,
          high: last.close,
          low: last.close,
          close: last.close,
        };
        setLastPrice(last.close);

        setLoading(false);
      } catch (err) {
        console.error("history fetch error", err);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // poll latest price
  useEffect(() => {
    let timer = null;

    const updateTick = async () => {
      try {
        const res = await axios.get(
          `https://api.exchangerate.host/latest?base=${PAIR.base}&symbols=${PAIR.quote}`
        );
        const price = res.data.rates[PAIR.quote];
        if (!price) return;

        setCurrentPrice(price);
        setLastPrice(price);

        const now = Math.floor(Date.now() / 1000);
        const currentMinute = Math.floor(now / 60);
        const candle = currentCandleRef.current;

        if (!candle) {
          currentCandleRef.current = {
            time: Math.floor(now / 60) * 60,
            open: price,
            high: price,
            low: price,
            close: price,
          };
          candleSeriesRef.current.update(currentCandleRef.current);
          return;
        }

        const candleMinute = Math.floor(candle.time / 60);

        if (candleMinute === currentMinute) {
          candle.high = Math.max(candle.high, price);
          candle.low = Math.min(candle.low, price);
          candle.close = price;
          candleSeriesRef.current.update(candle);
        } else {
          const newCandle = {
            time: Math.floor(now / 60) * 60,
            open: candle.close,
            high: Math.max(candle.close, price),
            low: Math.min(candle.close, price),
            close: price,
          };
          currentCandleRef.current = newCandle;
          candleSeriesRef.current.update(newCandle);
        }

        
        setTrades((prev) =>
          prev.map((t) => {
            if (t.status !== "open") return t;
            const direction = t.type === "BUY" ? 1 : -1;
            const pipsChange = (price - t.entryPrice) / t.entryPrice;
            const pl = pipsChange * t.amount * t.multiplier * direction;
            return { ...t, unrealizedPL: pl };
          })
        );
      } catch (err) {
        console.error("live poll error", err);
      }
    };

    updateTick();
    timer = setInterval(updateTick, POLL_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  // trade handlers
  const placeTrade = (type) => {
    if (!lastPrice) return;
    if (balance < amount) {
      alert("Not enough balance!");
      return;
    }
    const id = Date.now();
    const entryPrice = lastPrice;
    const newTrade = {
      id,
      type,
      amount: Number(amount),
      multiplier: Number(multiplier),
      entryPrice,
      time: new Date().toLocaleString(),
      status: "open",
      unrealizedPL: 0,
    };
    setTrades((prev) => [newTrade, ...prev]);
    setBalance((prev) => prev - amount);
  };

  const closeTrade = (id) => {
    setTrades((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const exitPrice = currentPrice || t.entryPrice;
        const direction = t.type === "BUY" ? 1 : -1;
        const pl =
          ((exitPrice - t.entryPrice) / t.entryPrice) *
          t.amount *
          t.multiplier *
          direction;
        setBalance((prev) => prev + t.amount + pl);
        return {
          ...t,
          status: "closed",
          exitPrice,
          realizedPL: pl,
          unrealizedPL: 0,
        };
      })
    );
  };

  return (
    <>
    <Education2 name ="Demo Desk"/>
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>FX</div>
        <nav className={styles.menu}>
          <div className={styles.menuItem}>Trades</div>
          <div className={styles.menuItem}>Market</div>
          <div className={styles.menuItem}>Rewards</div>
          <div className={styles.menuItem}>Help</div>
        </nav>
      </div>

      <div className={styles.main}>
        <div className={styles.topBar}>
          <div className={styles.pairBadge}>
            {PAIR.base}/{PAIR.quote}
            <div className={styles.priceSmall}>
              {currentPrice ? currentPrice.toFixed(6) : "—"}
            </div>
          </div>
          <div className={styles.controls}>
            <div className={styles.tf}>Timeframe: {timeframe}</div>
          </div>
        </div>

        <div ref={chartRef} className={styles.chartContainer}>
          {loading && (
            <div className={styles.loadingOverlay}>Loading chart...</div>
          )}
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.balance}>Balance: INR {balance.toFixed(2)}</div>

        <div className={styles.tradeBox}>
          <div className={styles.tabRow}>
            <button
              className={styles.buyBtn}
              onClick={() => placeTrade("BUY")}
            >
              Buy
            </button>
            <button
              className={styles.sellBtn}
              onClick={() => placeTrade("SELL")}
            >
              Sell
            </button>
          </div>

          <label className={styles.label}>Amount (quote currency)</label>
          <input
            className={styles.input}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
          />

          <label className={styles.label}>Multiplier</label>
          <select
            className={styles.select}
            value={multiplier}
            onChange={(e) => setMultiplier(e.target.value)}
          >
            <option value={1}>1x</option>
            <option value={10}>10x</option>
            <option value={50}>50x</option>
            <option value={100}>100x</option>
          </select>

          <div className={styles.livePrice}>
            Live {PAIR.base}/{PAIR.quote}:{" "}
            {currentPrice ? currentPrice.toFixed(6) : "—"}
          </div>
        </div>

        <div className={styles.tradesList}>
          <h4>Open / Recent Trades</h4>
          {trades.length === 0 && (
            <div className={styles.empty}>No trades yet</div>
          )}
          {trades.map((t) => (
            <div key={t.id} className={styles.tradeItem}>
              <div className={styles.tradeHead}>
                <span className={styles.type}>{t.type}</span>
                <span className={styles.time}>{t.time}</span>
              </div>
              <div className={styles.tradeBody}>
                <div>Amt: {t.amount}</div>
                <div>Entry: {t.entryPrice.toFixed(6)}</div>
                <div>Mult: {t.multiplier}x</div>
              </div>
              <div className={styles.tradePL}>
                P/L:{" "}
                <span
                  className={
                    t.unrealizedPL >= 0 ? styles.plPlus : styles.plMinus
                  }
                >
                  {(t.unrealizedPL || 0).toFixed(2)}
                </span>
              </div>
              <div className={styles.tradeActions}>
                {t.status === "open" ? (
                  <button
                    className={styles.closeBtn}
                    onClick={() => closeTrade(t.id)}
                  >
                    Close
                  </button>
                ) : (
                  <div className={styles.closed}>
                    Closed: {t.realizedPL?.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
        <LiveConverter />
    </>
  );
}
