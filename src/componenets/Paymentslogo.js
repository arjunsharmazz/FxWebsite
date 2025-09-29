import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./css/Paymentslogo.module.css";
import Education2 from "../animcomponents/Education2";
import withdrawals from "../dummydata/withdrawals.js"

const Collections = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleWithdrawals = showAll ? withdrawals : withdrawals.slice(0, 6);

  return (
    <div className={styles.pageWrap}>
      <section className={styles.postSliders}>
        {/* <h2 className={styles.sectionHeading}>Withdrawal</h2> */}
        <Education2 name= "Withdrawal"/>

        <div className={styles.postSlider}>
          <div className={`${styles.postSliderHeader} ${styles.headerCard}`}>
            <h2 className={styles.headerCardTitle}>Quick Withdrawal</h2>
            <p className={styles.headerCardSponsor}>
              With local payment options
            </p>
          </div>

          <div className={styles.miniCardGrid}>
            <AnimatePresence>
              {visibleWithdrawals.map((item, index) => (
                <motion.article
                  key={item.title}
                  className={styles.miniCard}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.miniCardImg}
                  />
                  <h3 className={styles.miniCardTitle}>{item.title}</h3>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className={styles.btnWrap}>
          <button
            className={styles.viewAllBtn}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Collections;
