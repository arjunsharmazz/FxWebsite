import React from "react";
import { motion } from "framer-motion";
import styles from "./css/Hero.module.css";
import heroImg from "../assets/hero-bg.png";
import { Navigate, useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();
  return (
    <section className={styles.hero}>
      {/* Background image */}
      <img src={heroImg} alt="Trading Background" className={styles.bgImage} />

      {/* Animated Chart Line */}
      <div className={styles.chartWrapper}>
        <svg
          className={styles.chartLine}
          viewBox="0 0 500 120"
          preserveAspectRatio="none"
        >
          <polyline
            points="0,80 50,40 100,60 150,20 200,70 250,50 300,90 350,30 400,60 450,40 500,70"
            fill="none"
            stroke="#ff2c2c"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Hero Content */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Discover endless possibilities <br />
        in the world of <span>Trading.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        Step into the world of trading excellence and seize every opportunity
        with our advanced platform, expert guidance, and strategic insights for
        unrivaled financial success.
      </motion.p>

      <motion.div
        className={styles.ctaButtons}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <button className={styles.primaryBtn}>Start Trading</button>
        <button className={styles.secondaryBtn} onClick={() => navigate("/demo")}>Try Demo</button>
      </motion.div>
    </section>
  );
};

export default Hero;
