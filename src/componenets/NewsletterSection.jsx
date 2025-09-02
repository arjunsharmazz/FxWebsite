import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./css/NewsletterSection.module.css";

const NewsletterSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.newsletter} ref={ref}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 80, scale: 0.9 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className={styles.heading}>
          Get free trading insights & strategies
        </h2>
        <p className={styles.subtext}>
          Subscribe to our weekly market newsletter and stay ahead with expert strategies & updates.
        </p>

        <motion.form
          className={styles.form}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Subscribe
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
