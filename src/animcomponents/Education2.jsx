import React from "react";
import { motion } from "framer-motion";
import styles from "./css/Education2.module.css";
import YouTubeCards from "./YouTubeCards";

const Education2 = ({name}) => {
  return (
    <>
    <div className={styles.pageWrap}>
      <motion.section
        className={styles.postSliders}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }} 
      >
        <motion.h2
          className={styles.sectionHeading}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {name}
        </motion.h2>
      </motion.section>
    </div>
    </>
  );
};

export default Education2;
