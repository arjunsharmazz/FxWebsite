import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./css/Paymentslogo.module.css";
import img from "../assets/Dashboard.png"; // default image

const withdrawals = [
  { title: "Paykuber", description: "Withdraw funds using popular cryptocurrencies.", image: img },
  { title: "UPI", description: "Fast and secure withdrawals directly to your UPI apps.", image: img },
  { title: "Bank Transfer", description: "Quick transfer to your local bank account.", image: img },
  { title: "Paytm", description: "Instant withdrawal with Paytm wallet support.", image: img },
  { title: "Google Pay", description: "Withdraw instantly using Google Pay UPI.", image: img },
  { title: "PhonePe", description: "Seamless withdrawal via PhonePe UPI.", image: img },
  { title: "Amazon Pay", description: "Withdraw funds directly to Amazon Pay wallet.", image: img },
  { title: "Skrill", description: "Trusted e-wallet withdrawals worldwide.", image: img },
  { title: "Neteller", description: "Instant global withdrawals to your Neteller wallet.", image: img },
  { title: "PayPal", description: "Fast international withdrawals via PayPal.", image: img },
  { title: "Visa", description: "Withdraw funds directly to your Visa debit/credit card.", image: img },
  { title: "Mastercard", description: "Quick withdrawals supported on Mastercard cards.", image: img },
  { title: "RuPay", description: "Domestic withdrawals via RuPay cards in India.", image: img },
  { title: "IMPS", description: "Instant bank withdrawals using IMPS service.", image: img },
  { title: "NEFT", description: "Standard withdrawals via NEFT bank transfer.", image: img },
  { title: "RTGS", description: "High-value withdrawals with RTGS settlement.", image: img },
  { title: "Crypto (BTC)", description: "Withdraw funds directly to your Bitcoin wallet.", image: img },
  { title: "Crypto (ETH)", description: "Withdraw Ethereum securely to your crypto wallet.", image: img },
  { title: "Crypto (USDT)", description: "Withdraw instantly via Tether (USDT).", image: img },
  { title: "Wise (TransferWise)", description: "Withdraw internationally with low fees via Wise.", image: img },
  { title: "Revolut", description: "Instant withdrawals for Revolut account holders.", image: img },
  { title: "Cashfree", description: "Trusted Indian gateway for instant withdrawals.", image: img },
];

const Collections = () => {
  const [showAll, setShowAll] = useState(false);

  // pehle sirf 6 dikhana
  const visibleWithdrawals = showAll ? withdrawals : withdrawals.slice(0, 6);

  return (
    <div className={styles.pageWrap}>
      <section className={styles.postSliders}>
        <h2 className={styles.sectionHeading}>Withdrawal</h2>

        <div className={styles.postSlider}>
          {/* Header card */}
          <div className={`${styles.postSliderHeader} ${styles.headerCard}`}>
            <h2 className={styles.headerCardTitle}>Quick Withdrawal</h2>
            <p className={styles.headerCardSponsor}>
              With local payment options
            </p>
          </div>

          {/* Mini Card Grid */}
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

        {/* View All / Show Less button */}
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
