import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./css/KeyFeatures.module.css";
import { Shield, Globe, Zap, Lock, TrendingUp, Smartphone } from "lucide-react";

const features = [
  {
    icon: <TrendingUp size={40} />,
    title: "Low Spreads",
    desc: "Enjoy ultra-tight spreads starting from 0.0 pips for maximum profitability."
  },
  {
    icon: <Zap size={40} />,
    title: "Fast Execution",
    desc: "Trade with lightning-speed order execution and minimal slippage."
  },
  {
    icon: <Shield size={40} />,
    title: "Regulated Broker",
    desc: "Your funds are safe with a fully licensed and regulated broker."
  },
  {
    icon: <Globe size={40} />,
    title: "Global Support",
    desc: "24/7 multilingual support, serving traders worldwide."
  },
  {
    icon: <Lock size={40} />,
    title: "Secure Trading",
    desc: "Advanced security with Two-Factor Authentication (2FA)."
  },
  {
    icon: <Smartphone size={40} />,
    title: "MT4 / MT5 Platforms",
    desc: "Trade seamlessly on MT4 and MT5 across web, desktop, and mobile."
  }
];

const KeyFeatures = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // odd-even cards ko ulta parallax dena
  const offsets = [
    useTransform(scrollYProgress, [0, 1], [50, -50]),
    useTransform(scrollYProgress, [0, 1], [-50, 50]),
    useTransform(scrollYProgress, [0, 1], [40, -40]),
    useTransform(scrollYProgress, [0, 1], [-40, 40]),
    useTransform(scrollYProgress, [0, 1], [30, -30]),
    useTransform(scrollYProgress, [0, 1], [-30, 30]),
  ];

  return (
    <section className={styles.section} ref={ref}>
      <h2 className={styles.title}>
        Why <span className={styles.highlight}>Trade With Us?</span>
      </h2>

      <div className={styles.grid}>
        {features.map((f, i) => (
          <motion.div
            key={i}
            className={styles.card}
            style={{ y: offsets[i] }} // 👈 parallax link
            whileHover={{ scale: 1.05 }}
          >
            <div className={styles.icon}>{f.icon}</div>
            <h3 className={styles.cardTitle}>{f.title}</h3>
            <p className={styles.desc}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default KeyFeatures;
