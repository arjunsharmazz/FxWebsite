import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./css/Paymentslogo.module.css";
import Education2 from "../animcomponents/Education2";
const withdrawals = [
  {
    title: "Paykuber",
    description: "Withdraw funds using popular cryptocurrencies.",
    image: "https://framerusercontent.com/images/BpuH7Ndpc33OBvsfJ06VxbY3A.png",
  },
  {
    title: "UPI",
    description: "Fast and secure withdrawals directly to your UPI apps.",
    image: "https://framerusercontent.com/images/BpuH7Ndpc33OBvsfJ06VxbY3A.png",
  },
  {
    title: "Bank Transfer",
    description: "Quick transfer to your local bank account.",
    image: "https://framerusercontent.com/images/BpuH7Ndpc33OBvsfJ06VxbY3A.png",
  },
  {
    title: "Paytm",
    description: "Instant withdrawal with Paytm wallet support.",
    image: "https://framerusercontent.com/images/BpuH7Ndpc33OBvsfJ06VxbY3A.png",
  },
  {
    title: "Google Pay",
    description: "Withdraw instantly using Google Pay UPI.",
    image: "https://framerusercontent.com/images/BpuH7Ndpc33OBvsfJ06VxbY3A.png",
  },
  {
    title: "PhonePe",
    description: "Seamless withdrawal via PhonePe UPI.",
    image: "https://framerusercontent.com/images/BpuH7Ndpc33OBvsfJ06VxbY3A.png",
  },
  {
    title: "Amazon Pay",
    description: "Withdraw funds directly to Amazon Pay wallet.",
    image: "https://framerusercontent.com/images/BpuH7Ndpc33OBvsfJ06VxbY3A.png",
  },
  {
    title: "Skrill",
    description: "Trusted e-wallet withdrawals worldwide.",
    image: "https://framerusercontent.com/images/BpuH7Ndpc33OBvsfJ06VxbY3A.png",
  },
  {
    title: "Neteller",
    description: "Instant global withdrawals to your Neteller wallet.",
    image: "https://framerusercontent.com/images/BpuH7Ndpc33OBvsfJ06VxbY3A.png",
  },
  {
    title: "PayPal",
    description: "Fast international withdrawals via PayPal.",
    image: "https://framerusercontent.com/images/BpuH7Ndpc33OBvsfJ06VxbY3A.png",
  },
  {
    title: "Visa",
    description: "Withdraw funds directly to your Visa debit/credit card.",
    image: "https://framerusercontent.com/images/BpuH7Ndpc33OBvsfJ06VxbY3A.png",
  },
  {
    title: "Mastercard",
    description: "Quick withdrawals supported on Mastercard cards.",
    image: "https://framerusercontent.com/images/BpuH7Ndpc33OBvsfJ06VxbY3A.png",
  },
  {
    title: "RuPay",
    description: "Domestic withdrawals via RuPay cards in India.",
    image: "https://framerusercontent.com/images/BpuH7Ndpc33OBvsfJ06VxbY3A.png",
  },
  {
    title: "IMPS",
    description: "Instant bank withdrawals using IMPS service.",
    image: "https://framerusercontent.com/images/BpuH7Ndpc33OBvsfJ06VxbY3A.png",
  },
  {
    title: "NEFT",
    description: "Standard withdrawals via NEFT bank transfer.",
    image: "https://framerusercontent.com/images/BpuH7Ndpc33OBvsfJ06VxbY3A.png",
  },
  {
    title: "RTGS",
    description: "High-value withdrawals with RTGS settlement.",
    image: "https://framerusercontent.com/images/BpuH7Ndpc33OBvsfJ06VxbY3A.png",
  },
  {
    title: "Wise (TransferWise)",
    description: "Withdraw internationally with low fees via Wise.",
    image: "https://framerusercontent.com/images/BpuH7Ndpc33OBvsfJ06VxbY3A.png",
  },
  {
    title: "Revolut",
    description: "Instant withdrawals for Revolut account holders.",
    image: "https://framerusercontent.com/images/BpuH7Ndpc33OBvsfJ06VxbY3A.png",
  },
  {
    title: "Cashfree",
    description: "Trusted Indian gateway for instant withdrawals.",
    image: "https://framerusercontent.com/images/BpuH7Ndpc33OBvsfJ06VxbY3A.png",
  },
];





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
