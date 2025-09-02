import React from "react";
import styles from "./css/ProtectionSection.module.css";
import { FaShieldAlt, FaLock, FaBalanceScale, FaTools } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProtectionSection() {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Negative Balance Protection",
      desc: "Stay safe from unexpected losses — you’ll never lose more than your invested amount."
    },
    {
      icon: <FaLock />,
      title: "Insured Deposits",
      desc: "Your funds are kept secure with leading banks and always remain protected."
    },
    {
      icon: <FaBalanceScale />,
      title: "Regulated Platform",
      desc: "Trade confidently with a fully regulated and compliant forex broker."
    },
    {
      icon: <FaTools />,
      title: "Risk Management Tools",
      desc: "Use Stop Loss and Take Profit to manage your trades and stay in control."
    }
  ];

  // Parent stagger effect
  const parentVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2
      }
    }
  };

  // Card animation
  const cardVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Right side content
  const contentVariant = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className={styles.protection}>
      <div className={styles.container}>
        
        {/* Left Cards with staggered animation */}
        <motion.div 
          className={styles.cards}
          variants={parentVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              className={styles.card}
              variants={cardVariant}
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div 
                className={styles.icon} 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {f.icon}
              </motion.div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Content with fade slide-in */}
        <motion.div 
          className={styles.content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={contentVariant}
        >
          <motion.span 
            className={styles.subtitle}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Forex Protection
          </motion.span>

          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Trade with <br /> Confidence and <br /> 
            <span className={styles.red} style={{ color: "#fff" }}>Security</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            At our forex platform, protecting your capital is our top priority.  
            With advanced security systems, insured deposits, and negative balance protection, you always trade with peace of mind.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Whether you are a beginner or a professional trader, our regulated platform ensures fairness, transparency, and full compliance.
          </motion.p>

          <div className={styles.buttons}>
            <motion.button 
              className={`${styles.btn} ${styles.btnPrimary}`}
              whileHover={{ scale: 1.1, boxShadow: "0px 8px 25px rgba(255,0,0,0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              Start Trading
            </motion.button>
            <motion.button 
              className={`${styles.btn} ${styles.btnOutline}`}
              whileHover={{ backgroundColor: "#fff", color: "#000" }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
