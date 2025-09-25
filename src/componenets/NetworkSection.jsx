import React from "react";
import { motion } from "framer-motion";
import styles from "./css/NetworkSection.module.css";
import one from "../assets/one.png";
import two from "../assets/two.png";
import three from "../assets/three.png";
import Education2 from "../animcomponents/Education2";

const fadeInUp = {
  hidden: { opacity: 0, y: 40, scale: 0.8 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function NetworkSection() {
  return (
    <section className={styles.section}>
      {/* Header */}
      <motion.div
        className={styles.header}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        {/* <h2 className={styles.title}>Global Forex Network</h2> */}
        <Education2 name="Forex Network"/>
        {/* <p className={styles.subtitle}>
          Track real-time transactions and connections across the world.
        </p> */}
      </motion.div>

      {/* Wrapper */}
      <div className={styles.wrapper}>
        {/* Center Main Card */}
        <motion.div
          className={styles.centerCard}
          initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          animate={{ y: [0, -15, 0] }}
          transition={{
            y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            default: { duration: 0.8, ease: "easeOut" },
          }}
        >
          <h4>Last Month Transactions</h4>
          <p className={styles.amount}>$522K</p>
        </motion.div>

        {/* User Cards */}
        <motion.div
          className={styles.userCard}
          style={{ top: "10%", left: "15%" }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          animate={{ y: [0, -12, 0] }}
          transition={{
            y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            default: { delay: 0.2, duration: 0.7 },
          }}
        >
          <img src={two} alt="hane" />
          <p>@hane</p>
          <span>$600</span>
        </motion.div>

        <motion.div
          className={styles.userCard}
          style={{ top: "20%", right: "15%" }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
            default: { delay: 0.4, duration: 0.7 },
          }}
        >
          <img src={one} alt="esenyi" />
          <p>@esenyi</p>
          <span>$125</span>
        </motion.div>

        <motion.div
          className={styles.userCard}
          style={{ bottom: "20%", left: "20%" }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          animate={{ y: [0, -14, 0] }}
          transition={{
            y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            default: { delay: 0.6, duration: 0.7 },
          }}
        >
          <img src={three} alt="ibrahim" />
          <p>@ibrahim</p>
          <span>$250</span>
        </motion.div>

        <motion.div
          className={styles.userCard}
          style={{ bottom: "15%", right: "20%" }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          animate={{ y: [0, -8, 0] }}
          transition={{
            y: { repeat: Infinity, duration: 3.8, ease: "easeInOut" },
            default: { delay: 0.8, duration: 0.7 },
          }}
        >
          <img src={one} alt="josim" />
          <p>@josim</p>
          <span>$300</span>
        </motion.div>
      </div>
    </section>
  );
}
