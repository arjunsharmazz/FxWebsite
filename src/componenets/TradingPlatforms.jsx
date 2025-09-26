import React from "react";
import { motion } from "framer-motion";
import styles from "./css/TradingPlatforms.module.css";

const platforms = [
  {
    name: "MetaTrader 4 (MT4)",
    desc: "World’s most popular trading platform with advanced charting, multiple order types, and expert advisors (EAs).",
    icon: "📊",
  },
  { 
    name: "MetaTrader 5 (MT5)",
    desc: "Next-gen platform offering faster execution, advanced analytics, and multi-asset trading support.",
    icon: "⚡",
  },
  {
    name: "WebTrader",
    desc: "Trade instantly from your browser with no downloads required. Full-featured and secure access on any device.",
    icon: "🌐",
  },
  {
    name: "Mobile App",
    desc: "Stay connected and trade on the go with powerful iOS & Android apps, optimized for speed & usability.",
    icon: "📱",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const TradingPlatforms = () => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        {/* Title */}
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Trading <span className={styles.highlight}>Platforms</span> We Support
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Access powerful platforms designed for all traders. From professional
          tools to mobile trading, we’ve got you covered.
        </motion.p>

        {/* Cards Grid */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {platforms.map((p, i) => (
            <motion.div
              key={i}
              className={styles.card}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={styles.icon}
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {p.icon}
              </motion.div>
              <h3 className={styles.cardTitle}>{p.name}</h3>
              <p className={styles.desc}>{p.desc}</p>
              <motion.button
                className={styles.btn}
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,255,204,0.6)" }}
              >
                Explore {p.name}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TradingPlatforms;
