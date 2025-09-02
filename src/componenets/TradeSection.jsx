import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import styles from "./css/TradeSection.module.css";

export default function TradeSection() {
  const [data, setData] = useState([{ time: 0, value: 1910 }]);
  const [amount, setAmount] = useState(10);
  const [duration, setDuration] = useState(1);

  // Fake live chart
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const nextTime = prev.length;
        const nextValue =
          prev[prev.length - 1].value +
          (Math.random() > 0.5 ? Math.random() * 4 : -Math.random() * 4);
        return [...prev.slice(-25), { time: nextTime, value: nextValue }];
      });

      setAmount(Math.floor(Math.random() * 50) + 1);
      setDuration(Math.floor(Math.random() * 5) + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const lastValue = data[data.length - 1]?.value.toFixed(2);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Left Chart */}
      <motion.div
        className={styles.chartWrapper}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" hide />
            <YAxis domain={["auto", "auto"]} hide />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#00ff66"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* White lines */}
        <div className={styles.verticalLine}></div>
        <div className={styles.horizontalLine}></div>

        {/* Circle marker */}
        <motion.div
          className={styles.circleMarker}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Price tag */}
        <motion.div
          className={styles.priceTag}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          {lastValue}
        </motion.div>

        {/* Green Amount tag with arrow */}
        <motion.div
          className={styles.amountTag}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          ${amount.toFixed(2)} <FaArrowUp className={styles.arrow} />
        </motion.div>
        <div className={styles.amountLine}></div>

        {/* Bottom black boxes */}
        <div className={styles.bottomBoxes}>
          <motion.div
            className={styles.box}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Amount ${amount}
          </motion.div>
          <motion.div
            className={styles.box}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Duration {duration} min
          </motion.div>
        </div>
      </motion.div>

      {/* Right Content */}
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.heading}>
          You choose the{" "}
          <span className={styles.green}>amount and duration</span> of your trade
        </h2>
        <p className={styles.subtext}>
          Open trades starting with as little as $1 with durations as low as 5 seconds
        </p>
      </motion.div>
    </motion.div>
  );
}
