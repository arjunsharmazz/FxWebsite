import React from "react";
import { motion } from "framer-motion";
import styles from "./css/AccountTypes.module.css";

const accounts = [
  {
    name: "Standard",
    deposit: "$100",
    spreads: "From 1.0 pips",
    leverage: "1:500",
    commission: "No commission",
    features: ["Beginner friendly", "24/7 support", "MT4/MT5 access"],
    highlight: false
  },
  {
    name: "ECN",
    deposit: "$500",
    spreads: "From 0.0 pips",
    leverage: "1:400",
    commission: "$5 per lot",
    features: ["Direct market access", "Low latency", "Fast execution"],
    highlight: true
  },
  {
    name: "Islamic",
    deposit: "$250",
    spreads: "From 1.2 pips",
    leverage: "1:300",
    commission: "Swap-free",
    features: ["Shariah compliant", "No overnight fees", "Trusted globally"],
    highlight: false
  },
  {
    name: "VIP",
    deposit: "$10,000",
    spreads: "From 0.0 pips",
    leverage: "1:200",
    commission: "Custom pricing",
    features: ["Dedicated manager", "Priority withdrawals", "Exclusive perks"],
    highlight: true
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.2, duration: 0.7, ease: "easeOut" }
  })
};

const AccountTypes = () => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Choose Your <span className={styles.highlight}>Account Type</span>
        </motion.h2>

        <div className={styles.grid}>
          {accounts.map((acc, i) => (
            <motion.div
              key={i}
              className={`${styles.card} ${acc.highlight ? styles.highlightCard : ""}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className={styles.cardTitle}>{acc.name}</h3>
              <p className={styles.deposit}>Min. Deposit: {acc.deposit}</p>
              <ul className={styles.details}>
                <li><strong>Spreads:</strong> {acc.spreads}</li>
                <li><strong>Leverage:</strong> {acc.leverage}</li>
                <li><strong>Commission:</strong> {acc.commission}</li>
              </ul>
              <ul className={styles.features}>
                {acc.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
              <button className={styles.btn}>Open {acc.name} Account</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccountTypes;
