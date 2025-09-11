import React from "react";
import { motion } from "framer-motion";
import styles from "./css/Education.module.css";

const Education = () => {
  return (
    <div className={styles.page}>
      {/* Header */}
      <motion.header
        className={styles.header}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className={styles.title}>Forex Education</h1>
        <p className={styles.subtitle}>
          From beginner to pro – learn, practice, and master the art of trading.
        </p>
      </motion.header>

      {/* Sections */}
      <div className={styles.sections}>
        {[
          {
            title: "🎥 Beginner to Pro Courses",
            desc: "Step-by-step video lessons designed for all levels of traders, from absolute beginners to advanced professionals."
          },
          {
            title: "📘 E-books & Strategy Guides",
            desc: "Download comprehensive e-books and strategy guides to sharpen your trading knowledge and skills."
          },
          {
            title: "📖 Trading Glossary",
            desc: "A complete glossary of forex and financial terms to help you understand the language of trading."
          },
          {
            title: "🎤 Live Webinars",
            desc: "Join live webinars with market experts or watch recorded sessions at your convenience."
          },
          {
            title: "📰 Market News Feed",
            desc: "Stay updated with real-time economic events, trading tips, and analyst insights."
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;
