import React, { useState } from "react";
import styles from "./css/ForexAccounts.module.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  DemoIcon,
  StandardIcon,
  MiniIcon,
  ECNIcon,
  STPIcon,
  IslamicIcon,
  VIPIcon,
  PAMMIcon,
} from "../dummydata/AccountIcons";


export const ACCOUNT_DATA = [
  {
    icon: <DemoIcon />,
    name: "Demo Account",
    min: "Free",
    spreads: "Realistic",
    commission: "No",
    best: "The Demo Account allows new users to experience real trading conditions using virtual funds. It's the perfect training ground to test strategies without risking actual money, while learning to use charts, indicators, and platform tools.",
  },
  {
    icon: <StandardIcon />,
    name: "Standard Account",
    min: "$100+",
    spreads: "Normal",
    commission: "No/Low",
    best: "Standard Accounts are ideal for those who have moved beyond basic trading. It offers balanced features with stable spreads and minimal commission. Great for everyday trading with flexible conditions.",
  },
  {
    icon: <MiniIcon />,
    name: "Mini/Micro/Cent Account",
    min: "$10+",
    spreads: "Slightly higher",
    commission: "No/Low",
    best: "Mini or Cent accounts let you trade smaller lot sizes. Perfect for learning in live conditions without large capital. You can test new strategies on a micro scale before scaling up.",
  },
  {
    icon: <ECNIcon />,
    name: "ECN Account",
    min: "$200+",
    spreads: "Ultra-low",
    commission: "Yes",
    best: "ECN Accounts provide direct access to liquidity providers. Designed for professionals who want the tightest spreads and lightning-fast execution — often at the cost of a fixed commission.",
  },
  {
    icon: <STPIcon />,
    name: "STP Account",
    min: "$100+",
    spreads: "Moderate",
    commission: "No/Low",
    best: "STP (Straight Through Processing) Accounts pass orders directly to the market without dealing desk intervention. Good for traders looking for fast execution and fewer requotes.",
  },
  {
    icon: <IslamicIcon />,
    name: "Islamic (Swap-Free) Account",
    min: "Varies",
    spreads: "Normal/Low",
    commission: "Fixed fee",
    best: "These accounts are Shariah-compliant and do not involve interest-based swaps. Designed for Muslim traders, swap-free accounts charge a fixed fee instead, ensuring religious guidelines are met.",
  },
  {
    icon: <VIPIcon />,
    name: "VIP / Premium Account",
    min: "$10,000+",
    spreads: "Tightest",
    commission: "Performance",
    best: "Premium accounts offer the lowest spreads, priority support, and tailored conditions. They're built for high-volume or institutional traders looking for elite treatment and performance-based fees.",
  },
  {
    icon: <PAMMIcon />,
    name: "Managed (PAMM) Account",
    min: "$500+",
    spreads: "Varies",
    commission: "Performance fee",
    best: "PAMM Accounts allow you to invest your funds with experienced traders who manage your capital. Ideal for passive investors or those seeking portfolio diversification.",
  },
];


const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export default function ForexAccounts() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCard = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {ACCOUNT_DATA.map((item, index) => (
          <motion.div
            key={index}
            className={`${styles.card} ${activeIndex === index ? styles.active : ""}`}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariant}
          >
            <div className={styles.icon}>{item.icon}</div>

            <div className={styles.content}>
              <h3>{item.name}</h3>
              <p className={styles.meta}>
                <strong>Min:</strong> {item.min} | <strong>Spreads:</strong> {item.spreads} |{" "}
                <strong>Commission:</strong> {item.commission}
              </p>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.p
                    className={styles.desc}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.best}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Expand Button */}
              <button
                className={styles.expandBtn}
                onClick={() => toggleCard(index)}
              >
                {activeIndex === index ? "Hide Details ▲" : "More Details ▼"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
