import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2, 
      duration: 0.7,
      ease: "easeOut"
    }
  })
};

const KeyFeatures = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" }); 
  return (
    <section className={styles.kfSection} ref={ref}>
      <motion.h2
        className={styles.kfTitle}
        initial={{ opacity: 0, y: -40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Why <span className={styles.kfHighlight}>Trade With Us?</span>
      </motion.h2>

      <div className={styles.kfGrid}>
        {features.map((f, i) => (
          <motion.div
            key={i}
            className={styles.kfCard}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.05, boxShadow: "0 12px 30px rgba(255,44,44,0.4)" }}
          >
            <div className={styles.kfIcon}>{f.icon}</div>
            <h3 className={styles.kfCardTitle}>{f.title}</h3>
            <p className={styles.kfDesc}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default KeyFeatures;
