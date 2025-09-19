import React from "react";
import { motion } from "framer-motion";
import styles from "./css/Hero.module.css";
import heroImg from "../assets/hero-bg.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.hero}>
      {/* <img src={heroImg} alt="Trading Background" className={styles.bgImage} /> */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Discover <span>endless possibilities</span> <br />
        in the world of Trading.
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
        <button className={styles.primaryBtn} onClick={() => navigate("/signup")}>Start Trading</button>
        <button
          className={styles.secondaryBtn}
          onClick={() => navigate("/demo")}
        >
          Try Demo
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
