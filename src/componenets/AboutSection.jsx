import React from "react";
import { motion } from "framer-motion";
import styles from "./css/AboutSection.module.css";
import manImage from "../assets/sopiha.png"; // apna image import karo

export default function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      {/* Left Side */}
      <motion.div
        className={styles.left}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className={styles.bgShape}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src={manImage}
          alt="About"
          className={styles.aboutImg}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
        />
      </motion.div>

      {/* Right Side */}
      <motion.div
        className={styles.right}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          About PayKuberFX
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          PayKuberFX is a trusted Forex & Financial Trading platform, designed to give traders worldwide a smart, secure, and transparent trading experience
          With advanced tools, real-time insights, and 24/7 support, we make trading easier for both beginners and professionals.

          <br></br>Start your journey with PayKuberFX and trade with confidence & clarity.
        </motion.p>

        <motion.button
          className={styles.btn}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn more
        </motion.button>
      </motion.div>
    </section>
  );
}
