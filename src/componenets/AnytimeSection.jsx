import React from "react";
import styles from "./css/AnytimeSection.module.css";
import { motion } from "framer-motion";
import img from "../assets/Dashboard.png";

export default function AnytimeSection() {
  const contentVariant = {
    hidden: { opacity: 0, x: -80 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  const imageVariant = {
    hidden: { opacity: 0, x: 80 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } 
    },
  };

  return (
    <section className={styles.anytime}>
      <div className={styles.container}>
        
        {/* Left Content */}
        <motion.div
          className={styles.content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={contentVariant}
        >
          <h2>
            Trade with <span className={styles.highlight}>Confidence.</span>
          </h2>
          <p>
            Experience seamless trading with negative balance protection, insured
            deposits, and advanced risk management tools. Stay secure while you
            explore global opportunities.
          </p>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className={styles.imageWrapper}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={imageVariant}
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ duration: 0.5 }}
        >
          <img src={img} alt="Trading illustration" />
        </motion.div>
      </div>
    </section>
  );
}
