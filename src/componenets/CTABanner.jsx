import React from "react";
import { Link } from "react-router-dom";
import styles from "./css/CTABanner.module.css";
import { motion, useScroll, useTransform } from "framer-motion";
const CTABanner = () => {
  const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay: d },
  viewport: { once: true, amount: 0.3 },
});
  return (
      <section className={styles.finalCta} id="get-started">
        <motion.h3 {...fadeUp(0)}>
          Ready to trade with clarity?
        </motion.h3>
        <motion.p {...fadeUp(0.05)}>
          Join PayKuberFX and get the tools, insights, and support you deserve.
        </motion.p>
        <motion.a whileHover={{ scale: 1.03 }} className={styles.primaryBtn} href="/signup">
          Create Free Account
        </motion.a>
      </section>
  );
};

export default CTABanner;
